import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegSave, FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ProfitLossReport = () => {
  const [report, setReport] = useState([]);
  const [form, setForm] = useState({
    from_date: "",
    to_date: "",
    warehouse_id: "",
    product_category: "",
    customer_type: ""
  });

  const [warehouses, setWarehouses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch warehouse list
    axios.get("http://localhost:5000/api/warehouses")
      .then(res => setWarehouses(res.data))
      .catch(err => console.error(err));

    // Fetch product categories
    axios.get("http://localhost:5000/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));

    // Initial report load
    axios.get("http://localhost:5000/api/reports/profitloss")
      .then(res => setReport(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/reports/profitloss", form);
      setReport(res.data);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const [search, setSearch] = useState("");
  const filteredReports = report.filter((r) =>
    r.date?.toString().toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">From Date<span className="text-danger">*</span></label>
          <input type="date" className="form-control bg-light"
            name="from_date" value={form.from_date} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">To Date<span className="text-danger">*</span></label>
          <input type="date" className="form-control bg-light"
            name="to_date" value={form.to_date} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Warehouse</label>
          <select className="form-select bg-light"
            name="warehouse_id" value={form.warehouse_id} onChange={handleChange}>
            <option value="">-- Select Warehouse --</option>
            {warehouses.map(w => <option key={w._id} value={w._id}>{w.name}</option>)}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Product Category</label>
          <select className="form-select bg-light"
            name="product_category" value={form.product_category} onChange={handleChange}>
            <option value="">-- Select Category --</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Customer Type</label>
          <select className="form-select bg-light"
            name="customer_type" value={form.customer_type} onChange={handleChange}>
            <option value="">All</option>
            <option value="retail">Retail</option>
            <option value="wholesale">Wholesale</option>
          </select>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary px-4 d-flex align-items-center">
            <span className="text-warning me-2"><FaRegSave /></span>Generate
          </button>
        </div>
      </form><br />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Profit & Loss Report</h5>

          <div className="mt-4 mb-2 input-group">
            <input type="text" className="form-control"
              placeholder="Search by Date"
              value={search} onChange={(e) => setSearch(e.target.value)} />
            <span className="input-group-text"><FaSearch /></span>
          </div>

          <table className="table table-bordered table-striped mt-4">
            <thead className="table-dark">
              <tr>
                <th>Date</th>
                <th>Sales Revenue</th>
                <th>Purchases (COGS)</th>
                <th>Expenses</th>
                <th>Gross Profit</th>
                <th>Net Profit / Loss</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.length === 0 ? (
                <tr><td colSpan="6" className="text-center">No reports found.</td></tr>
              ) : (
                filteredReports.map((r, i) => (
                  <tr key={i}>
                    <td>{r.date}</td>
                    <td>₹{r.sales}</td>
                    <td>₹{r.purchases}</td>
                    <td>₹{r.expenses}</td>
                    <td>₹{r.gross_profit}</td>
                    <td className={r.net_profit >= 0 ? "text-success fw-bold" : "text-danger fw-bold"}>
                      ₹{r.net_profit}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossReport;
