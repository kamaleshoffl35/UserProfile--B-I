import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";


const StockReport = () => {
  const [products,setProducts]=useState([])
  const [warehouses,setWarehouses]=useState([])
  const [categories,setCategories]=useState([])
  const [stockreport,setStockreport] = useState([])
  const [form,setForm] = useState({
    product_id:"",
    warehouse_id:"",
    category_id:"",
  })

  useEffect(()=>{
    axios.get("http://localhost:5000/api/products")
    .then(res=>setProducts(res.data))

    axios.get("http://localhost:5000/api/warehouses")
    .then(res=>setWarehouses(res.data))

    axios.get("http://localhost:5000/api/categories")
    .then(res=>setCategories(res.data))

    axios.get("http://localhost:5000/api/reports/stock")
    .then(res=>setStockreport(res.data))
    .catch(err=>console.error(err))
  },[])
  const handleChange=(e)=>{
    const {name,value}=e.target
    setForm({...form,[name]:value})
  }
  const handleSubmit=async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post("http://localhost:5000/api/reports/stock",form)
      setStockreport([...stockreport,res.data])
      setForm({
        product_id:"",
        warehouse_id:"",
        category_id:"",
      })
    }
    catch(err){
      console.error(err.response?.data || err.message)
    }
  }
  return (
    
    <div className="container mt-4 bg-gradient-warning">
      
    
        <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Product<span className="text-danger">*</span></label>
          <select className="form-select bg-light" name="product_id" value={form.product_id} onChange={handleChange}>
           <option>-- Select Product --</option>
            {products.map(p=>(<option key={p._id} value={p._id}>{p.name}</option>))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Warehouse<span className="text-danger">*</span></label>
          <select className="form-select bg-light" name="warehouse_id" value={form.warehouse_id} onChange={handleChange}>
            <option value="">-- Select Warehouse --</option>
           {warehouses.map(w=>(<option key={w._id} value={w._id}>{w.name || w.store_name}</option>))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Category<span className="text-danger">*</span></label>
          <select className="form-select bg-light" name="category_id" value={form.category_id} onChange={handleChange}>
            <option>-- Select Category --</option>
          {categories.map(c=>(<option key={c._id} value={c._id}>{c.name}</option>))}
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
          <h5 className="mb-3">StockReport Tree</h5>
        <table className="table table-bordered table-striped mt-4">
            <thead className="table-dark">
              <tr>
                <th className="fw-bold">Product</th>
                <th className="fw-bold">Warehouse</th>
                <th className="fw-bold">Category</th>

               


              </tr>
            </thead>
            <tbody>
              {stockreport.map((s) => (
                <tr key={s._id}>

                  <td>{s.product_id.name}</td>
                  <td>{s.warehouse_id?.name || s.warehouse_id?.store_name || s.warehouse_id?.warehouse_name}</td>

                  <td>{s.category_id.name}</td>
                  

                </tr>
              ))}
            </tbody>
          </table></div></div>
      
    </div>
  );
};

export default StockReport;