
import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { getMe, setUserHeader } from "../services/userService";
import { useNavigate } from "react-router-dom";

const UserProfile=()=>{
const [user,setUser]=useState(null);
  const [open,setOpen]=useState(false);
  const navigate=useNavigate();
  const ref=useRef();
useEffect(() => {
    const stored=localStorage.getItem("user");
    const userId=localStorage.getItem("userId");
    if(stored){
      setUser(JSON.parse(stored));
      setUserHeader(JSON.parse(stored)._id);
    }else if(userId){
      (async () => {
        try {
          const fetched=await getMe(userId);
          setUser(fetched);
          setUserHeader(userId);
          localStorage.setItem("user",JSON.stringify(fetched));
        } catch(err){
          console.error("Could not fetch user:", err);
        }
      })();
    }
    const onDoc=(e)=>{
      if(ref.current && !ref.current.contains(e.target)) 
        setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return() =>document.removeEventListener("click",onDoc);
  },[]);

  const handleLogout=()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    setUserHeader(null);
    setUser(null);
    navigate("/login");
  };
const handleProfile=()=>{
    setOpen(false);
    navigate("/profile"); 
  };

  return (
    <div ref={ref} className="position-relative">
      <button className="btn btn-outline-light d-flex align-items-center gap-2" onClick={() => setOpen(o => !o)} style={{ background: "transparent", border: "none", color: "#072141ff" }}>
        {user?.avatar ? (
          <img src={user.avatar} alt="avatar" style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
        ) : (
          <FaUserCircle size={28} />
        )}
        <span className="d-none d-md-inline">{user?.name || "User"}</span>
      </button>

      {open && (
        <div style={{ position: "absolute", right: 0, top: "calc(100% + 6px)", zIndex: 999 }} className="card shadow-sm">
          <div className="card-body" style={{ minWidth: 180 }}>
            <div className="d-flex gap-2 align-items-center mb-2">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" style={{ width: 46, height: 46, borderRadius: "50%", objectFit: "cover" }} />
              ) : (
                <FaUserCircle size={46} />
              )}
              <div>
                <div className="fw-bold">{user?.name}</div>
                <div className="text-muted" style={{ fontSize: 12 }}>{user?.email}</div>
              </div>
            </div>
            <hr />
            <button className="btn btn-sm btn-outline-primary w-100 mb-2" onClick={handleProfile}>View Profile</button>
            <button className="btn btn-sm btn-outline-danger w-100" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserProfile
