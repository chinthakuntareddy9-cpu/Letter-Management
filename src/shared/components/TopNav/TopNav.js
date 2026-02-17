import React from "react";
import "./TopNav.css";
import { useTranslation } from "react-i18next";
import { setLanguage } from "../../../i18n";
import Logo from "../../../assets/logo.svg";
import LanguageSelector from "../language-selector/LanguageSelector";

const TopNav = ({
  logoColor = "#A63446",
  onHelpClick,
  onMenuClick,
  height = "60px",
}) => {
  const { t, i18n } = useTranslation();
  return (
    <header className="top-nav" style={{ height }}>
      <div className="top-nav-left">
        <img src={Logo} alt="Company Logo" />
        <div className="vertical-line"></div>
        <span>{t("title")}</span>
      </div>

      <div className="top-nav-right">
        <div className="help-button">
          <a>
            <i className="fa-solid fa-circle-question"></i>
          </a>
        </div>
        <LanguageSelector></LanguageSelector>
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

export default TopNav;
