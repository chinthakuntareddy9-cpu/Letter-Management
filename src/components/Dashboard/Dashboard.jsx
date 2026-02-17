// src/components/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from "react";
import {
  useNavigate,
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import "./Dashboard.css";
import { dashboardData } from "../../constant/Dashboard.constant";
import { useTranslation } from "react-i18next";

const STATUS_CODES = Object.freeze({
  IN_PROGRESS: "inProgress",
  RETURNED: "returned",
  FAILED: "failed",
  SUCCESS: "success",
});

const Dashboard = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  // Hide element only on /new-letter
  const showElement = pathname === "/other-letters";
  const AdminOutGoing = pathname === "/admin-outgoing";

  // Map English source statuses to stable codes (if your data uses strings)
  const normalizeStatus = (status) => {
    switch (status) {
      case "In progress":
      case STATUS_CODES.IN_PROGRESS:
        return STATUS_CODES.IN_PROGRESS;
      case "Returned":
      case STATUS_CODES.RETURNED:
        return STATUS_CODES.RETURNED;
      case "Failed":
      case STATUS_CODES.FAILED:
        return STATUS_CODES.FAILED;
      case "Success":
      case STATUS_CODES.SUCCESS:
        return STATUS_CODES.SUCCESS;
      default:
        return status;
    }
  };

  const [data] = useState(
    dashboardData.map((row) => ({
      ...row,
      currentStatus: normalizeStatus(row.currentStatus),
    }))
  );
  const [selectedRow, setSelectedRow] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [beforeOption, setBeforeOption] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Fetch data from API
  // TEMPORARILY DISABLED - Using mock data from Dashboard.constant instead
  // Uncomment when authentication token is available
  /*
  useEffect(() => {
    const fetchLetters = async () => {
      try {
        setLoading(true);
        setApiError(null);
        const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6InNNMV95QXhWOEdWNHlOLUI2ajJ4em1pazVBbyJ9.eyJhdWQiOiI3N2JmMDZkMi0zNjNhLTQwZDEtYjExMy02M2Q0NGZhM2IzZjYiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vMjhmODEzNGQtMmIwYi00Yzk3LTk5NzctN2Q0NmZiNjExYTBhL3YyLjAiLCJpYXQiOjE3NzEzMDQ5MjMsIm5iZiI6MTc3MTMwNDkyMywiZXhwIjoxNzcxMzA4ODIzLCJlbWFpbCI6InN0ZXZlbi52YW5ob29mQHRlc3QuY29scnV5dGdyb3VwLmNvbSIsIm5hbWUiOiJTdGV2ZW4gVmFuaG9vZiIsIm9pZCI6ImNmMDNkM2U0LWJlNzItNDIzNy05YzgyLTgxNDcxZWM3MmYyMiIsInByZWZlcnJlZF91c2VybmFtZSI6InN0ZXZlbi52YW5ob29mQHRlc3QuY29scnV5dGdyb3VwLmNvbSIsInJoIjoiMS5BWGtBVFJQNEtBc3JsMHlaZDMxRy0yRWFDdElHdjNjNk50RkFzUk5qMUUtanNfWUFBQ0o1QUEuIiwic2lkIjoiMDAyMTI0N2EtYjYzMy1jN2FkLTgyMmYtNTViZTAxNzEzYjlmIiwic3ViIjoiN3k3bnA0YjlqbkV5aVlLWWM1RzJUTExDbXJuX2Mtd3JUMEs2U1BSdjNJcyIsInRpZCI6IjI4ZjgxMzRkLTJiMGItNGM5Ny05OTc3LTdkNDZmYjYxMWEwYSIsInV0aSI6IlBKWmF1aHJiUjBhRm04RF9zZU5CQUEiLCJ2ZXIiOiIyLjAifQ.YNVVgW_02_Jlrfoam0yXmMi8IpXow5hBV4G-es6WEmjz7U9Dn7n-I-7qz8CMnyjxpEg-LETpRfv2Rk270hWQ0hbqs8tXSKars2J0okdT4LF05LF_umfqym_OWpDQFHOZFUzeo1iRDJDfsioMzXZmIApyrgx3DSCQfvx5dA4Ht_z--O0qPAmkYLI2AEF8fyC43CIFTz7PO5vEydz0dlcC6JOI3nXbIcSuacWASA3NHjyzMTGfv1yuVtYExISQJVhdE1Pk2_PeWfk9_d83JrrN9xINgDiK-zvbnKKA1isH2GwQNuPjuuB00TrdgWelaU396H_ml1psGwgYHS7MEX5ymA";
        const response = await axios.get(
          "https://letters-test-hfaffqhaa0crfjgj.westeurope-01.azurewebsites.net/Letters",
          {
            params: {
              orderBy: "LetterAddressee",
              pageNumber: 1
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          }
        );
        
        console.log("API Response:", response.data);
        
        // Transform API data to match your table structure if needed
        // This depends on your API response format
        
      } catch (error) {
        console.error("Error fetching letters:", error);
        setApiError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLetters();
  }, []);
  */

  // Set loading to false to display mock data
  useEffect(() => {
    setLoading(false);
    setApiError(null);
  }, []);

  // Display loading state
  // COMMENTED OUT - Using mock data instead
  /*
  if (loading) {
    return (
      <div className="dashboard">
        <div style={{ padding: "20px", textAlign: "center" }}>
          <p>Loading letters...</p>
        </div>
      </div>
    );
  }

  // Display error state
  if (apiError) {
    return (
      <div className="dashboard">
        <div style={{ padding: "20px", color: "red" }}>
          <p>Error loading data: {apiError}</p>
        </div>
      </div>
    );
  }
  */

  const tStatus = (code) => {
    switch (code) {
      case STATUS_CODES.IN_PROGRESS:
        return t("letterOverview.dataTable.inProgress");
      case STATUS_CODES.RETURNED:
        return t("letterOverview.dataTable.returned");
      case STATUS_CODES.FAILED:
        return t("letterOverview.dataTable.failed");
      case STATUS_CODES.SUCCESS:
        return t("letterOverview.dataTable.success");
      default:
        return code;
    }
  };

  const getStatusIcon = (statusCode) => {
    switch (statusCode) {
      case STATUS_CODES.RETURNED:
        return (
          <span
            title={t("letterOverview.dataTable.returned")}
            className="status-icon processing"
          >
            <i className="fa-solid fa-arrows-rotate"></i>
          </span>
        );
      case STATUS_CODES.FAILED:
        return (
          <span
            title={t("letterOverview.dataTable.failed")}
            className="status-icon error"
          >
            <i className="fa-solid fa-exclamation"></i>
          </span>
        );
      case STATUS_CODES.SUCCESS:
        return (
          <span
            title={t("letterOverview.dataTable.success")}
            className="status-icon success"
          >
            <i className="fa-solid fa-check"></i>
          </span>
        );
      case STATUS_CODES.IN_PROGRESS:
        return (
          <span
            title={t("letterOverview.dataTable.inProgress")}
            className="status-icon in-progress"
          >
            <i className="fa-solid fa-arrows-rotate"></i>
          </span>
        );
      default:
        return null;
    }
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const parseDate = (dateStr) => {
    // Expecting "DD/MM/YYYY" or "DD/MM/YYYY HH:mm"
    const [datePart, timePart = "00:00"] = String(dateStr).split(" ");
    const [day, month, year] = datePart.split("/");
    return new Date(`${year}-${month}-${day} ${timePart}`);
  };

  const getFilteredData = () => {
    let filteredData = [...data];

    // Search in file name and keywords
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredData = filteredData.filter((row) => {
        const fileNameMatch = (row.fileName || "")
          .toLowerCase()
          .includes(query);
        const keywordsMatch = Array.isArray(row.keywords)
          ? row.keywords.some((keyword) =>
              (keyword || "").toLowerCase().includes(query)
            )
          : false;
        return fileNameMatch || keywordsMatch;
      });
    }

    // Filter by status (code)
    if (selectedStatus) {
      filteredData = filteredData.filter(
        (row) => row.currentStatus === selectedStatus
      );
    }

    // Filter by date
    if (dateFilter.trim() && beforeOption) {
      filteredData = filteredData.filter((row) => {
        const rowDate = parseDate(row.dateSent);
        const filterDate = parseDate(dateFilter);

        if (beforeOption === "before") return rowDate <= filterDate;
        if (beforeOption === "after") return rowDate >= filterDate;
        return true;
      });
    }

    return filteredData;
  };

  const getSortedData = () => {
    const sortedData = getFilteredData();

    if (sortConfig.key) {
      sortedData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === "dateSent") {
          aValue = parseDate(aValue);
          bValue = parseDate(bValue);
        }

        if (sortConfig.key === "currentStatus") {
          const order = {
            [STATUS_CODES.IN_PROGRESS]: 0,
            [STATUS_CODES.RETURNED]: 1,
            [STATUS_CODES.FAILED]: 2,
            [STATUS_CODES.SUCCESS]: 3,
          };
          aValue = order[aValue] ?? 99;
          bValue = order[bValue] ?? 99;
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return sortedData;
  };

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return (
        <span className="sort-icon">
          <i className="fa-solid fa-sort"></i>
        </span>
      );
    }
    return sortConfig.direction === "asc" ? (
      <span className="sort-icon active">
        <i className="fa-solid fa-sort-up"></i>
      </span>
    ) : (
      <span className="sort-icon active">
        <i className="fa-solid fa-sort-down"></i>
      </span>
    );
  };

  const handleNewLetter = () => {
    navigate("/letter-shell");
  };

  const handleMenuClick = () => {
    if (isPanelOpen) {
      setIsPanelOpen(false);
      setSelectedRow(null);
    } else {
      setIsPanelOpen(true);
    }
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
    setIsPanelOpen(true);
  };

  const handleCloseDetail = () => {
    setSelectedRow(null);
    setIsPanelOpen(false);
  };

  const sortedData = getSortedData();

  return (
    <div className="dashboard">
      <div className={`dashboard-content ${isPanelOpen ? "with-detail" : ""}`}>
        <div className="dashboard-main">
          {/* Other letters */}
          {showElement && (
            <div className="other-letters">
              <div className="search-wrapper">
                <span className="search-icon">
                  <i className="fa-solid fa-magnifying-glass"></i>
                </span>
                <input
                  type="text"
                  className="search-input"
                  placeholder={t("letterOverview.otherLetters.others")}
                  title={t("letterOverview.otherLetters.others")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label={t("letterOverview.filterBar.others")}
                />
              </div>
              <button className="btn-new-letter" onClick={handleNewLetter}>
                <span className="letter-icon">
                  <i class="fa-solid fa-user"></i>
                </span>
                {t("letterOverview.otherLetters.view")}
              </button>
            </div>
          )}

          {/* Toolbar */}
          <div className="dashboard-toolbar">
            {!showElement && (
              <button className="btn-new-letter" onClick={handleNewLetter}>
                <span className="letter-icon">
                  <i className="fa-solid fa-paper-plane"></i>
                </span>
                {t("letterOverview.filterBar.newLetter")}
              </button>
            )}

            <div className="search-wrapper">
              <span className="search-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
              <input
                type="text"
                className="search-input"
                placeholder={t("letterOverview.filterBar.plcSearch")}
                title={t("letterOverview.filterBar.plcSearch")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label={t("letterOverview.filterBar.plcSearch")}
              />
            </div>

            <div className="select-wrapper">
              <select
                className="select-status"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                aria-label={t("letterOverview.filterBar.plcStatus")}
              >
                <option value="">
                  {t("letterOverview.filterBar.plcStatus")}
                </option>
                <option value={STATUS_CODES.IN_PROGRESS}>
                  {t("letterOverview.dataTable.inProgress")}
                </option>
                <option value={STATUS_CODES.RETURNED}>
                  {t("letterOverview.dataTable.returned")}
                </option>
                <option value={STATUS_CODES.FAILED}>
                  {t("letterOverview.dataTable.failed")}
                </option>
                <option value={STATUS_CODES.SUCCESS}>
                  {t("letterOverview.dataTable.success")}
                </option>
              </select>
            </div>

            <div className="date-filter-wrapper">
              <select
                className="select-before"
                value={beforeOption}
                onChange={(e) => setBeforeOption(e.target.value)}
                aria-label={t("letterOverview.filterBar.selectFilter")}
              >
                <option value="">
                  {t("letterOverview.filterBar.selectFilter")}
                </option>
                <option value="before">
                  {t("letterOverview.filterBar.before")}
                </option>
                <option value="after">
                  {t("letterOverview.filterBar.after")}
                </option>
              </select>
              <input
                type="text"
                className="date-input"
                placeholder={t("letterOverview.filterBar.datePlaceholder")}
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                aria-label={t("letterOverview.filterBar.datePlaceholder")}
              />
            </div>

            <button
              className={`btn-menu ${isPanelOpen ? "active" : ""}`}
              onClick={handleMenuClick}
              title={
                isPanelOpen
                  ? t("dashboard.buttons.closePanel")
                  : t("dashboard.buttons.openPanel")
              }
              aria-label={
                isPanelOpen
                  ? t("dashboard.buttons.closePanel")
                  : t("dashboard.buttons.openPanel")
              }
            >
              <span className="menu-icon">
                <i className="fa-solid fa-bars"></i>
              </span>
            </button>
          </div>

          {/* Table */}
          <div className="dashboard-table-wrapper">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th onClick={() => handleSort("currentStatus")}>
                    <div className="th-content">
                      {t("letterOverview.infobar.status")}
                      {getSortIcon("currentStatus")}
                    </div>
                  </th>
                  <th onClick={() => handleSort("fileName")}>
                    <div className="th-content">
                      {t("letterOverview.infobar.filename")}
                      {getSortIcon("fileName")}
                    </div>
                  </th>
                  <th onClick={() => handleSort("dateSent")}>
                    <div className="th-content">
                      {t("letterOverview.infobar.dateSent")}
                      {getSortIcon("dateSent")}
                    </div>
                  </th>
                  <th onClick={() => handleSort("archiveLink")}>
                    <div className="th-content">
                      {t("letterOverview.infobar.archiveLink")}
                      {getSortIcon("archiveLink")}
                    </div>
                  </th>
                  <th onClick={() => handleSort("recipient")}>
                    <div className="th-content">
                      {t("letterOverview.infobar.recipient")}
                      {getSortIcon("recipient")}
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody>
                {sortedData.length > 0 ? (
                  sortedData.map((row, index) => (
                    <tr
                      key={row.id}
                      className={`${
                        index % 2 === 0 ? "row-light" : "row-dark"
                      } ${selectedRow?.id === row.id ? "row-selected" : ""}`}
                    >
                      <td
                        className="status-cell"
                        title={tStatus(row.currentStatus)}
                      >
                        {getStatusIcon(row.currentStatus)}
                      </td>
                      <td
                        className="filename-cell"
                        onClick={() => handleRowClick(row)}
                      >
                        {row.fileName}
                      </td>
                      <td>{row.dateSent}</td>
                      <td>{row.archiveLink}</td>
                      <td>{row.recipient}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-results">
                      <div className="no-results-content">
                        <div className="no-results-icon">🔍</div>
                        <p>{t("letterOverview.dataTable.noResults")}</p>
                        <small>
                          {t("letterOverview.dataTable.noResultsHelp")}
                        </small>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Pagination (static sample) */}
            {sortedData.length > 5 ? (
              <div className="table-pagination">
                <button
                  className="page-icon-btn"
                  disabled
                  aria-label={t("dashboard.buttons.firstPage")}
                >
                  <i class="fa-solid fa-backward"></i>
                </button>
                <button
                  className="page-icon-btn"
                  disabled
                  aria-label={t("dashboard.buttons.prevPage")}
                >
                  <i class="fa-solid fa-caret-left"></i>
                </button>

                <span className="page-pill active" aria-current="page">
                  1
                </span>
                <span className="page-pill muted">2</span>
                <span className="page-pill muted">3</span>

                <button
                  className="page-icon-btn"
                  aria-label={t("dashboard.buttons.nextPage")}
                >
                  <i class="fa-solid fa-caret-right"></i>
                </button>
                <button
                  className="page-icon-btn"
                  aria-label={t("dashboard.buttons.lastPage")}
                >
                  <i class="fa-solid fa-forward"></i>
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Detail panel */}
        {isPanelOpen && (
          <div className="detail-panel">
            <div className="detail-header">
              <button
                className="close-btn"
                onClick={handleCloseDetail}
                aria-label={t("dashboard.buttons.closePanel")}
                title={t("dashboard.buttons.closePanel")}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {selectedRow ? (
              <div className="detail-content">
                <div className="detail-section">
                  <label className="detail-label">
                    {t("letterOverview.infobar.type")}
                  </label>
                  <div className="detail-value">{selectedRow.type}</div>
                </div>

                <div className="detail-section">
                  <label className="detail-label">
                    {t("letterOverview.infobar.archiveLink")}
                  </label>
                  <div className="detail-value detail-link">
                    {selectedRow.archiveLink}
                  </div>
                </div>

                <div className="line-break"></div>

                <div className="detail-section">
                  <label className="detail-label">
                    {t("letterOverview.infobar.dateSent")}
                  </label>
                  <div className="detail-value">{selectedRow.dateSent}</div>
                </div>

                <div className="detail-section">
                  <label className="detail-label">
                    {t("letterOverview.infobar.recipient")}
                  </label>
                  <div className="detail-value detail-address">
                    {selectedRow.recipientAddress}
                  </div>
                </div>

                <div className="detail-section">
                  <label className="detail-label">
                    {t("letterOverview.infobar.cost")}
                  </label>
                  <div className="detail-value">{selectedRow.cost}</div>
                </div>

                <div className="line-break"></div>

                <div className="detail-section">
                  <label className="detail-label">
                    {t("letterOverview.infobar.status")}
                  </label>
                  <div className="detail-value">
                    {tStatus(selectedRow.status || selectedRow.currentStatus)}
                  </div>
                </div>

                <div className="detail-section">
                  <label className="detail-label">
                    {t("common.reason", "Reason")}:
                  </label>
                  <div className="detail-value">{selectedRow.reason}</div>
                </div>

                <div className="line-break"></div>

                <div className="detail-section">
                  <label className="detail-label">
                    {t("newLetter.keywords.title")}
                  </label>
                  <div className="detail-keywords">
                    {Array.isArray(selectedRow.keywords) &&
                      selectedRow.keywords.map((keyword, index) => (
                        <span key={index} className="keyword-tag">
                          {keyword}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="detail-content">
                <div className="empty-state">
                  <div className="empty-icon">📋</div>
                  <h3>{t("dashboard.empty.title")}</h3>
                  <p>{t("dashboard.empty.hint")}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
