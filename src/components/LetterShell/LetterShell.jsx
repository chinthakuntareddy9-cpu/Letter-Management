// src/components/Dashboard/Dashboard.jsx
import React, { useState } from "react";
import {
  useNavigate,
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./LetterShell.css";
import { useTranslation } from "react-i18next";
import filePickerImg from "../../assets/filepicker.png";

function LetterShell() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [errors, setErrors] = useState({});
   // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      // Validate file type
      if (file.type !== "application/pdf") {
        setErrors((prev) => ({
          ...prev,
          file: "Only PDF files are allowed",
        }));
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          file: "File size must be less than 10MB",
        }));
        return;
      }

      setUploadedFile(file);
      setErrors((prev) => ({
        ...prev,
        file: "",
      }));

      // Create preview URL for PDF
      const fileURL = URL.createObjectURL(file);
      setFilePreview(fileURL);
    }
  };

  const handleBulkLetter = () => {
    if (!uploadedFile) {
      setErrors((prev) => ({
        ...prev,
        file: "Please upload a PDF file before proceeding",
      }));
      return;
    }
    navigate("/bulk-letter", { 
      state: { 
        uploadedFile: uploadedFile,
        filePreview: filePreview 
      } 
    });
  };

  const handleSingleLetter = () => {
    if (!uploadedFile) {
      setErrors((prev) => ({
        ...prev,
        file: "Please upload a PDF file before proceeding",
      }));
      return;
    }
    navigate("/new-letter", { 
      state: { 
        uploadedFile: uploadedFile,
        filePreview: filePreview 
      } 
    });
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
            <div class="step">2</div>
            <div class="step">3</div>
          </div>
        </div>
      </div>
      <div className="letter-main-area">
        {/*  <img src={filePickerImg} /> */}
        <div className="form-column">
           <div className="form-group">
              <input
                type="file"
                id="file-upload"
                accept=".pdf"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              <span className="file-status">Choose File </span>
              <label htmlFor="file-upload" className="upload-button">
                <i class="fa-solid fa-upload"></i> UPLOAD FILE
              </label>
               {!uploadedFile && <span className="file-status">No file</span>}
              {errors.file && (
                <span className="error-message">{errors.file}</span>
              )} 
            </div>

          </div>
          
      </div>
      {/* Right Column - File Preview */}
          <div className="form-column preview-column">
            {uploadedFile ? (
              <div className="file-preview-section">
                <div className="file-info-header">
                  <strong>Filename</strong>
                  <p>{uploadedFile.name}</p>
                </div>
                {filePreview && (
                  <div className="pdf-preview-container">
                    <iframe
                      src={filePreview}
                      title="PDF Preview"
                      width="100%"
                      height="450px"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="empty-preview">
                <p>Upload a file to see preview</p>
              </div>
            )}
          </div>
      <div className="letter-options-area">
        <button className="btn-new-letter" onClick={handleBulkLetter}>
          <span className="letter-icon">
            <i class="fa-solid fa-envelopes-bulk"></i>
          </span>
          SEND LETTERS IN BULK
        </button>
        <button className="btn-new-letter" onClick={handleSingleLetter}>
          <span className="letter-icon">
            <i class="fa-solid fa-envelope"></i>
          </span>
          SEND LETTER
        </button>
        <button className="btn-new-letter btn-cancel" onClick={handleCancel}>
          <span className="letter-icon">
            <i class="fa-solid fa-ban"></i>
          </span>
          CANCEL
        </button>
      </div>
    </div>
  );
}

export default LetterShell;
