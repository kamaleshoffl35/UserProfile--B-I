import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { MdOutlineWarehouse } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import PhoneInput from 'react-phone-input-2';
import { State, Country } from 'country-state-city';
import { useDispatch,useSelector } from 'react-redux';
import { addwarehouse, deletewarehouse, fetchwarehouses } from '../redux/warehouseSlice';

const Warehouse = () => {
  const dispatch=useDispatch()
  const {items:warehouses,status}=useSelector((state)=>state.warehouses)
  
  const [form, setForm] = useState({
    store_name: "",
    code: "",
    address: "",
    country: "",
    state_code: "",
    contact: "",
    phone: "",
    email: "",
    status: false
  })
  const [states, setStates] = useState([]);

  useEffect(() => {
   dispatch(fetchwarehouses())
  }, [])

  // Function to update states based on country code
  const updateStates = (countryCode) => {
    console.log("Updating states for country:", countryCode);
    if (countryCode) {
      try {
        const stateList = State.getStatesOfCountry(countryCode.toUpperCase());
        console.log("States found:", stateList.length);
        setStates(stateList);
        setForm(prev => ({ ...prev, state_code: "" }));
      } catch (error) {
        console.error("Error fetching states:", error);
        setStates([]);
      }
    } else {
      setStates([]);
      setForm(prev => ({ ...prev, state_code: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }))

    if (name === "country") {
      updateStates(value);
    }
  }

  const handlePhoneChange = (phone, countryData) => {
    console.log("Phone changed:", phone, countryData);
    
    // Extract country code correctly
    const countryCode = countryData?.countryCode || 
                       countryData?.iso2 || 
                       (countryData?.dialCode === '91' ? 'IN' : '');
    
    console.log("Extracted country code:", countryCode);
    
    setForm(prev => ({
      ...prev,
      phone: phone,
      country: countryCode
    }));

    // Update states based on the selected country
    updateStates(countryCode);
  };

  // Handle country change separately (more reliable)
  const handleCountryChange = (countryCode, countryData) => {
    console.log("Country changed to:", countryCode, countryData);
    setForm(prev => ({
      ...prev,
      country: countryCode
    }));
    updateStates(countryCode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
     dispatch(addwarehouse(form))
      setForm({
        store_name: "",
        code: "",
        address: "",
        country: "",
        state_code: "",
        contact: "",
        phone: "",
        email: "",
        status: false
      })
      setStates([]);
    }
    catch (err) {
      console.error(err.response?.data || err.message)
    }
  }

  const [search, setSearch] = useState("");
  const filteredwarehouse = warehouses.filter(
    (w) =>
      w.store_name.toLowerCase().includes(search.toLowerCase()) ||
      w.phone.toString().includes(search) ||
      w.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    dispatch(deletewarehouse(id))
  };

  return (
    <div className="container mt-4 bg-gradient-warning">
      <h2 className="mb-4 d-flex align-items-center fs-5">
        <span className="me-2 d-flex align-items-center" style={{color:"#4d6f99ff"}}>
          <MdOutlineWarehouse size={24} />
        </span>
        <b>WAREHOUSE MASTER</b>
      </h2>
      
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Warehouse / Store Name <span className="text-danger">*</span></label>
          <input type="text" className="form-control bg-light" placeholder="Enter warehouse/store name" name="store_name" value={form.store_name} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Code <span className="text-danger">*</span></label>
          <input type="text" className="form-control bg-light" placeholder="Unique code" name="code" value={form.code} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Location / Address</label>
          <textarea className="form-control bg-light" rows="2" placeholder="Enter address" name="address" value={form.address} onChange={handleChange}></textarea>
        </div>

        <div className="col-md-6">
          <label className="form-label">Contact Person</label>
          <input type="text" className="form-control bg-light" placeholder="Enter contact person" name="contact" value={form.contact} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">
            Mobile Number <span className="text-danger">*</span>
          </label>
          <PhoneInput
            country={'in'}
            value={form.phone}
            onChange={handlePhoneChange}
            onCountryChange={handleCountryChange}
            inputProps={{
              name: 'phone',
              required: true,
              autoFocus: true,
              pattern: "^[0-9\\-\\+\\s]{7,15}$",
              className: 'form-control bg-light',
            }}
            containerStyle={{ width: '100%' }}
            inputStyle={{
              width: '100%',
              height: '38px',
              padding: '6px 12px',
              fontSize: '1rem',
            }}
            buttonStyle={{
              border: '1px solid #ced4da',
              height: '38px',
            }}
          />
          <small className="text-muted">Selected country: {form.country || 'None'}</small>
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" className="form-control bg-light" placeholder="example@mail.com" name="email" value={form.email} onChange={handleChange} />
        </div>

        <div className="col-md-6">
          <label className="form-label">State <span className="text-danger">*</span></label>
          <select 
            className="form-select bg-light" 
            name="state_code" 
            value={form.state_code} 
            onChange={handleChange}
            required
            disabled={!form.country}
          >
            <option value="">Select State</option>
            {states.map(s => (
              <option key={s.isoCode} value={s.isoCode}>
                {s.name} ({s.isoCode})
              </option>
            ))}
          </select>
          {form.country && (
            <small className="form-text text-muted">
              States for {Country.getCountryByCode(form.country)?.name || form.country}: {states.length} states available
            </small>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Status</label>
          <div className="form-check">
            <input 
              className="form-check-input" 
              type="checkbox" 
              id="statusToggle" 
              name="status" 
              checked={form.status} 
              onChange={handleChange} 
            />
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
      </form>
      
      <br />

      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Warehouse Tree</h5>
          <div className="mt-4 mb-2 input-group">
            <input type="text" className="form-control" placeholder="Search Warehouse name, email, phone" value={search} onChange={(e) => setSearch(e.target.value)} />
            <span className="input-group-text"><FaSearch /></span>
          </div>
          
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th className="fw-bold">Warehouse / Store Name</th>
                <th className="fw-bold">Code</th>
                <th className="fw-bold">Address</th>
                <th className="fw-bold">State</th>
                <th className="fw-bold">Contact Person</th>
                <th className="fw-bold">Phone</th>
                <th className="fw-bold">Email</th>
                <th className="fw-bold">Status</th>
                <th className="fw-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredwarehouse.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center">
                    No warehouses found.
                  </td>
                </tr>
              ) : (
                filteredwarehouse.map((w) => (
                  <tr key={w._id}>
                    <td>{w.store_name}</td>
                    <td>{w.code}</td>
                    <td>{w.address}</td>
                    <td>{w.state_code}</td>
                    <td>{w.contact}</td>
                    <td>{w.phone}</td>
                    <td>{w.email}</td>
                    <td className={w.status ? "text-success" : "text-danger"}>
                      {w.status ? "Active" : "Inactive"}
                    </td>
                    <td>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(w._id)}>
                        <span className="text-warning">
                          <MdDeleteForever />
                        </span>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Warehouse