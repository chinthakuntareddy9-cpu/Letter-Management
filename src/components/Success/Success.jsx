import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Success.css";
const Success = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(3);
  return (
    <div className="new-letter">
    <div className="new-letter-header">
        <h1>Send new letter</h1>
         <div class="stepper">
        <div class="line"></div>
        <div className="step-indicator">
          <div className="step active">1</div>
          <div className="step active">2</div>
          <div className={`step ${currentStep >= 3 ? "active" : ""}`}>3</div>
        </div>
        </div>
      </div>
    <div className="new-letter-content">
    <div className="success-container">
      <h1>Success!</h1>
      <p>Your letter has been sent successfully.</p>
      <button className="btn-previous" onClick={() => navigate("/")}>Goto My letters</button>
    </div>
    </div>
    </div>
  );
};

export default Success;