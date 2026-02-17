import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminIncoming.css";
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
const AdminIncoming = () => {
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
        <div className="dashboard">
            <div className="dashboard-content">
                <div className="dashboard-main">
                    {/* <div className="page-header">
        <h1>Admin - Outgoing Letters</h1>
        <p className="subtitle">Manage and monitor outgoing letters</p>
      </div> */}

                    <div className="dashboard-toolbar">
                        <div className="search-wrapper">
                            <span className="search-icon">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </span>
                            <input
                                className="search-input"
                                placeholder="Search sender, keywords, etc."
                                title="Search sender, keywords, etc."
                                aria-label="Search keywords and file names"
                                type="text"
                                value=""
                            />
                        </div>

                        <div className="select-wrapper">
                            <select className="select-status" aria-label="Status">
                                <option value="">Status</option>
                                <option value="inProgress">In progress</option>
                                <option value="returned">Returned</option>
                                <option value="failed">Failed</option>
                                <option value="success">Success</option>
                            </select>
                        </div>
                        <div className="date-filter-wrapper">
                            <select className="select-before" aria-label="Routed to">
                                <option value="">Routed to</option>
                                <option value="before">Before</option>
                                <option value="after">After</option>
                            </select>
                        </div>
                        <div className="month-filter">
                            <button type="button" className="month-arrow">
                                <i className="fa-solid fa-chevron-left"></i>
                            </button>
                            <div className="date-filter-wrapper">

                                <input
                                    className="date-input"
                                    placeholder="DD/MM/YYYY"
                                    aria-label="DD/MM/YYYY"
                                    type="text"
                                    value=""
                                />

                            </div>
                            <button type="button" className="month-arrow">
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
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
                                            Routed<span className="sort-icon">
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
                                            Routed to<span className="sort-icon">
                                                <i className="fa-solid fa-sort"></i>
                                            </span>
                                        </div>
                                    </th>
                                    <th>
                                        <div className="th-content">
                                            Date received<span className="sort-icon">
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
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="row-light ">
                                    <td className="status-cell" title="Returned">
                                        Queue
                                    </td>
                                    <td className="filename-cell">Politie Brussel</td>
                                    <td>Pieter De Wilde</td>
                                    <td>07/03/2025 08:15</td>
                                    <td className="tags-cell">
                                        <div className="tag-group">
                                            <span className="tag-dark-part">Date</span>
                                            <span className="tag-light-part">06/03</span>
                                        </div>
                                        <span className="tag">06/03</span>
                                        <span className="tag">boete</span>
                                        <span className="tag">2-FSE-067</span>
                                        <span className="tag">wagen</span>
                                    </td>
                                </tr>
                                <tr className="row-dark ">
                                    <td className="status-cell" title="Returned">
                                        Queue
                                    </td>
                                    <td className="filename-cell">Politie Brussel</td>
                                    <td>Pieter De Wilde</td>
                                    <td>07/03/2025 08:15</td>
                                    <td className="tags-cell">
                                        <div className="tag-group">
                                            <span className="tag-dark-part">Date</span>
                                            <span className="tag-light-part">06/03</span>
                                        </div>
                                        <span className="tag">06/03</span>
                                        <span className="tag">boete</span>
                                        <span className="tag">2-FSE-067</span>
                                        <span className="tag">wagen</span>
                                    </td>
                                </tr>
                                <tr className="row-light ">
                                    <td className="status-cell" title="Returned">
                                        Queue
                                    </td>
                                    <td className="filename-cell">Politie Brussel</td>
                                    <td>Pieter De Wilde</td>
                                    <td>07/03/2025 08:15</td>
                                    <td className="tags-cell">
                                        <div className="tag-group">
                                            <span className="tag-dark-part">Date</span>
                                            <span className="tag-light-part">06/03</span>
                                        </div>
                                        <span className="tag">06/03</span>
                                        <span className="tag">boete</span>
                                        <span className="tag">2-FSE-067</span>
                                        <span className="tag">wagen</span>
                                    </td>
                                </tr>
                                <tr className="row-dark ">
                                    <td className="status-cell" title="Returned">
                                        Queue
                                    </td>
                                    <td className="filename-cell">Politie Brussel</td>
                                    <td>Pieter De Wilde</td>
                                    <td>07/03/2025 08:15</td>
                                    <td className="tags-cell">
                                        <div className="tag-group">
                                            <span className="tag-dark-part">Date</span>
                                            <span className="tag-light-part">06/03</span>
                                        </div>
                                        <span className="tag">06/03</span>
                                        <span className="tag">boete</span>
                                        <span className="tag">2-FSE-067</span>
                                        <span className="tag">wagen</span>
                                    </td>
                                </tr>
                                <tr className="row-light ">
                                    <td className="status-cell" title="Returned">
                                        Queue
                                    </td>
                                    <td className="filename-cell">Politie Brussel</td>
                                    <td>Pieter De Wilde</td>
                                    <td>07/03/2025 08:15</td>
                                    <td className="tags-cell">
                                        <div className="tag-group">
                                            <span className="tag-dark-part">Date</span>
                                            <span className="tag-light-part">06/03</span>
                                        </div>
                                        <span className="tag">06/03</span>
                                        <span className="tag">boete</span>
                                        <span className="tag">2-FSE-067</span>
                                        <span className="tag">wagen</span>
                                    </td>
                                </tr>
                                <tr className="row-dark ">
                                    <td className="status-cell" title="Returned">
                                        Queue
                                    </td>
                                    <td className="filename-cell">Politie Brussel</td>
                                    <td>Pieter De Wilde</td>
                                    <td>07/03/2025 08:15</td>
                                    <td className="tags-cell">
                                        <div className="tag-group">
                                            <span className="tag-dark-part">Date</span>
                                            <span className="tag-light-part">06/03</span>
                                        </div>
                                        <span className="tag">06/03</span>
                                        <span className="tag">boete</span>
                                        <span className="tag">2-FSE-067</span>
                                        <span className="tag">wagen</span>
                                    </td>
                                </tr>
                                <tr className="row-light ">
                                    <td className="status-cell" title="Returned">
                                        Queue
                                    </td>
                                    <td className="filename-cell">Politie Brussel</td>
                                    <td>Pieter De Wilde</td>
                                    <td>07/03/2025 08:15</td>
                                    <td className="tags-cell">
                                        <div className="tag-group">
                                            <span className="tag-dark-part">Date</span>
                                            <span className="tag-light-part">06/03</span>
                                        </div>
                                        <span className="tag">06/03</span>
                                        <span className="tag">boete</span>
                                        <span className="tag">2-FSE-067</span>
                                        <span className="tag">wagen</span>
                                    </td>
                                </tr>
                                <tr className="row-dark ">
                                    <td className="status-cell" title="Returned">
                                        Queue
                                    </td>
                                    <td className="filename-cell">Politie Brussel</td>
                                    <td>Pieter De Wilde</td>
                                    <td>07/03/2025 08:15</td>
                                    <td className="tags-cell">
                                        <div className="tag-group">
                                            <span className="tag-dark-part">Date</span>
                                            <span className="tag-light-part">06/03</span>
                                        </div>
                                        <span className="tag">06/03</span>
                                        <span className="tag">boete</span>
                                        <span className="tag">2-FSE-067</span>
                                        <span className="tag">wagen</span>
                                    </td>
                                </tr>
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

export default AdminIncoming;
