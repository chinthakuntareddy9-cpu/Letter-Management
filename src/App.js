import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import { SideNav, TopNav } from "./shared";
import Dashboard from "./components/Dashboard";
import NewLetter from "./components/NewLetter";
import BulkLetter from "./components/BulkLetter";
import Success from "./components/Success/Success";
import { useTranslation } from "react-i18next"; // <-- use this
import LetterShell from "./components/LetterShell/LetterShell";
import ArchiveLetter from "./components/ArchiveLetter/ArchiveLetter";
import AdminOutgoing from "./components/AdminOutgoing/AdminOutgoing";
import AdminIncoming from "./components/AdminIncoming/AdminIncoming";
import ManualQueue from "./components/ManualQueue/ManualQueue"; 
import Settings from "./components/Settings/Settings";
import RoutingRules from "./components/RoutingRules/RoutingRules";

function AppContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const sideNavigationItems = [
    {
      label: t("sidebar.myLetters"),
      onClick: () => navigate("/"),
    },
    {
      label: t("sidebar.otherLetters"),
      onClick: (item) => navigate("/other-letters"),
    },
    {
      label: t("sidebar.admin"),
      onClick: (item) => console.log("Navigating to:", item.label),
      children: [
        {
          label: t("sidebar.outgoing"),
          onClick: (item) => navigate("/admin-outgoing"),
        },
        {
          label: t("sidebar.incoming"),
          onClick: (item) => navigate("/admin-incoming"),
        },
        {
          label: t("sidebar.routingRules"),
          onClick: (item) => navigate("/routing-rules"),
        },
        {
          label: t("sidebar.manualQueues"),
          badge: "2",
          onClick: (item) => navigate("/manual-queue"),
        },
      ],
    },
    {
      label: t("sidebar.settings"),
      onClick: (item) => navigate("/settings"),
    },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="App">
      <TopNav
        title={t("title")} // <-- title from translations.json
        logoColor="#A63446"
        onHelpClick={() => console.log("Help clicked")}
        onMenuClick={toggleMobileMenu}
        height="60px"
      />

      <SideNav
        items={sideNavigationItems}
        width="280px"
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
      />

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu} />
      )}

      <div
        className="main-content"
        style={{ marginLeft: "280px", marginTop: "50px" }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/other-letters" element={<Dashboard />} />
          <Route path="/new-letter" element={<NewLetter />} />
          <Route path="/bulk-letter" element={<BulkLetter />} />
          <Route path="/letter-shell" element={<LetterShell />} />
          <Route path="/success" element={<Success />} />
          <Route path="/letter-archive" element={<ArchiveLetter />} />
          <Route path="/admin-outgoing" element={<AdminOutgoing />} />
          <Route path="/admin-incoming" element={<AdminIncoming />} />
          <Route path="/routing-rules" element={<RoutingRules />} />
          <Route path="/manual-queue" element={<ManualQueue />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
export default App;
