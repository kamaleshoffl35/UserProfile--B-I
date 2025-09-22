import React, { useEffect, useState } from 'react'
import { IoIosContact } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import { FaSearch } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';

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
    const [search, setSearch] = useState("");
    const filteredCustomers = customers.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.phone.toString().includes(search) ||
            c.email.toLowerCase().includes(search.toLowerCase())
    );
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/customers/${id}`);
            setCustomer(customers.filter((c) => c._id !== id));
        } catch (err) {
            console.error(err);
        }
    };



    return (

        <div className="container mt-4 bg-gradient-warning">
            <h2 className="mb-4 d-flex align-items-center fs-5"><span className="  me-2 d-flex align-items-center" style={{ color: "#4d6f99ff" }}><IoIosContact size={24} /></span>{" "}<b >CUSTOMER MASTER</b></h2>
            <form className="row g-3" onSubmit={handleSubmit}>

                <div className="col-md-6">
                    <label className="form-label">Customer Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control bg-light" placeholder="Enter full name" onChange={handleChange} name="name" value={form.name} required pattern="[A-Za-z\s]+" />
                </div>
                <div className="col-md-6">
                    <label className="form-label">
                        Mobile Number <span className="text-danger">*</span>
                    </label>
                    <PhoneInput
                        country={'in'}
                        value={form.phone}
                        onChange={(phone) => setForm({ ...form, phone })}
                        inputProps={{
                            name: 'phone',
                            required: true,
                            autoFocus: true,
                            pattern: "\\d{10,15}",
                            className: 'form-control bg-light',
                        }}
                        containerStyle={{ width: '100%' }}
                        inputStyle={{
                            width: '100%',
                            height: '38px', // match Bootstrap default input height
                            padding: '6px 12px',
                            fontSize: '1rem',
                        }}
                        buttonStyle={{
                            border: '1px solid #ced4da',
                            height: '38px',
                        }}
                    />
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
                    <input type="number" className="form-control bg-light" placeholder="e.g. 50000" onChange={handleChange} name="credit_limit" value={form.credit_limit} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Opening Balance (Optional)</label>
                    <input type="number" className="form-control bg-light" placeholder="e.g. 1000" onChange={handleChange} value={form.opening_balance} name="opening_balance" />
                </div>


                <div >
                    <button type="button" className="btn btn-secondary me-2"><span ><FcCancel /></span>Cancel</button>
                    <button type="submit" className="btn btn-primary"><span className="text-warning"><FaRegSave /></span>Save Customer</button>
                </div>
            </form><br />
            <div className=" card shadow-sm">
                <div className="card-body">
                    <h5 className="mb-3">Customer Tree</h5>
                    <div className="mt-4 mb-2 input-group">
                        <input type="text" className="form-control" placeholder="Search Customer, name, email" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <span className="input-group-text"><FaSearch /></span>
                    </div>
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
                                <th className="fw-bold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan="11" className="text-center">
                                        No customers found.
                                    </td>
                                </tr>
                            ) : (
                                customers.map((c) => (
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
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(c._id)}>
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
            </div>
        </div>

    )
}

export default Customer