import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const GstReport = () => {
  const [customers, setCustomers]=useState([])
  const [suppliers, setSuppliers] = useState([])
  const [gstreports,setGstreports]=useState([])
  const [form,setForm] = useState({
    report_type:"",
    from_date:"",
    to_date:"",
    customer_id:"",
    supplier_id:"",
    hsn:"",
    state:"",
  })
  useEffect(()=>{
    axios.get("http://localhost:5000/api/customers")
    .then(res=>setCustomers(res.data))

    axios.get("http://localhost:5000/api/suppliers")
      .then(res => setSuppliers(res.data));


    axios.get("http://localhost:5000/api/reports/gst")
    .then(res=>setGstreports(res.data))
    .catch(err=>console.error(err))
  },[])
  const handleChange=(e)=>{
    const {name,value}=e.target
  if (name === "customer_id") {
  if (form.report_type === "Sales") {
    const selected = customers.find(c => c._id === value);
    setForm({
      ...form,
      customer_id:value,
      supplier_id:"", 
      state:selected ? selected.state_code:""
    });
  } else if (form.report_type === "Purchase") {
    const selected=suppliers.find(s => s._id === value);
    setForm({
      ...form,
      supplier_id:value,
      customer_id:"", 
      state:selected ? selected.state_code:""
    });
  }
 
} else {
    setForm({ ...form,[name]:value }); 
  }

  }
  const handleSubmit=async (e) => {
    e.preventDefault()
    try{
      const payload={ ...form };
    if(!payload.customer_id) 
      delete payload.customer_id;
    if(!payload.supplier_id) 
      delete payload.supplier_id;
      const res = await axios.post("http://localhost:5000/api/reports/gst",payload)
      setGstreports([...gstreports,res.data])
      setForm({
        report_type:"",
        from_date:"",
        to_date:"",
        customer_id:"",
        supplier_id:"",
        hsn:"",
        state:""
      })
    }
    catch(err){
      console.error(err.response?.data || err.message)
    }
  }
   const isSales=form.report_type === "Sales";
  const dropdownLabel=isSales ? "Customer" : "Supplier";
  const dropdownData=isSales ? customers : suppliers;

  const [search, setSearch] = useState("");
    const filteredreports = gstreports.filter((s) => {

      const supplierName = s.supplier_id?.name || s.supplier_id?.toString() || "";
      const customerName = s.customer_id?.name || s.customer_id?.toString() || "";
      return (
        s.report_type.toLowerCase().includes(search.toLowerCase()) ||
        supplierName.toLowerCase().includes(search.toLowerCase()) || 
        customerName.toLowerCase().includes(search.toLowerCase()) ||
        s.from_date.toString().toLowerCase().includes(search.toLowerCase())
      );
    });

    const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/reports/gst/${id}`);
      setGstreports(gstreports.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4 bg-gradient-warning">
      

   
        <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Report Type</label>
          <select className="form-control bg-light" name="report_type" value={form.report_type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="Sales">Sales</option>
            <option value="Purchase">Purchase</option>
            </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">From Date</label>
          <input type="date" className="form-control bg-light" name="from_date" value={form.from_date} onChange={handleChange}/>
        </div>
        <div className="col-md-6">
          <label className="form-label">To Date</label>
          <input type="date" className="form-control bg-light" name="to_date" value={form.to_date} onChange={handleChange}/>
        </div>
        <div className="col-md-6">
          <label className="form-label">{dropdownLabel}</label>
          <select className="form-select bg-light" name={isSales?"customer_id" : "supplier_id"} value={isSales?form.customer_id : form.supplier_id} onChange={handleChange}>
            <option value="">{dropdownLabel}</option>
            {dropdownData.map(item=>(<option key={item._id} value={item._id}>{item.name}</option>))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">HSN</label>
          <input type="text" className="form-control bg-light" name="hsn" value={form.hsn} onChange={handleChange}  />
        </div>
         <div className="col-md-6">
          <label className="form-label">State</label>
          <input type="text" className="form-control bg-light" name="state" value={form.state}  disabled />
        </div>
        <div className="col-12">
                  <button type="submit" className="btn btn-primary px-4 d-flex align-center justify-center">
                    <span className="text-warning me-2 d-flex align-items-center"><FaRegSave />
                    </span>Save </button>
                </div>
                </form>
                <br />
                <div className=" card shadow-sm">
                        <div className="card-body">
                          <h5 className="mb-3">StockReport Tree</h5>
                          <div className="mt-4 mb-2 input-group">
                                      <input type="text" className="form-control" placeholder="Search Product, Warehouse name" value={search} onChange={(e) => setSearch(e.target.value)} />
                                      <span className="input-group-text"><FaSearch /></span>
                                    </div>
             <table className="table table-bordered table-striped mt-4">
            <thead className="table-dark">
              <tr>
                <th className="fw-bold">Report Type</th>
                <th className="fw-bold">From Date</th>
                <th className="fw-bold">To Date</th>
                <th className="fw-bold">{dropdownLabel}</th>
                <th className="fw-bold">HSN</th>
                <th className="fw-bold">State</th>
                <th className="fw-bold">Actions</th>

              </tr>
            </thead>
            <tbody>
              {filteredreports.length === 0 ? (
                <tr>
                  <td colSpan="11" className="text-center">
                    No reports found.
                  </td>
                </tr>
              ) : (
              filteredreports.map((g) => (
                <tr key={g._id}>
                  <td>{g.report_type === "Sales"? (g.customer_id?.name || g.customer_id?._id || ""): (g.supplier_id?.name || g.supplier_id?._id || "")}</td>

                  <td>{g.from_date}</td>
                  <td>{g.to_date}</td>
                  <td>{g.report_type === "Sales" ? g.customer_id?.name : g.supplier_id?.name}</td>
                  <td>{g.hsn}</td>
                  <td>{g.state}</td>
                  <td>
                                                          <button
                                                            className="btn btn-danger btn-sm"
                                                            onClick={() => handleDelete(g._id)}
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
          </table>  
          </div>
          </div> 
      
    </div>
  );
};

export default GstReport;