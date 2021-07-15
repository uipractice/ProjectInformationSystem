import React from "react";
import "./RowHeaderValue.css";
function RowHeaderValue({ count, projectStatus, className, iconImg }) {
  return (
    <div className="head-card">
      <div className="card card-hover-shadow card_tile">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <div className={className}>{count}</div>
              <div className="count_text">{projectStatus}</div>
            </div>
            <div className="col-md-4 card_icon">
              <img src={iconImg} alt="Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RowHeaderValue;
