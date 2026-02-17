import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Settings.css";
import { useTranslation } from "react-i18next";
const ManualQueue = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();   
    return (
    <div className="dashboard">
            <div className="dashboard-content">
                <div className="dashboard-main">
                    <div>
                        <h1>Coming soon</h1>
                    </div>
                </div>
            </div>
        </div>
  );
};

export default ManualQueue;