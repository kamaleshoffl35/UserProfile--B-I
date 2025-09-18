import React, { useEffect, useState } from 'react'
import { IoIosContact } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import axios from 'axios';

const Supplier = () => {
  const [suppliers, setSupplier] = useState([])
  const [form, setForm] = useState({
    name: "",
    phone: "",
    gstin: "",
    email: "",
    address: "",
    state_code: "",
    opening_balance: "",
  })

  useEffect(() => {
    axios.get("http://localhost:5000/api/suppliers")
      .then(res => setSupplier(res.data))
      .catch(err => console.error(err))
  }, [])
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === "checkbox" ? checked : value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/api/suppliers", form);
      setSupplier([...suppliers, res.data])
      setForm({
        name: "",
        phone: "",
        gstin: "",
        email: "",
        address: "",
        state_code: "",
        opening_balance: "",
      })
    }
    catch (err) {
      console.error(err.response?.data || err.message)
    }
  }
  return (
    <div className="container mt-4 bg-gradient-warning">
      <h3 className="mb-4"><span className="text-success"><IoIosContact /></span>  <b>SUPPLIER MASTER</b></h3>
      <form className="row g-3" onSubmit={handleSubmit} >

        <div className="col-md-6">
          <label className="form-label ">Supplier Name <span className="text-danger">*</span></label>
          <input type="text" className="form-control bg-light" placeholder="Enter Supplier Name" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Mobile Number<span className="text-danger">*</span></label>
          <input type="number" className="form-control bg-light" placeholder="10-digit mobile number" maxLength="10" minLength="10" name="phone" value={form.phone} onChange={handleChange} required onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, ""); }} />
        </div>

        <div className="col-md-6">
          <label className="form-label">GSTIN (Optional)</label>
          <input type="text" className="form-control bg-light" placeholder="Enter Supplier Name" name="gstin" value={form.gstin} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label ">Email (Optional)</label>
          <input type="email" className="form-control bg-light" placeholder="exapml@mail.com" name="email" value={form.email} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">Address</label>
          <textarea className="form-control bg-light" rows="2" placeholder="Enter supplier address" name="address" value={form.address} onChange={handleChange}></textarea>
        </div>
        <div className="col-md-6">
          <label className="form-label ">State</label>
          <select className="form-select bg-light " name="state_code" value={form.state_code} onChange={handleChange}>
            <option value="">Select State</option>
            <option value="TN">Tamil Nadu</option>
            <option value="KA">Karnataka</option>
            <option value="KL">Kerala</option>
            <option value="MH">Maharashtra</option>
            <option value="DL">Delhi</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label ">Opening $</label>
          <input className="form-control bg-light" type="number" placeholder="0.00" name="opening_balance" value={form.opening_balance} onChange={handleChange} />
        </div>
        <div >
          <button className="btn btn-primary "><span className="text-warning"><FaRegSave /></span>Save Supplier</button>
        </div>

      </form><br />
      <div className=" card shadow-sm">
                <div className="card-body">
                    <h5 className="mb-3">Supplier Tree</h5>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th className="fw-bold">Supplier Name</th>
            <th className="fw-bold">Mobile Number</th>
            <th className="fw-bold">GSTIN</th>
            <th className="fw-bold">Email</th>
            <th className="fw-bold">Address</th>

            <th className="fw-bold">State</th>

            <th className="fw-bold">Opening</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.phone}</td>
              <td>{s.gstin}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>

              <td>{s.state_code}</td>

              <td>{s.opening_balance}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div></div>
  )
}

export default Supplier