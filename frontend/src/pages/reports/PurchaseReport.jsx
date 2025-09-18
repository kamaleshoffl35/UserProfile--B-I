import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";

const PurchaseReport = () => {
  const [suppliers, setSuppliers] = useState([])
  const [purchasereport, setPurchasereport] = useState([])
  const [form, setForm] = useState({
    from_date: "",
    to_date: "",
    supplier_id: "",
  })

  useEffect(() => {
    axios.get("http://localhost:5000/api/suppliers")
      .then(res => setSuppliers(res.data))

    axios.get("http://localhost:5000/api/reports/purchase")
      .then(res => setPurchasereport(res.data))
      .catch(err => console.error(err))
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/api/reports/purchase", form)
      setPurchasereport([...purchasereport, res.data])
      setForm({
        from_date: "",
        to_date: "",
        supplier_id: "",
      })
    }
    catch (err) {
      console.error(err.response?.data || err.message)
    }
  }


  return (
    <div className="container mt-4 bg-gradient-warning">


      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">From Date<span className="text-danger">*</span></label>
          <input type="date" className="form-control bg-light" name="from_date" value={form.from_date} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">To Date<span className="text-danger">*</span></label>
          <input type="date" className="form-control bg-light" name="to_date" value={form.to_date} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Supplier<span className="text-danger">*</span></label>
          <select className="form-select bg-light" name="supplier_id" value={form.supplier_id} onChange={handleChange}>
            <option value="">-- Select Supplier --</option>
            {suppliers.map(s => (<option key={s._id} value={s._id}>{s.name}</option>))}
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary px-4 d-flex align-center justify-center">
            <span className="text-warning me-2 d-flex align-items-center"><FaRegSave />
            </span>Save </button>
        </div>
      </form><br />
      <div className=" card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">PurchaseReport Tree</h5>
          <table className="table table-bordered table-striped mt-4">
            <thead className="table-dark">
              <tr>
                <th className="fw-bold">From Date</th>
                <th className="fw-bold">To Date</th>
                <th className="fw-bold">Supplier</th>


              </tr>
            </thead>
            <tbody>
              {purchasereport.map((p) => (
                <tr key={p._id}>

                  <td>{p.from_date}</td>
                  <td>{p.to_date}</td>
                  <td>{p.supplier_id.name}</td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default PurchaseReport;