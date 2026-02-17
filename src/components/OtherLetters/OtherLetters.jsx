import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OtherLetters.css";
import { useTranslation } from "react-i18next";

// Mock data for other letters
const mockLettersData = [
  {
    reference: "OTHER-2024-001",
    letterAddressee: "Alice Wilson",
    status: "Sent",
    recipient: {
      street: "456 Oak Street",
      houseNumber: "Apt 6",
      zipCode: "20001",
      city: "Washington DC",
      country: "USA"
    },
    returnAddress: {
      firstName: "Tom",
      lastName: "Brown",
      company: "Green Solutions",
      street: "789 Commerce Ave",
      houseNumber: "Suite 50",
      zipCode: "20002",
      city: "Washington DC"
    },
    mailOptions: {
      type: "Standard",
      language: "English"
    },
    notifySubject: "Your Letter Has Been Sent",
    notifyRecipients: "alice@example.com"
  },
  {
    reference: "OTHER-2024-002",
    letterAddressee: "Dennis Martinez",
    status: "Outgoing",
    recipient: {
      street: "321 Pine Road",
      houseNumber: "House 8",
      zipCode: "33101",
      city: "Miami",
      country: "USA"
    },
    returnAddress: {
      firstName: "Sarah",
      lastName: "Garcia",
      company: "Coastal Services",
      street: "555 Beach Lane",
      houseNumber: "Bldg D",
      zipCode: "33102",
      city: "Miami"
    },
    mailOptions: {
      type: "Express",
      language: "English"
    },
    notifySubject: "Outgoing Letter Notification",
    notifyRecipients: "dennis@example.com"
  },
  {
    reference: "OTHER-2024-003",
    letterAddressee: "Patricia Lee",
    status: "Pending",
    recipient: {
      street: "789 Maple Drive",
      houseNumber: "Unit 3",
      zipCode: "02101",
      city: "Boston",
      country: "USA"
    },
    returnAddress: {
      firstName: "James",
      lastName: "Anderson",
      company: "Northeast Corp",
      street: "100 Business Park",
      houseNumber: "Floor 3",
      zipCode: "02102",
      city: "Boston"
    },
    mailOptions: {
      type: "Registered",
      language: "English"
    },
    notifySubject: "Document Processing",
    notifyRecipients: "patricia@example.com"
  },
  {
    reference: "OTHER-2024-004",
    letterAddressee: "Christopher White",
    status: "Failed",
    recipient: {
      street: "654 Birch Lane",
      houseNumber: "Apt 12",
      zipCode: "19101",
      city: "Philadelphia",
      country: "USA"
    },
    returnAddress: {
      firstName: "Michelle",
      lastName: "Johnson",
      company: "Liberty Solutions",
      street: "200 Independence Way",
      houseNumber: "Suite 400",
      zipCode: "19102",
      city: "Philadelphia"
    },
    mailOptions: {
      type: "Standard",
      language: "English"
    },
    notifySubject: "Delivery Failed - Retry Required",
    notifyRecipients: "christopher@example.com"
  },
  {
    reference: "OTHER-2024-005",
    letterAddressee: "Jessica Davis",
    status: "Sent",
    recipient: {
      street: "987 Spruce Street",
      houseNumber: "House 20",
      zipCode: "77001",
      city: "Houston",
      country: "USA"
    },
    returnAddress: {
      firstName: "Robert",
      lastName: "Martinez",
      company: "Texas Business Group",
      street: "400 Energy Drive",
      houseNumber: "Bldg E",
      zipCode: "77002",
      city: "Houston"
    },
    mailOptions: {
      type: "Express",
      language: "English"
    },
    notifySubject: "Letter Delivered Successfully",
    notifyRecipients: "jessica@example.com"
  },
  {
    reference: "OTHER-2024-006",
    letterAddressee: "Kevin Garcia",
    status: "Outgoing",
    recipient: {
      street: "123 Willow Avenue",
      houseNumber: "Apt 7",
      zipCode: "85001",
      city: "Phoenix",
      country: "USA"
    },
    returnAddress: {
      firstName: "Jennifer",
      lastName: "Rodriguez",
      company: "Southwest Enterprises",
      street: "300 Desert Way",
      houseNumber: "Suite 150",
      zipCode: "85002",
      city: "Phoenix"
    },
    mailOptions: {
      type: "Standard",
      language: "English"
    },
    notifySubject: "Outgoing Notification",
    notifyRecipients: "kevin@example.com"
  }
];

const OtherLetters = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [letters] = useState(mockLettersData);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: "reference", direction: "asc" });
  const [searchQuery, setSearchQuery] = useState("");

  // Handle letter selection
  const handleSelectLetter = (letter) => {
    setSelectedLetter(letter);
    setIsPanelOpen(true);
  };

  // Handle sort
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Filter letters by search
  const filteredLetters = letters.filter((letter) => {
    const query = searchQuery.toLowerCase();
    return (
      (letter.reference && letter.reference.toLowerCase().includes(query)) ||
      (letter.letterAddressee && letter.letterAddressee.toLowerCase().includes(query)) ||
      (letter.status && letter.status.toLowerCase().includes(query))
    );
  });

  // Sort letters
  const sortedLetters = [...filteredLetters].sort((a, b) => {
    const aValue = a[sortConfig.key] || "";
    const bValue = b[sortConfig.key] || "";

    if (sortConfig.direction === "asc") {
      return aValue < bValue ? -1 : 1;
    } else {
      return aValue > bValue ? -1 : 1;
    }
  });

  return (
    <div className="other-letters">
      <div className="page-header">
        <h1>Other Letters</h1>
        <p className="subtitle">View and manage other letters</p>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search by reference, addressee, or status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <span className="search-count">{sortedLetters.length} letters</span>
      </div>

      {sortedLetters.length === 0 ? (
        <div className="empty-state">
          <p>No letters found</p>
        </div>
      ) : (
        <div className="letters-table-container">
          <table className="letters-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("reference")} className="sortable">
                  Reference {sortConfig.key === "reference" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("letterAddressee")} className="sortable">
                  Addressee {sortConfig.key === "letterAddressee" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("status")} className="sortable">
                  Status {sortConfig.key === "status" && (sortConfig.direction === "asc" ? "↑" : "↓")}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedLetters.map((letter, index) => (
                <tr key={index} onClick={() => handleSelectLetter(letter)} className="clickable-row">
                  <td>{letter.reference || "-"}</td>
                  <td>{letter.letterAddressee || "-"}</td>
                  <td>
                    <span className={`status-badge status-${letter.status?.toLowerCase() || "pending"}`}>
                      {letter.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    <button className="btn-view" onClick={(e) => {
                      e.stopPropagation();
                      handleSelectLetter(letter);
                    }}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Panel */}
      {isPanelOpen && selectedLetter && (
        <div className="detail-panel-overlay" onClick={() => setIsPanelOpen(false)}>
          <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
            <div className="panel-header">
              <h2>Letter Details</h2>
              <button className="close-button" onClick={() => setIsPanelOpen(false)}>×</button>
            </div>

            <div className="panel-content">
              <div className="detail-section">
                <h3>Reference Information</h3>
                <div className="detail-row">
                  <span className="label">Reference:</span>
                  <span className="value">{selectedLetter.reference}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Status:</span>
                  <span className={`status-badge status-${selectedLetter.status?.toLowerCase()}`}>
                    {selectedLetter.status}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Recipient Information</h3>
                <div className="detail-row">
                  <span className="label">Addressee:</span>
                  <span className="value">{selectedLetter.letterAddressee}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Address:</span>
                  <span className="value">
                    {selectedLetter.recipient?.street} {selectedLetter.recipient?.houseNumber}
                    <br />
                    {selectedLetter.recipient?.zipCode} {selectedLetter.recipient?.city}
                    <br />
                    {selectedLetter.recipient?.country}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Return Address</h3>
                <div className="detail-row">
                  <span className="label">From:</span>
                  <span className="value">
                    {selectedLetter.returnAddress?.firstName} {selectedLetter.returnAddress?.lastName}
                    <br />
                    {selectedLetter.returnAddress?.company}
                    <br />
                    {selectedLetter.returnAddress?.street} {selectedLetter.returnAddress?.houseNumber}
                    <br />
                    {selectedLetter.returnAddress?.zipCode} {selectedLetter.returnAddress?.city}
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h3>Mail Options</h3>
                <div className="detail-row">
                  <span className="label">Mail Type:</span>
                  <span className="value">{selectedLetter.mailOptions?.type || "-"}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Language:</span>
                  <span className="value">{selectedLetter.mailOptions?.language || "-"}</span>
                </div>
              </div>

              {selectedLetter.notifySubject && (
                <div className="detail-section">
                  <h3>Notification</h3>
                  <div className="detail-row">
                    <span className="label">Subject:</span>
                    <span className="value">{selectedLetter.notifySubject}</span>
                  </div>
                  <div className="detail-row">
                    <span className="label">Recipients:</span>
                    <span className="value">{selectedLetter.notifyRecipients}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="panel-footer">
              <button className="btn-close" onClick={() => setIsPanelOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherLetters;
