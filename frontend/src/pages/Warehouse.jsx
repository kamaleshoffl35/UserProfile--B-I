import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { MdOutlineWarehouse } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";

const Warehouse = () => {
  const [warehouses,setWarehouse] = useState([])
  const [form,setForm] = useState({
    store_name:"",
    code:"",
    address:"",
    state_code:"",
    contact:"",
    phone:"",
    email:"",
    status:false
  })

  useEffect(()=>{
    axios.get("http://localhost:5000/api/warehouses")
    .then(res=>setWarehouse(res.data))
    .catch(err=>console.error(err))
  },[])

  const handleChange =(e)=>{
    const {name,value,type,checked} = e.target
    setForm({...form,[name] : type === "checkbox" ? checked : value})
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  try{
    const res =  await axios.post("http://localhost:5000/api/warehouses", form);
    setWarehouse([...warehouses,res.data])
    setForm({
       store_name:"",
    code:"",
    address:"",
    state_code:"",
    contact:"",
    phone:"",
    email:"",
    status:false 
    })
  }
  catch(err){
    console.error(err.response?.data || err.message)
  }
  
}
  return (
   <div className="container mt-4 bg-gradient-warning">
  <h3 className="mb-4"><span className="text-success"><MdOutlineWarehouse /></span>  <b>WAREHOUSE MASTER</b></h3>
      <form className="row g-3" onSubmit={handleSubmit}>

        <div className="col-md-6">
          <label className="form-label">Warehouse / Store Name <span className="text-danger">*</span></label>
          <input type="text" className="form-control bg-light" placeholder="Enter warehouse/store name"  name="store_name" value={form.store_name} onChange={handleChange} required/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Code <span className="text-danger">*</span></label>
          <input type="text" className="form-control bg-light" placeholder="Unique code" name="code" value={form.code} onChange={handleChange}  required/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Location / Address</label>
          <textarea className="form-control bg-light" rows="2" placeholder="Enter address" name="address" value={form.address} onChange={handleChange}></textarea>
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
          <label className="form-label ">Contact Person</label>
          <input type="text" className="form-control bg-light" placeholder="Enter contact person" name="contact" value={form.contact} onChange={handleChange}/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input type="tel" className="form-control bg-light" placeholder="10-digit mobile number" name="phone" value={form.phone} onChange={handleChange} maxLength="10" minLength="10" required onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, "");}}  />
        </div>


        <div className="col-md-6">
          <label className="form-label ">Email</label>
          <input type="email" className="form-control bg-light" placeholder="example@mail.com" name="email" value={form.email} onChange={handleChange}/>
        </div>

        <div className="col-md-6">
          <label className="form-label ">Status</label>
          <div className="form-check ">
            <input className="form-check-input" type="checkbox" id="statusToggle" name="status" value={form.status} onChange={handleChange} defaultChecked/>
            <label className="form-check-label" htmlFor="statusToggle">
              Active
            </label>
          </div>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary px-5">
            <span className="text-warning"><FaRegSave /></span>
            Save Warehouse
          </button>
        </div>
      </form><br />

      <div className=" card shadow-sm">
                <div className="card-body">
                    <h5 className="mb-3">Warehouse Tree</h5>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th className="fw-bold">Warehouse / Store Name</th>
            <th className="fw-bold">code</th>
            <th className="fw-bold">Address</th>
            <th className="fw-bold">State</th>
            <th className="fw-bold">Contact Person</th>

            <th className="fw-bold">Phone</th>

            <th className="fw-bold">Email</th>
            <th className="fw-bold">Status</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map((w) => (
            <tr key={w._id}>
              <td>{w.store_name}</td>
              <td>{w.code}</td>
              <td>{w.address}</td>
              <td>{w.state_code}</td>
              <td>{w.contact}</td>

              <td>{w.phone}</td>

              <td>{w.email}</td>
              <td className={w.status ? "text-success" : "text-danger"}>{w.status ? "Active" : "Inactive"}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  )
}

export default Warehouse