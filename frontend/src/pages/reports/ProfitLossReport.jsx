import React from "react";

const ProfitLossReport = () => {
  return (
    <div>
      <h5>Profit/Loss Report Filters</h5>
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="form-label">From Date</label>
          <input type="date" className="form-control bg-light"/>
        </div>
        <div className="col-md-6">
          <label className="form-label">To Date</label>
          <input type="date" className="form-control bg-light"/>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossReport;