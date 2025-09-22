import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdOutlineCategory } from "react-icons/md";
import { RiFunctionAddLine } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const Category = () => {
  const [categories, setCategories] = useState([]);
   const [form, setForm] = useState({
    parental_id: "",
    name: "",
    code: "",
    subcategory: "",
    brand: "",
    status: false,
  });
  const categoryData = {
    Electronics: {
      Mobiles: ["Samsung", "Apple", "OnePlus"],
      Laptops: ["Dell", "HP", "Lenovo"],
      Televisions: ["Sony", "LG", "Samsung"],
    },
    Clothing: {
      Men: ["Nike", "Adidas", "Puma"],
      Women: ["Zara", "H&M", "Levis"],
      Kids: ["Mothercare", "Disney", "Gap"],
    },
    Furniture: {
      Sofa: ["Godrej", "IKEA", "Urban Ladder"],
      Table: ["Pepperfry", "IKEA"],
      Chair: ["Durian", "Nilkamal"],
    },
  };
const [subcategories, setSubcategories] = useState([]);
const [brands, setBrands] = useState([]);
 useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);
 const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
if (name === "name") {
      setSubcategories(Object.keys(categoryData[value] || {}));
      setBrands([]);
      setForm({ ...form, name: value, subcategory: "", brand: "" });
    } else if (name === "subcategory") {
      setBrands(categoryData[form.name][value] || []);
      setForm({ ...form, subcategory: value, brand: "" });
    } else {
      setForm({ ...form, [name]: type === "checkbox" ? checked : value });
    }
  };
const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/categories", form);
      setCategories([...categories, res.data]);
      setForm({
        parental_id: "",
        name: "",
        code: "",
        subcategory: "",
        brand: "",
        status: false,
      });
      setSubcategories([]);
      setBrands([]);
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };
  const [search, setSearch] = useState("");
  const filteredCategories = categories.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.code.toLowerCase().includes(search.toLowerCase()) ||
            c.parental_id.toLowerCase().includes(search.toLowerCase())
    );

const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/categories/${id}`);
      setCategories(categories.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };
 return (
    <div className="container mt-4 bg-gradient-warning">
      <h2 className="mb-4 d-flex align-items-center fs-5"><span className="  me-2 d-flex align-items-center" style={{color:"#4d6f99ff"}}><MdOutlineCategory size={24} /></span>{" "}<b >CATEGORY MASTER</b></h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label text-dark">Category ID<span className="text-danger">*</span></label>
          <input type="number" className="form-control bg-light" name="parental_id" value={form.parental_id} onChange={handleChange} required/>
        </div>
        <div className="col-md-6">
          <label className="form-label">Category Name<span className="text-danger">*</span></label>
          <select className="form-control" name="name" value={form.name} onChange={handleChange} required>
            <option value="">-- Select Category --</option>
            {Object.keys(categoryData).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Category Code</label>
          <input type="text" className="form-control bg-light" name="code" value={form.code} onChange={handleChange} required/>
        </div>
        {subcategories.length > 0 && (
          <div className="col-md-6">
            <label className="form-label">Subcategory<span className="text-danger">*</span></label>
            <select className="form-control" name="subcategory" value={form.subcategory} onChange={handleChange} required>
              <option value="">Select Subcategory</option>
              {subcategories.map((sub, index) => (
                <option key={index} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}
        {brands.length > 0 && (
          <div className="col-md-6">
            <label className="form-label">Brand</label>
            <select className="form-control" name="brand" value={form.brand} onChange={handleChange}>
              <option value="">-- Select Brand --</option>
              {brands.map((b, index) => (
                <option key={index} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="col-md-4 form-check">
          <label className="form-check-label">Status</label>
          <input type="checkbox" className="form-check-input" name="status" checked={form.status} onChange={handleChange}/>
        </div>
       <div className="col-12">
          <button type="submit" className="btn btn-primary"><span className="text-warning"><RiFunctionAddLine /></span>
            Add Category
          </button>
        </div>
      </form>
      <br />
      <div className=" card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">Category Tree</h5>
          <div className="mt-4 mb-2 input-group">
                                  <input type="text" className="form-control" placeholder="Search Category code, Category name" value={search} onChange={(e) => setSearch(e.target.value)} />
                                  <span className="input-group-text"><FaSearch /></span>
                              </div>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th className="fw-bold">Category ID</th>
                <th className="fw-bold">Category Name</th>
                <th className="fw-bold">Subcategory</th>
                <th className="fw-bold">Brand</th>
                <th className="fw-bold">Category Code</th>
                <th className="fw-bold">Status</th>
                <th className="fw-bold">Actions</th>
              </tr>
            </thead>
            <tbody>{filteredCategories.length === 0 ? (
                                <tr>
                                    <td colSpan="11" className="text-center">
                                        No categories found.
                                    </td>
                                </tr>
                            ) : (
              filteredCategories.map((c) => (
                <tr key={c._id}>
                  <td>{c.parental_id}</td>
                  <td>{c.name}</td>
                  <td>{c.subcategory || "-"}</td>
                  <td>{c.brand || "-"}</td>
                  <td>{c.code}</td>
                  <td className={c.status ? "text-success" : "text-danger"}>
                    {c.status ? "Active" : "Inactive"}
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(c._id)}
                    >
                      <span className="text-warning">
                        <MdDeleteForever />
                      </span>
                      Delete
                    </button>
                  </td>
                </tr>)
              ))
} 
</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Category;
