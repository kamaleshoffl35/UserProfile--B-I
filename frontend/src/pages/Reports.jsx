import React from "react";
import { NavLink, Outlet } from "react-router-dom";
// import ExportButtons from "./components/ExportButtons";
import { TbReportSearch } from "react-icons/tb";
const Reports = () => {
  const handleExcel = () => alert("Export to Excel");
  const handlePdf = () => alert("Export to PDF");
  const handlePrint = () => alert("Print Report");

  return (
    <div className="container mt-4">
      <h3 className="mb-4"><span className="text-success"><TbReportSearch /></span>  <b>REPORTS</b></h3>
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <NavLink to="sales" className="nav-link text-warning">Sales Report</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="purchase" className="nav-link">Purchase Report</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="stock" className="nav-link">Stock Report</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="gst" className="nav-link">GST Report</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="profit-loss" className="nav-link">Profit/Loss Report</NavLink>
        </li>
      </ul>

      {/* Export Buttons at the top-left */}
      {/* <ExportButtons
        onExcel={handleExcel}
        onPdf={handlePdf}
        onPrint={handlePrint}
      /> */}

      {/* Render selected report */}
      <Outlet />
    </div>
  );
};
export default Reports;