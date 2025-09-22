import React, { useEffect, useState } from 'react'
import { MdAttachMoney } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import axios from 'axios';

const Customer_Payment = () => {
    const [customers, setCustomer] = useState([])
    const [payments,setPayments] = useState([])
    const [form,setForm] =  useState({
        customer_id:"",
        date:new Date().toISOString().slice(0, 16),
        amount:"",
        mode:"",
        reference_no:"",
        applied_invoice_id:"",
        notes:"",
    })
    useEffect(()=>{
      axios.get("http://localhost:5000/api/customers")
       .then(res => setCustomer(res.data))

      axios.get("http://localhost:5000/api/cus_receipts")
      .then(res=>setPayments(res.data))
      .catch(err=>console.error(err))
    },[])
    const handleChange = (e) =>{
        const {name,value} = e.target
        setForm({...form,[name]:value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
          const res = await axios.post("http://localhost:5000/api/cus_receipts",form)
            setPayments([...payments ,res.data])
            setForm({
                customer_id:"",
                date:new Date().toISOString().slice(0, 16),
                amount:"",
                mode:"",
                reference_no:"",
                applied_invoice_id:"",
                notes:""
            })
        }
        catch(err){
            console.error(err.response?.data || err.message)
        }
    }
    const [search, setSearch] = useState("");
      const filteredpayments = payments.filter((c) => {
  const customerName = c.customer_id?.name || c.customer_id?.toString() || "";
  return (
    customerName.toLowerCase().includes(search.toLowerCase()) ||
    c.date.toString().toLowerCase().includes(search.toLowerCase())
  );
});

const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cus_receipts/${id}`);
      setPayments(payments.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

    
  return (
     <div className="container mt-4">
      <h2 className="mb-4 d-flex align-items-center fs-5"><span className="  me-2 d-flex align-items-center" style={{color:"#4d6f99ff"}}><MdAttachMoney size={24} /></span>{" "}<b >CUSTOMER PAYMENT RECEIPT</b></h2>
      <form className="row g-3" onSubmit={handleSubmit}>

        <div className="col-md-6">
          <label className="form-label">Customer <span className="text-danger">*</span></label>
          <select className="form-select bg-light" name ="customer_id"  value={form.customer_id} onChange={handleChange} required>
            <option>-- Select Customer --</option>
            {customers.map(c=>(<option key={c._id} value={c._id}>{c.name}</option>))}
         
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Date <span className="text-danger">*</span></label>
          <input type="datetime-local" className="form-control bg-light" name="date" value={form.date} onChange={handleChange} required />
        </div>

        <div className="col-md-6">
          <label className="form-label">Amount (₹) <span className="text-danger">*</span></label>
          <input type="number" className="form-control bg-light" name="amount" value={form.amount} onChange={handleChange} placeholder="Enter amount" required/>
        </div>

        <div className="col-md-6">
          <label className="form-label">Payment Mode <span className="text-danger">*</span></label>
          <select className="form-select bg-light " name="mode" value={form.mode} onChange={handleChange} required>
            <option>-- Select Mode --</option>
            <option>Cash</option>
            <option>UPI</option>
            <option>Bank Transfer</option>
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label">Reference No (UTR/Cheque)</label>
          <input type="text" className="form-control bg-light" name="reference_no" value={form.reference_no} onChange={handleChange} placeholder="Enter reference no" />
        </div>

        <div className="col-md-6">
          <label className="form-label ">Invoice to Adjust</label>
          <select className="form-select bg-light" name="applied_invoice_id" value={form.applied_invoice_id} onChange={handleChange}>
            <option>-- Optional --</option>
            <option>INV-1001</option>
            <option>INV-1002</option>
            <option>INV-1003</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Notes</label>
          <textarea className="form-control bg-light" rows="2" placeholder="Enter notes" name="notes" value={form.notes} onChange={handleChange}></textarea>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary px-4 d-flex align-center justify-center">
          <span className="text-warning me-2 d-flex align-items-center"><FaRegSave />
          </span>Save Payment</button>
        </div>
      </form><br />
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
      <th className="fw-bold">Customer</th>
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
    payments.map((p)=>(
      <tr key={p._id}>
        <td>{p.customer_id?.name || "Unknown Customer" }</td>
        <td>{p.date}</td>
        <td>{p.amount}</td>
        <td>{p.mode}</td>
        <td>{p.reference_no}</td>
        <td>{p.applied_invoice_id}</td>
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

export default Customer_Payment