import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/Logo.png"
import { AiOutlineDashboard } from "react-icons/ai";
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdOutlineCategory } from "react-icons/md";
import { LiaWeightSolid } from "react-icons/lia";
import { MdOutlineAttachMoney } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { MdOutlineWarehouse } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { TbFileInvoice } from "react-icons/tb";
import { MdAttachMoney } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { PiShippingContainer } from "react-icons/pi";
import { TbReportSearch } from "react-icons/tb";

export default function Dashboard() {
  const modules = [
    { name: "Dashboard", path: "/", icon:<AiOutlineDashboard /> },
    { name: "Products", path: "/products",icon:<MdProductionQuantityLimits/> },
    { name: "Categories", path: "/categories",icon:<MdOutlineCategory/> },
    { name: "Units", path: "/units",icon:<LiaWeightSolid/> },
    { name: "Tax Rates", path: "/taxes",icon:<MdOutlineAttachMoney/> },
    { name: "Customers", path: "/customers",icon:<IoIosContact/> },
    { name: "Suppliers", path: "/suppliers",icon:<IoIosContact/> },
    { name: "Warehouses", path: "/warehouses",icon:<MdOutlineWarehouse/> },
    { name: "Purchases", path: "/purchases",icon:<BiPurchaseTag/> },
    { name: "Sales", path: "/sales",icon:<TbFileInvoice/> },
    { name: "Customer Receipts", path: "/cus_receipts",icon:<MdAttachMoney/> },
    { name: "Supplier Payments", path: "/sub_receipts",icon:<GiTakeMyMoney/> },
    { name: "Stock Adjustments", path: "/stocks",icon:<PiShippingContainer/> },
    { name: "Reports", path: "/reports",icon:<TbReportSearch/> },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="d-flex flex-column vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-white shadow">
        <div className="container-fluid">
          <button className="btn btn-outline-light me-3 d-lg-none text-success" onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <a className="navbar-brand d-flex align-items-center gap-3"  href="#">
            <img src={logo} alt="Logo" className="me-2" style={{ height: "50px" }}/>
            <span className="text-black">Billing & Inventory</span>
          </a>
          <button className="btn btn-outline-light btn-sm ms-auto text-danger bg-warning"> Login / Logout</button>
        </div>
      </nav>
      <div className="d-flex flex-grow-1">
      <div className={`bg-light border-end p-3 ${sidebarOpen ? "d-block" : "d-none d-lg-block" }`}style={{ width: "240px", background: "linear-gradient(180deg, #1e293b, #0f172a)", color: "white" }}>
          
          <div className="list-group list-group-flush ">
            {modules.map((m) => (<NavLink key={m.path} to={m.path} end className={({ isActive }) => `list-group-item list-group-item-action d-flex align-items-center gap-3   ${ isActive ? " bg-primary text-white fw-semibold rounded":"bg-transparent text-light" } `} >
                <span className="fs-5">{m.icon}</span>
                <span>{m.name}</span>
            </NavLink>
            ))}
          </div>
        </div>
        <div className="flex-grow-1 p-4 bg-light overflow-auto">
          <div className="bg-white border rounded shadow-sm p-4 h-100">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
