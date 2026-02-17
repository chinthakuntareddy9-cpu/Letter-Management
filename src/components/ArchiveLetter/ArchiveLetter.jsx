import React, { useState } from "react";
import {
  useNavigate,
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./ArchiveLetter.css";
import { useTranslation } from "react-i18next";
import filePickerImg from "../../assets/archives.png";

function ArchiveLetter() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const handleBulkLetter = () => {
    navigate("/new-letter");
  };

  const handleSingleLetter = () => {
    navigate("/new-letter");
  };

  const handleCancel = () => {
    navigate("/new-letter");
  };

  return (
    <div className="letter-shell-container">
      <div className="letter-title-area">
        <div className="letter-title">Send new letter</div>
        <div class="stepper">
          <div class="line"></div>
          <div class="steps">
            <div class="step active">1</div>
            <div class="step active">2</div>
            <div class="step active">3</div>
          </div>
        </div>
      </div>
      <div className="letter-main-area"></div>
      <div className="letter-main-area">
        <img src={filePickerImg} />
      </div>
      <div className="letter-options-area archive-buttons">
        <button className="btn-new-letter" onClick={handleBulkLetter}>
          <span className="letter-icon">
            <i class="fa-solid fa-angle-left"></i>
          </span>
          PREVIOUS
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <span className="letter-price">2.75€</span>
          <button className="btn-new-letter" onClick={handleSingleLetter}>
            <span className="letter-icon">
              <i class="fa-solid fa-paper-plane"></i>
            </span>
            SEND
          </button>
        </div>
      </div>
    </div>
  );
}
export default ArchiveLetter;
