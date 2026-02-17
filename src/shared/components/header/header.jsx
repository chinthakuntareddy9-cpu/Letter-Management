import React from "react";
import "./header.css";
import Logo from "../../../assets/logo.svg";

const CGheader = () => {
  return (
    <header className="site-header" role="banner">
      <div className="left-content" aria-hidden="true">
        <img src={Logo} alt="Company Logo" />
        <div className="vertical-line"></div>
        <span>Letter management</span>
      </div>
      <div className="right-content" aria-hidden="true">
        <div className="help-button">
          <a>
            <i className="fa-solid fa-circle-question"></i>
          </a>
        </div>
        <div></div>
        <div className="user-profile">
          <i className="fa-solid fa-user"></i>Bhuma Vikram Kumar Reddy
          <i className="fa-solid fa-angle-down"></i>
          <div className="logout-dropdown">
            <a>Logout</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CGheader;
