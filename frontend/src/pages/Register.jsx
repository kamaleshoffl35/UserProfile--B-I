// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { register, setUserHeader } from "../services/userService";
const Register=()=>{
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    avatar: "",
    address: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await register(form);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("userId", user._id);
      setUserHeader(user._id);
      navigate("/"); // redirect to dashboard after registration
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 " style={{ backgroundColor: "#c2cdd8ff",}}>
      <form className="card p-4" style={{ minWidth: 520 }} onSubmit={handleSubmit}>
        <h4 className="mb-3 text-center">REGISTER</h4>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-2">
          <label className="form-label">Name<span className="text-danger">*</span></label>
          <input
            className="form-control bg-light"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Email<span className="text-danger">*</span></label>
          <input
            className="form-control bg-light"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Password<span className="text-danger">*</span></label>
          <input
            className="form-control bg-light"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Phone<span className="text-danger">*</span></label>
          <input
            className="form-control bg-light"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

       

        <div className="mb-2">
          <label className="form-label">Address<span className="text-danger">*</span></label>
          <input
            className="form-control bg-light" 
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary w-100">Register</button>
         <p className="mt-3 mb-0 ">
                Do you have an account?{" "}

                <Link to="/login" className="text-decoration-none text-primary " style={{marginLeft:"235px"}}>
                  Sign in
                </Link>
              </p>
      </form>
     
    </div>
  );
}
export default Register
