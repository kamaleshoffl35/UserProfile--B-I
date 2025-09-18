import React, { useEffect, useState } from 'react'
import { IoIosContact } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import axios from 'axios';

const Customer = () => {
    const [customers, setCustomer] = useState([])
    const [form, setForm] = useState({
        name: "",
        phone: "",
        gstin: "",
        email: "",
        billing_address: "",
        shipping_address: "",
        state_code: "",
        credit_limit: "",
        opening_balance: "",

    })
    useEffect(() => {
        axios.get("http://localhost:5000/api/customers")
            .then(res => setCustomer(res.data))
            .catch(err => console.error(err))
    }, [])
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({ ...form, [name]: type === "checkbox" ? checked : value });

    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:5000/api/customers", form);
            setCustomer([...customers, res.data])
            setForm({
                name: "",
                phone: "",
                gstin: "",
                email: "",
                billing_address: "",
                shipping_address: "",
                state_code: "",
                credit_limit: "",
                opening_balance: "",
            })
        }
        catch (err) {
            console.error(err.response?.data || err.message);
        }

    }

    return (

        <div className="container mt-4 bg-gradient-warning">
            <h3 className="mb-4"><span className="text-success"><IoIosContact /></span>  <b>CUSTOMER MASTER</b></h3>
            <form className="row g-3" onSubmit={handleSubmit}>

                <div className="col-md-6">
                    <label className="form-label">Customer Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control bg-light" placeholder="Enter full name" onChange={handleChange} name="name" value={form.name} required />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Mobile Number <span className="text-danger">*</span></label>
                    <input type="text" className="form-control bg-light" placeholder="10-digit mobile number" maxLength="10" minLength="10" onChange={handleChange} name="phone" value={form.phone} required onInput={(e) => { e.target.value = e.target.value.replace(/\D/g, ""); }} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">GSTIN (Optional)</label>
                    <input type="text" className="form-control bg-light" placeholder="Optional GSTIN" onChange={handleChange} name="gstin" value={form.gstin} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email (Optional)</label>
                    <input type="email" className="form-control bg-light" placeholder="example@mail.com" onChange={handleChange} name="email" value={form.email} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Billing Address <span className="text-danger">*</span></label>
                    <textarea className="form-control bg-light" rows="2" placeholder="Enter billing address" onChange={handleChange} name="billing_address" value={form.billing_address} required></textarea>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Shipping Address (Optional)</label>
                    <textarea className="form-control bg-light" rows="2" placeholder="Enter shipping address" onChange={handleChange} name="shipping_address" value={form.shipping_address}></textarea>
                </div>
                <div className="col-md-6">
                    <label className="form-label">State <span className="text-danger">*</span></label>
                    <select className="form-select bg-light" onChange={handleChange} name="state_code" value={form.state_code} required>
                        <option>Select State</option>
                        <option>Tamil Nadu</option>
                        <option>Karnataka</option>
                        <option>Maharashtra</option>
                        <option>Delhi</option>
                        <option >Kerala</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label className="form-label">Credit Limit (Optional)</label>
                    <input type="text" className="form-control bg-light" placeholder="e.g. 50000" onChange={handleChange} name="credit_limit" value={form.credit_limit} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Opening Balance (Optional)</label>
                    <input type="text" className="form-control bg-light" placeholder="e.g. 1000" onChange={handleChange} value={form.opening_balance} name="opening_balance" />
                </div>


                <div >
                    <button type="button" className="btn btn-secondary me-2"><span ><FcCancel /></span>Cancel</button>
                    <button type="submit" className="btn btn-primary"><span className="text-warning"><FaRegSave /></span>Save Customer</button>
                </div>
            </form><br />
            <div className=" card shadow-sm">
                <div className="card-body">
                    <h5 className="mb-3">Customer Tree</h5>
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th className="fw-bold">Customer Name</th>
                        <th className="fw-bold">Mobile Number</th>
                        <th className="fw-bold">GSTIN</th>
                        <th className="fw-bold">Email</th>
                        <th className="fw-bold">Billing Address</th>
                        <th className="fw-bold">Shipping Address</th>
                        <th className="fw-bold">State</th>
                        <th className="fw-bold">Credit Limit</th>
                        <th className="fw-bold">Opening Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => (
                        <tr key={c._id}>
                            <td>{c.name}</td>
                            <td>{c.phone}</td>
                            <td>{c.gstin}</td>
                            <td>{c.email}</td>
                            <td>{c.billing_address}</td>
                            <td>{c.shipping_address}</td>
                            <td>{c.state_code}</td>
                            <td>{c.credit_limit}</td>
                            <td>{c.opening_balance}</td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
        </div>
        </div>

    )
}

export default Customer