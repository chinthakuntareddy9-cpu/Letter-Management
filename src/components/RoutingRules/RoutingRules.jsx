import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RoutingRules.css";
import { useTranslation } from "react-i18next";

// Mock data for outgoing letters
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
const RoutingRules = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [letters] = useState(mockLettersData);
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: "reference", direction: "asc" });
    const [searchQuery, setSearchQuery] = useState("");
    const [showGroup, setShowGroup] = useState(false);

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
        <div className="dashboard">
            <div className="dashboard-content">
                <div className="dashboard-main">
                    {/* <div className="page-header">
        <h1>Admin - Outgoing Letters</h1>
        <p className="subtitle">Manage and monitor outgoing letters</p>
      </div> */}

                    <div className="dashboard-toolbar">
                        
                           <button type="button" class="btn-previous">
                            <span class="letter-icon"><i class="fa-solid fa-edit"></i></span>
                            Edit
                            </button>
                        
                        <div className="search-wrapper">
                            <span className="search-icon">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <input
                                className="search-input"
                                placeholder="Search sender"
                                title="Search sender"
                                aria-label="Search keywords and file names"
                                type="text"
                                value=""
                            />
                        </div>

                       <div className="search-wrapper">
                            <span className="search-icon">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <input
                                className="search-input"
                                placeholder="Search keywords"
                                title="Search keywords"
                                aria-label="Search keywords and file names"
                                type="text"
                                value=""
                            />
                        </div>
                        <div className="select-wrapper">
                            <select className="select-status" aria-label="Status">
                                <option value="">Routing target</option>
                                <option value="inProgress">In progress</option>
                                <option value="returned">Returned</option>
                                <option value="failed">Failed</option>
                                <option value="success">Success</option>
                            </select>
                        </div>
                        
                        
                        <button
                            className="btn-menu"
                            title="dashboard.buttons.openPanel"
                            aria-label="dashboard.buttons.openPanel"
                        >
                            <span className="menu-icon">
                                <i className="fa-solid fa-bars"></i>
                            </span>
                        </button>
                    </div>

                    <div className="dashboard-table-wrapper">
                        <table className="dashboard-table">
                            <thead>
                                <tr>
                                    
                                    <th>
                                        <div className="th-content">
                                            Priority<span className="sort-icon">
                                                <i className="fa-solid fa-sort"></i>
                                            </span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="th-content">
                                            Sender<span className="sort-icon">
                                                <i className="fa-solid fa-sort"></i>
                                            </span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="th-content">
                                            Keywords<span className="sort-icon">
                                                <i className="fa-solid fa-sort"></i>
                                            </span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="th-content">
                                            Routing target<span className="sort-icon">
                                                <i className="fa-solid fa-sort"></i>
                                            </span>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="row-light ">
                                    
                                    <td className="filename-cell">1</td>
                                    <td>Maarten Janssens</td>
                                    <td>Empty</td>
                                    <td className="tags-cell">
                                       Stefan Goethaert (1A53)
                                    </td>
                                </tr>
                                <tr className="row-dark ">
                                   
                                    <td className="filename-cell">2</td>
                                    <td>Pieter De Wilde</td>
                                    <td>levering, promotie, contract</td>
                                    <td className="tags-cell">
                                       ComGrp Aankoop Dranken
                                    </td>
                                </tr>
                                <tr className="row-light ">
                                    
                                    <td className="filename-cell">3</td>
                                    <td>Pieter De Wilde</td>
                                    <td>prijsaanpassing, factuur, voeding</td>
                                    <td className="tags-cell">
                                       ComGrp Aankoop Voeding
                                    </td>
                                </tr>
                                <tr 
                                    className="group-row row-dark" 
                                    onClick={() => setShowGroup(!showGroup)}
                                    >
                                    <td colSpan="4">
                                        <div className="group-header">
                                        <i className={`fa-solid ${showGroup ? "fa-chevron-down" : "fa-chevron-right"}`}></i>
                                        <span>Offertes Enseignes</span>
                                        <span className="group-badge">1052.47 Fill x 44</span>
                                        </div>
                                    </td>
                                    </tr>
                                    {showGroup && (
                                        <>
                                            <tr className="row-light">
                                            <td>4</td>
                                            <td>Dreamland</td>
                                            <td>Offerte</td>
                                            <td>ComGrp Financial info Colruyt Group</td>
                                            </tr>

                                            <tr className="row-dark">
                                            <td>5</td>
                                            <td>Spar</td>
                                            <td>Offerte</td>
                                            <td>ComGrp Financial info Colruyt Group</td>
                                            </tr>
                                        </>
                                        )}
                            </tbody>
                        </table>
                        <div className="table-pagination">
                            <button className="page-icon-btn" disabled="" aria-label="dashboard.buttons.firstPage">
                                <i className="fa-solid fa-backward"></i>
                            </button>
                            <button className="page-icon-btn" disabled="" aria-label="dashboard.buttons.prevPage">
                                <i className="fa-solid fa-caret-left"></i>
                            </button>
                            <span className="page-pill active" aria-current="page">1</span>
                            <span className="page-pill muted">2</span>
                            <span className="page-pill muted">3</span>
                            <button className="page-icon-btn" aria-label="dashboard.buttons.nextPage">
                                <i className="fa-solid fa-caret-right"></i>
                            </button>
                            <button className="page-icon-btn" aria-label="dashboard.buttons.lastPage">
                                <i className="fa-solid fa-forward"></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default RoutingRules;
