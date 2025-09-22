import React, { useEffect, useState } from 'react'
import { FaRegSave } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { GiTakeMyMoney } from "react-icons/gi";
import { MdDeleteForever } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';

const Supplier_Payment = () => {
  const [suppliers, setSupplier] = useState([])
  const [payments, setPayment] = useState([])
  const [form, setForm] = useState({
    supplier_id: "",

    date: new Date().toISOString().slice(0, 16),
    amount: "",
    mode: "",
    reference_no: "",
    applied_purchase_id: "",
    notes: "",
  })
  useEffect(() => {
    axios.get("http://localhost:5000/api/suppliers")
      .then(res => setSupplier(res.data))

    axios.get("http://localhost:5000/api/sup_receipts")
      .then(res => setPayment(res.data))
      .catch(err => console.error(err))
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/api/sup_receipts", form)
      setPayment([...payments, res.data])
      setForm({
        supplier_id: "",

        date: new Date().toISOString().slice(0, 16),
        amount: "",
        mode: "",
        reference_no: "",
        applied_purchase_id: "",
        notes: "",
      })
    }
    catch (err) {
      console.error(err.response?.data || err.message)
    }
  }

  const [search, setSearch] = useState("");
  const filteredpayments = payments.filter((s) => {
    const supplierName = s.supplier_id?.name || s.supplier_id?.toString() || "";
    return (
      supplierName.toLowerCase().includes(search.toLowerCase()) ||
      s.date.toString().toLowerCase().includes(search.toLowerCase())
    );`1`
  });

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/sup_receipts/${id}`);
      setPayment(payments.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="container mt-4">
     <h2 className="mb-4 d-flex align-items-center fs-5"><span className="  me-2 d-flex align-items-center" style={{color:"#4d6f99ff"}}><GiTakeMyMoney size={24} /></span>{" "}<b >SUPPLIER PAYMENT RECEIPT</b></h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Supplier <span className="text-danger">*</span></label>
          <select className="form-select bg-light" name="supplier_id" value={form.supplier_id} onChange={handleChange}>
            <option value="">-- Select Supplier --</option>
            {suppliers.map(s => (<option key={s._id} value={s._id}>{s.name}</option>))}

          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Date <span className="text-danger">*</span></label>
          <input type="datetime-local" className="form-control bg-light" name="date" value={form.date} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Amount (₹) <span className="text-danger">*</span></label>
          <div className="input-group">
            <span className="input-group-text">₹</span>
            <input type="number" className="form-control bg-light" placeholder="Enter amount" name="amount" value={form.amount} onChange={handleChange} />
          </div>
        </div>

        {/* Payment Mode */}
        <div className="col-md-6">
          <label className="form-label">Payment Mode <span className="text-danger">*</span></label>
          <select className="form-select bg-light" name="mode" value={form.mode} onChange={handleChange}>
            <option value="">-- Select Mode --</option>
            <option value="cash">Cash</option>
            <option value="upi">UPI</option>
            <option value="bank">Bank Transfer</option>
          </select>
        </div>

        {/* Reference No */}
        <div className="col-md-6">
          <label className="form-label">Reference No (UTR / Cheque)</label>
          <input type="text" className="form-control bg-light" placeholder="Enter reference no" name="reference_no" value={form.reference_no} onChange={handleChange} />
        </div>

        {/* Purchase Invoice Adjust */}
        <div className="col-md-6">
          <label className="form-label">Purchase Invoice to Adjust</label>
          <select className="form-select bg-light" name="applied_purchase_id" value={form.applied_purchase_id} onChange={handleChange}>
            <option value="">-- Optional --</option>
            <option value="PUR-2001">PUR-2001</option>
            <option value="PUR-2002">PUR-2002</option>
            <option value="PUR-2003">PUR-2003</option>
          </select>
        </div>

        {/* Notes */}
        <div className="col-12">
          <label className="form-label">Notes</label>
          <textarea className="form-control bg-light" rows="2" placeholder="Enter notes" name="notes" value={form.notes} onChange={handleChange}></textarea>
        </div>

        {/* Buttons */}
        <div className="col-12 d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary px-4 d-flex align-items-center justify-content-center"
          >
            <span className="text-warning me-2 d-flex align-items-center">
              <FaRegSave />
            </span>
            Save Payment
          </button>
          <button type="reset" className="btn btn-secondary px-4 d-flex align-items-center justify-content-center">
            <span className="text-light me-2 d-flex align-items-center"><GrPowerReset /></span>Reset
          </button>
        </div>
      </form>
      <br />
      <div className=" card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Payment Tree</h5>
          <div className="mt-4 mb-2 input-group">
            <input type="text" className="form-control" placeholder="Search Customer name" value={search} onChange={(e) => setSearch(e.target.value)} />
            <span className="input-group-text"><FaSearch /></span>
          </div>
          <table className="table table-bordered table-striped mt-4">
            <thead className="table-dark">
              <tr>
                <th className="fw-bold">Supplier</th>
                <th className="fw-bold">Date</th>
                <th className="fw-bold">Amount</th>

                <th className="fw-bold">Payment Mode</th>
                <th className="fw-bold">Ref No</th>
                <th className="fw-bold">Invoice</th>
                <th className="fw-bold">Notes</th>
                  <th className="fw-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredpayments.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center">
                    No payments found.
                  </td>
                </tr>
              ) : (
                payments.map(p => (
                  <tr key={p._id}>
                    <td>{p.supplier_id?.name}</td>
                    <td>{p.date}</td>
                    <td>{p.amount}</td>
                    <td>{p.mode}</td>
                    <td>{p.reference_no}</td>
                    <td>{p.applied_purchase_id}</td>
                    <td>{p.notes}</td>
                    <td>
                                                <button
                                                  className="btn btn-danger btn-sm"
                                                  onClick={() => handleDelete(p._id)}
                                                >
                                                  <span className="text-warning">
                                                    <MdDeleteForever />
                                                  </span>
                                                  Delete
                                                </button>
                                              </td>
                  </tr>
                )))}
            </tbody>
          </table></div></div>
    </div>

  )
}

export default Supplier_Payment