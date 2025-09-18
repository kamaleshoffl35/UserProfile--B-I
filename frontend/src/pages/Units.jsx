
import React, { useEffect, useState } from 'react'
import { LiaWeightSolid } from "react-icons/lia";
import { IoSaveOutline } from "react-icons/io5";
import axios from 'axios';

const Units = () => {
  const [units, setUnits] = useState([])
  const [form, setForm] = useState({
    name:"",
    symbol:""
  })
  useEffect(()=>{
    axios.get("http://localhost:5000/api/units")
    .then(res => setUnits(res.data))
    .catch(err => console.error(err))
  },[])
  const handleChange =(e)=>{
    const {name,value,type,checked} = e.target
    setForm({...form,[name] : type === "checkbox" ? checked : value})
  }
const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post("http://localhost:5000/api/units", form)
      console.log(res.data)
      setUnits([...units,res.data])
      setForm({
        name:"",
        symbol:""
      })
      
    }
    catch(err){
      console.error(err.response.data || err.message)
    }
}

  return (
    <div className="container mt-4 bg-gradient-warning">
      <h2 className='my-4'><span className="text-success"><LiaWeightSolid /></span>  <b>UNITS MASTER</b></h2>
      <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-6">
        <label className="form-label ">Unit Name</label>
        <input type="text" className='form-control bg-light' name="name" value={form.name} onChange={handleChange} placeholder='e.g,Kilogram'/>
      </div>
      <div className="col-md-6">
        <label className="form-label ">Symbol</label>
        <input type="text" className='form-control bg-light' name="symbol" value={form.symbol} onChange={handleChange} placeholder='e.g,Kg'/>
      </div>
      <div className="col-12">
        <button type ="submit"className='btn btn-primary'>
          <span className="text-warning"><IoSaveOutline /></span>
          Save Unit</button>
        
      </div>
      </form><br/>
      <div className=" card shadow-sm">
                <div className="card-body">
                    <h5 className="mb-3">Unit Tree</h5>
      <div className='my-4'>
        <table className="table table-bordered table-striped">
           <thead className="table-dark">
            <tr>
              <th className="fw-bold">Unit Name</th>
              <th className="fw-bold">Unit Symbol</th>
            </tr>
           </thead>
           <tbody>
             {units.map(u =>(
              <>
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.symbol}</td>
              </tr>
              </>
             )
             )}
           </tbody>
        </table>
       </div>
       </div>
      </div>
    </div>
  )
}

export default Units 
