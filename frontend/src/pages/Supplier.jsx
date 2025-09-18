import React, { useEffect, useState } from 'react'
import { IoIosContact } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
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

  const [search, setSearch] = useState("");
      const filteredsuppliers = suppliers.filter(
          (s) =>
              s.name.toLowerCase().includes(search.toLowerCase()) ||
              s.phone.toString().includes(search) ||
              s.email.toLowerCase().includes(search.toLowerCase())
      );

      const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/suppliers/${id}`);
      setSupplier(suppliers.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="container mt-4 bg-gradient-warning">
      <h3 className="mb-4"><span className="text-success"><IoIosContact /></span>  <b>SUPPLIER MASTER</b></h3>
      <form className="row g-3" onSubmit={handleSubmit} >

        <div className="col-md-6">
          <label className="form-label ">Supplier Name <span className="text-danger">*</span></label>
          <input type="text" className="form-control bg-light" placeholder="Enter Supplier Name" name="name" value={form.name} onChange={handleChange} required/>
        </div>
        <div className="col-md-6">
          <label className="form-label">Mobile Number<span className="text-danger">*</span></label><div className="input-group">
                        <select
                            className="form-select"
                            style={{ maxWidth: "100px" }}
                            name="country_code"
                            value={form.country_code}
                            onChange={handleChange}
                            required
                        >
                            <option value="+91">🇮🇳 +91</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                        </select>
          <input type="number" className="form-control bg-light" placeholder="10-digit mobile number" maxLength="10" minLength="10" name="phone" value={form.phone} onChange={handleChange} pattern="\d{10}" required onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, ""); }} />
        </div></div>

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
                    <div className="mt-4 mb-2 input-group">
                                            <input type="text" className="form-control" placeholder="Search Category code, Category name" value={search} onChange={(e) => setSearch(e.target.value)} />
                                            <span className="input-group-text"><FaSearch /></span>
                                        </div>
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
            <th className="fw-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredsuppliers.length === 0 ? (
                                <tr>
                                    <td colSpan="11" className="text-center">
                                        No suppliers found.
                                    </td>
                                </tr>
                            ) : (
          suppliers.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.phone}</td>
              <td>{s.gstin}</td>
              <td>{s.email}</td>
              <td>{s.address}</td>

              <td>{s.state_code}</td>

              <td>{s.opening_balance}</td>
              <td> <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(s._id)}>
                                                              <span className="text-warning">
                                                                  <MdDeleteForever />
                                                              </span>
                                                              Delete
                                                          </button></td>

            </tr>
          )))}
        </tbody>
      </table>
    </div>
    </div></div>
  )
}

export default Supplier