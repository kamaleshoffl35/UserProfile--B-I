import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import ExportButtons from "../components/ExportButtons";
import { TbFileReport, TbReportSearch } from "react-icons/tb";
const Reports = () => {
  const handleExcel = () => alert("Export to Excel");
  const handlePdf = () => alert("Export to PDF");
  const handlePrint = () => alert("Print Report");

  return (
    <div className="container mt-4">
      <h2 className="mb-4 d-flex align-items-center fs-5"><span className="  me-2 d-flex align-items-center" style={{color:"#4d6f99ff"}}><TbFileReport size={24} /></span>{" "}<b >REPORTS</b></h2>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <NavLink to="sales" className={({ isActive }) =>`nav-link ${isActive || location.pathname === "/reports"? "bg-primary text-white" : "bg-light text-dark"}`}>Sales Report</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="purchase" className={({ isActive }) =>`nav-link ${isActive ? "bg-primary text-white" : "bg-light text-dark"}`}>Purchase Report</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="stock" className={({ isActive }) =>`nav-link ${isActive ? "bg-primary text-white" : "bg-light text-dark"}`}>Stock Report</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="gst" className={({ isActive }) =>`nav-link ${isActive ? "bg-primary text-white" : "bg-light text-dark"}`}>GST Report</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="profitloss" className={({ isActive }) =>`nav-link ${isActive ? "bg-primary text-white" : "bg-light text-dark"}`}>Profit/Loss Report</NavLink>
        </li>
      </ul>

      {/* Export Buttons at the top-left */}
      <ExportButtons
        onExcel={handleExcel}
        onPdf={handlePdf}
        onPrint={handlePrint}
      />

      {/* Render selected report */}
      <Outlet />
    </div>
  );
};
export default Reports;