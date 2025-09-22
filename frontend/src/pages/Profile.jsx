
import React, { useState, useEffect } from "react";
import { getMe, setUserHeader } from "../services/userService";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      const id = localStorage.getItem("userId");
      if (id) {
        (async () => {
          const u = await getMe(id);
          setUser(u);
          localStorage.setItem("user", JSON.stringify(u));
          setUserHeader(id);
        })();
      }
    }
  }, []);

  const handleChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const save = async () => {
    try {
      setSaving(true);
      const res = await axios.put(`http://localhost:5000/api/users/${user._id}`, user);
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      alert("Saved");
    } catch (err) {
      alert(err.response?.data?.error || err.message);
    } finally {
      setSaving(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h4>Profile</h4>
      <div className="card p-3">
        <div className="mb-2">
          <label className="form-label">Name</label>
          <input className="form-control" name="name" value={user.name} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label className="form-label">Email</label>
          <input className="form-control" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <label className="form-label">Phone</label>
          <input className="form-control" name="phone" value={user.phone || ""} onChange={handleChange} />
        </div>
        
        <button className="btn btn-primary" onClick={save} disabled={saving}>
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
