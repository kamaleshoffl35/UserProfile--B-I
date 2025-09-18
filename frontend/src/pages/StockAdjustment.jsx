import React, { useState, useEffect } from "react";
import axios from "axios";
import { PiShippingContainer } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";

const StockAdjustment = () => {
    const [warehouses, setWarehouses] = useState([]);
    const [products, setProducts] = useState([]);
    const [stocksadjust, setStocksadjust] = useState([]);
    const [form, setForm] = useState({
        warehouse_id: "",
        reason: "",
        date: new Date().toISOString().slice(0, 16),
        notes: "",
        items: [{ product_id: "", batch: "", qty: "", remarks: "" }]
    });

    useEffect(() => {
        axios.get("http://localhost:5000/api/warehouses")
            .then(res => setWarehouses(res.data))
            .catch(err => console.error("Error fetching warehouses:", err));

        axios.get("http://localhost:5000/api/products")
            .then(res => setProducts(res.data))
            .catch(err => console.error("Error fetching products:", err));

        axios.get("http://localhost:5000/api/stocksadj")
            .then(res => setStocksadjust(res.data))
            .catch(err => console.error("Error fetching stock adjustments:", err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const items = [...form.items];
        items[index][name] = value;
        setForm({ ...form, items });
    };

    const addItem = () => {
        setForm({
            ...form,
            items: [...form.items, { product_id: "", batch: "", qty: "", remarks: "" }]
        });
    };

    const removeItem = (index) => {
        if (form.items.length === 1) {
            alert("At least one item is required.");
            return;
        }
        const items = [...form.items];
        items.splice(index, 1);
        setForm({ ...form, items });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/stocksadj", form);
            setStocksadjust([...stocksadjust, res.data]);
            setForm({
                warehouse_id: "",
                reason: "",
                date: new Date().toISOString().slice(0, 16),
                notes: "",
                items: [{ product_id: "", batch: "", qty: "", remarks: "" }]
            });
        } catch (err) {
            console.error(err.response?.data || err.message);
        }
    };

    return (
        <div className="container mt-4">
            <h3 className="mb-4"><span className="me-2 text-success"><PiShippingContainer /></span> <b>STOCK ADJUSTMENT</b></h3>
            <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Warehouse <span className="text-danger">*</span></label>
                        <select className="form-select bg-light" name="warehouse_id" value={form.warehouse_id} onChange={handleChange} required>
                            <option value="">-- Select --</option>
                            {warehouses.map(w => (
                                <option key={w._id} value={w._id}>{w.store_name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Reason <span className="text-danger">*</span></label>
                        <select className="form-select bg-light" name="reason" value={form.reason} onChange={handleChange} required>
                            <option value="">-- Select --</option>
                            <option value="Damage">Damage</option>
                            <option value="Count Diff">Count Diff</option>
                            <option value="Write-off">Write-off</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Date <span className="text-danger">*</span></label>
                        <input type="datetime-local" className="form-control bg-light" name="date" value={form.date} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Notes</label>
                        <input type="text" className="form-control bg-light" name="notes" value={form.notes} onChange={handleChange} />
                    </div>
                </div>

                <table className="table table-bordered align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th style={{ width: "25%" }}>Product *</th>
                            <th style={{ width: "15%" }}>Batch No</th>
                            <th style={{ width: "15%" }}>Qty Change *</th>
                            <th style={{ width: "25%" }}>Remarks</th>
                            <th style={{ width: "10%" }}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {form.items.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <select name="product_id" value={item.product_id} className="form-select" onChange={(e) => handleItemChange(index, e)} required>
                                        <option value="">Select Product</option>
                                        {products.map(p => (
                                            <option key={p._id} value={p._id}>{p.name}</option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <input type="text" name="batch" value={item.batch} className="form-control" placeholder="Batch No" onChange={(e) => handleItemChange(index, e)} />
                                </td>
                                <td>
                                    <input type="number" name="qty" value={item.qty} className="form-control" placeholder="± Qty" onChange={(e) => handleItemChange(index, e)} required />
                                </td>
                                <td>
                                    <input type="text" name="remarks" value={item.remarks} className="form-control" placeholder="Remarks" onChange={(e) => handleItemChange(index, e)} />
                                </td>
                                <td>
                                    <button type="button" className="btn btn-danger btn-sm" onClick={() => removeItem(index)}>
                                        <MdDelete />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button type="button" className="btn btn-secondary mb-3" onClick={addItem}>+ Add Row</button>
                <br />
                <button type="submit" className="btn btn-primary">
                    <FaSave /> Save Adjustment
                </button>
            </form><br />

            <div className=" card shadow-sm">
                <div className="card-body">
                    <h5 className="mb-3">Adjustment Tree</h5>
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Warehouse</th>
                                <th>Reason</th>
                                <th>Date</th>
                                <th>Notes</th>
                                <th>Items</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stocksadjust.map((s, index) => (
                                <tr key={index}>
                                    <td>{s.warehouse_id?.store_name || s.warehouse_id}</td>
                                    <td>{s.reason}</td>
                                    <td>{new Date(s.date).toLocaleString()}</td>
                                    <td>{s.notes}</td>
                                    <td>
                                        {s.items.map((item, idx) => (
                                            <div key={idx}>
                                                {products.find(p => p._id === item.product_id)?.name || item.product_id} — Qty: {item.qty}
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table></div></div>
        </div>
    );
};

export default StockAdjustment;
