import React, { useEffect, useState } from 'react'
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaRegSave } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import axios from 'axios';
import { MdDeleteForever } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
const Tax = () => {
    const [taxes, setTaxes] = useState([])
    const [form, setForm] = useState({
        name: "",
        cgst_percent: "",
        sgst_percent: "",
        igst_percent: "",
        cess_percent: "",
        is_inclusive: false,
    })
    useEffect(() => {
        axios.get("http://localhost:5000/api/taxes")
            .then(res => setTaxes(res.data))
            .catch(err => console.error(err))
    }, [])
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        let val = value;
  if (type === "number") val = Number(value);   
  if (type === "checkbox") val = checked; 
        setForm({ ...form, [name]: type === "checkbox" ? checked : value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:5000/api/taxes", form)
            setTaxes([...taxes, res.data])
            setForm({
                name: "",
                cgst_percent: "",
                sgst_percent: "",
                igst_percent: "",
                cess_percent: "",
                is_inclusive: false,
            })

        }
        catch (err) {
            console.error(err.response?.data || err.message)
        }
    }

     const [search, setSearch] = useState("");
      const filteredtaxes = taxes.filter(
            (t) =>
                t.name.toLowerCase().includes(search.toLowerCase()) 
                
        );

    const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/taxes/${id}`);
      setTaxes(taxes.filter((t) => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

    return (
        <div className="container mt-4 bg-gradient-warning">
            <h2 className="mb-4 d-flex align-items-center fs-5"><span className="  me-2 d-flex align-items-center" style={{color:"#4d6f99ff"}}><MdOutlineAttachMoney size={24} /></span>{" "}<b >TAX MASTER</b></h2>
            <form className="row g-3" onSubmit={handleSubmit}>

                <div className="col-md-6">
                    <label className="form-label">Tax Name</label>
                    <input type="text"
                        className="form-control bg-light"
                        name="name" value={form.name} onChange={handleChange}
                        placeholder='e.g,GST 18%' />
                </div>
                <div className="col-md-6">
                    <label className="form-label">CGST %</label>
                    <input type="number"
                        className="form-control bg-light" name="cgst_percent" value={form.cgst_percent} onChange={handleChange}
                        placeholder='0.00' />
                </div>
                <div className="col-md-6">
                    <label className="form-label">SGST %</label>
                    <input type="number"
                        className="form-control bg-light" name="sgst_percent" value={form.sgst_percent} onChange={handleChange}
                        placeholder='0.00' />
                </div>
                <div className="col-md-6">
                    <label className="form-label">IGST %</label>
                    <input type="number" name="igst_percent" value={form.igst_percent} onChange={handleChange}
                        className="form-control bg-light"
                        placeholder='0.00' />
                </div>
                <div className="col-md-6">
                    <label className="form-label">CESS % (Optional)</label>
                    <input type="number"
                        className="form-control bg-light" name="cess_percent" value={form.cess_percent} onChange={handleChange}
                        placeholder='0.00' />
                </div>
                <div className="col-md-6 form-check">
                    <input type="checkbox" className="form-check-input " name="is_inclusive" value={form.is_inclusive} onChange={handleChange} />
                    <label className="form-check-label">Inclusive Tax</label>
                </div>
                <div className="col-12 d-flex gap-2">
                    <button type="submit" className="btn btn-primary"><span className="text-warning"><FaRegSave /></span>Save</button>
                    <button type="submit" className="btn btn-secondary"> <span ><FcCancel /></span>Cancel</button>
                </div>
            </form>


            <div className="card shadow-sm my-4">
                <div className="card-body">
                    <h5>Existing Tax Rates</h5>
                     <div className="mt-4 mb-2 input-group">
                                                      <input type="text" className="form-control" placeholder="Search Category code, Category name" value={search} onChange={(e) => setSearch(e.target.value)} />
                                                      <span className="input-group-text"><FaSearch /></span>
                                                  </div>
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th className="fw-bold">Tax Name/Value</th>
                                <th className="fw-bold">CGST</th>
                                <th className="fw-bold">SGST</th>
                                <th className="fw-bold">IGST</th>
                                <th className="fw-bold">CESS</th>
                                <th className="fw-bold">Inclusive Tax</th>
                                <th className="fw-bold">Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {filteredtaxes.length === 0 ? (
                                <tr>
                                    <td colSpan="11" className="text-center">
                                        No taxes found.
                                    </td>
                                </tr>
                            ) : (
                            taxes.map(t => (
                                <>
                                    <tr key={t._id}>
                                        <td>{t.name}</td>
                                        <td>{t.cgst_percent}</td>
                                        <td>{t.sgst_percent}</td>
                                        <td>{t.igst_percent}</td>
                                        <td>{t.cess_percent}</td>
                                        <td className={t.is_inclusive ? "text-success" : "text-danger"}>
                                            {t.is_inclusive ? "Active" : "Inactive"}
                                        </td>
                                        <td>
                                            <button className="btn btn-danger btn-sm" onClick={()=>handleDelete(t._id)}>
                                                <span className="text-warning">
                                                    <MdDeleteForever />
                                                </span>
                                                Delete
                                            </button></td>
                                    </tr>
                                </>
                            )
                            ))}
                        </tbody>
                        </table>
                </div>
            </div>
        </div>
    )
}

export default Tax