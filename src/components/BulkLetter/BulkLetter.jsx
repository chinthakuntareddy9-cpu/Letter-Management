import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./BulkLetter.css";

const BulkLetter = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Recipient
    recipientFirstName: "",
    recipientLastName: "",
    recipientCompany: "",
    recipientStreet: "",
    recipientHouseNo: "",
    recipientFlatNo: "",
    recipientCity: "",
    recipientZipCode: "",
    recipientCountry: "",
    notifySubject:'',
    notifyRecipients:'',
    /* letterCount: "", */

    // Return Address
    returnFirstName: "Gilian",
    returnLastName: "Sterckx",
    returnCompany: "Colruyt Group",
    returnStreet: "Edingensesteenweg",
    returnHouseNo: "196",
    returnFlatNo: "",
    returnCity: "Halle",
    returnZipCode: "1500",

    // Mail Options
    mailType: "standard",

    // Letter Language
    language: "",
  });

  const [uploadedFile, setUploadedFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [emailRecipients, setEmailRecipients] = useState([]);

  // Initialize file from location state (passed from LetterShell)
  useEffect(() => {
    if (location.state?.uploadedFile) {
      setUploadedFile(location.state.uploadedFile);
    }
    if (location.state?.filePreview) {
      setFilePreview(location.state.filePreview);
    }
  }, [location.state]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

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

  // Remove uploaded file
  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFilePreview(null);
    // Reset file input
    const fileInput = document.getElementById("file-upload");
    if (fileInput) fileInput.value = "";
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    // Notification Email validation
    if (!formData.notifySubject.trim()) {
      newErrors.notifySubject = "Subject is required";
    }
    if (emailRecipients.length === 0) {
      newErrors.notifyRecipients = "Please add at least one email recipient";
    }

    // Return Address validation (from modal)
    if (!formData.returnFirstName.trim()) {
      newErrors.returnFirstName = "Return first name is required";
    }
    if (!formData.returnLastName.trim()) {
      newErrors.returnLastName = "Return last name is required";
    }
    if (!formData.returnCity.trim()) {
      newErrors.returnCity = "Return city is required";
    }
    if (!formData.returnZipCode.trim()) {
      newErrors.returnZipCode = "Return ZIP code is required";
    }

    // File validation
    /* if (!uploadedFile) {
      newErrors.file = "Please upload a PDF file";
    } */
    /* if (!formData.letterCount.trim()) {
      newErrors.letterCount = "Count is required";
    } */

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle cancel
  const handleCancel = () => {
    navigate("/letter-shell");
  };

  // Handle adding email recipient
  const handleAddRecipient = () => {
    if (formData.notifyRecipients.trim()) {
      setEmailRecipients((prev) => [...prev, formData.notifyRecipients.trim()]);
      setFormData((prev) => ({
        ...prev,
        notifyRecipients: "",
      }));
      setErrors((prev) => ({
        ...prev,
        notifyRecipients: "",
      }));
    }
  };

  // Handle removing email recipient
  const handleRemoveRecipient = (index) => {
    setEmailRecipients((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle save (return to dashboard without submitting)
  const handleSave = () => {
    console.log("Form saved (draft)");
    navigate("/");
  };

  // Handle next/submit
  const handleNext = async () => {
    console.log("SEND button clicked");
    console.log("Current errors:", errors);
    console.log("EmailRecipients:", emailRecipients);
    console.log("Validation starting...");
    
    if (validateForm()) {
      console.log("Validation passed!");
      setIsLoading(true);
      try {
        // Prepare API request body with letterData key
        const letterData = {
          recipient: {
            firstName: formData.recipientFirstName,
            lastName: formData.recipientLastName,
            company: formData.recipientCompany,
            address: {
              street: formData.recipientStreet,
              houseNumber: formData.recipientHouseNo,
              flatNumber: formData.recipientFlatNo,
              city: formData.recipientCity,
              zipCode: formData.recipientZipCode,
              country: formData.recipientCountry,
            },
            notifySubject: formData.notifySubject,
            notifyRecipients: emailRecipients.join(","),
          },
          returnAddress: {
            firstName: formData.returnFirstName,
            lastName: formData.returnLastName,
            company: formData.returnCompany,
            address: {
              street: formData.returnStreet,
              houseNumber: formData.returnHouseNo,
              flatNumber: formData.returnFlatNo,
              city: formData.returnCity,
              zipCode: formData.returnZipCode,
            },
          },
          mailOptions: {
            type: formData.mailType,
            language: formData.language,
          },
        };

        console.log("Sending data:", letterData);

        // Create FormData to handle file upload
        const formDataToSend = new FormData();
        formDataToSend.append("letterData", JSON.stringify(letterData));
        formDataToSend.append("attachment", uploadedFile);

        // Make API request using axios
        const response = await axios.post(
          "https://letters-test-hfaffqhaa0crfjgj.westeurope-01.azurewebsites.net/Letters/Send",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("API Response:", response.data);
        alert("Letter sent successfully!");

        // Navigate to success page on successful submission
        navigate("/success");
      } catch (error) {
        console.error("Error submitting form:", error);
        let errorMessage = "Failed to submit form. Please try again.";
        
        if (error.response) {
          // Server responded with error status
          errorMessage = `Server Error (${error.response.status}): ${error.response.data?.message || error.response.statusText}`;
        } else if (error.request) {
          // Request made but no response
          errorMessage = "Network Error: No response from server. Check if the API is running and CORS is enabled.";
        } else if (error.message) {
          errorMessage = `Error: ${error.message}`;
        }
        
        alert(errorMessage);
        setErrors((prev) => ({
          ...prev,
          submit: errorMessage,
        }));
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Validation failed! Errors:", errors);
      alert("Please fill in all required fields before sending.");
    }
  };

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
        {errors.submit && (
          <div style={{ 
            padding: "12px", 
            marginBottom: "20px", 
            backgroundColor: "#fee", 
            color: "#c33", 
            borderRadius: "4px",
            border: "1px solid #fcc"
          }}>
            {errors.submit}
          </div>
        )}
        <div className="form-columns-three">
          {/* Left Column - Recipient */}
          <div className="form-column">
            {/* <h2>Recipient</h2> */}
            {/* <div className="form-group">
              <input
                type="text"
                name="recipientFirstName"
                placeholder="First name"
                value={formData.recipientFirstName}
                onChange={handleChange}
                className={errors.recipientFirstName ? "error" : ""}
              />
              {errors.recipientFirstName && (
                <span className="error-message">
                  {errors.recipientFirstName}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="recipientLastName"
                placeholder="Last name"
                value={formData.recipientLastName}
                onChange={handleChange}
                className={errors.recipientLastName ? "error" : ""}
              />
              {errors.recipientLastName && (
                <span className="error-message">
                  {errors.recipientLastName}
                </span>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="recipientCompany"
                placeholder="Company"
                value={formData.recipientCompany}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group flex-2">
                <input
                  type="text"
                  name="recipientStreet"
                  placeholder="Street"
                  value={formData.recipientStreet}
                  onChange={handleChange}
                  className={errors.recipientStreet ? "error" : ""}
                />
                {errors.recipientStreet && (
                  <span className="error-message">
                    {errors.recipientStreet}
                  </span>
                )}
              </div>
              <div className="form-group flex-1">
                <input
                  type="text"
                  name="recipientHouseNo"
                  placeholder="House no."
                  value={formData.recipientHouseNo}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group flex-1">
                <input
                  type="text"
                  name="recipientFlatNo"
                  placeholder="Flat no."
                  value={formData.recipientFlatNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-2">
                <input
                  type="text"
                  name="recipientCity"
                  placeholder="City"
                  value={formData.recipientCity}
                  onChange={handleChange}
                  className={errors.recipientCity ? "error" : ""}
                />
                {errors.recipientCity && (
                  <span className="error-message">{errors.recipientCity}</span>
                )}
              </div>
              <div className="form-group flex-1">
                <input
                  type="text"
                  name="recipientZipCode"
                  placeholder="ZIP code"
                  value={formData.recipientZipCode}
                  onChange={handleChange}
                  className={errors.recipientZipCode ? "error" : ""}
                />
                {errors.recipientZipCode && (
                  <span className="error-message">
                    {errors.recipientZipCode}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="recipientCountry"
                placeholder="Country"
                value={formData.recipientCountry}
                onChange={handleChange}
                className={errors.recipientCountry ? "error" : ""}
              />
              {errors.recipientCountry && (
                <span className="error-message">{errors.recipientCountry}</span>
              )}
            </div>

            <h2>Mail Options</h2>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="mailType"
                  value="standard"
                  checked={formData.mailType === "standard"}
                  onChange={handleChange}
                />
                <span>Standard letter</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="mailType"
                  value="registered"
                  checked={formData.mailType === "registered"}
                  onChange={handleChange}
                />
                <span>Registered letter</span>
              </label>
            </div> */}
            <h2>Attachment</h2>
            <div className="form-group">
              <input
                type="file"
                id="file-upload"
                accept=".pdf"
                /* onChange={handleFileUpload} */
                style={{ display: "none" }}
              />
              <label htmlFor="file-upload" className="upload-button">
                <i class="fa-solid fa-upload"></i> UPLOAD FILE
              </label>
              {!uploadedFile && <span className="file-status">No file</span>}
              {/* {errors.file && (
                <span className="error-message">{errors.file}</span>
              )} */}
            </div>
            <h2>Letter Count</h2>
            <div className="form-group flex-2">
              <input
                type="number"
                name="letterCount"
                placeholder="Letter Count"
               /*  value={formData.letterCount}
                onChange={handleChange}
                className={errors.letterCount ? "error" : ""} */
              />
             {/*  {errors.letterCount && (
                <span className="error-message">{errors.letterCount}</span>
              )} */}
            </div>
            <h2>Return Address</h2>
            <div className="edit-address">
              <div><p>
                {formData.returnFirstName} {formData.returnLastName} <br />
                {formData.returnStreet} {formData.returnHouseNo}<br />
                {formData.returnZipCode} {formData.returnCity}<br />
                Belgium
              </p>
              </div>

              <div className="edit-button">
                <button className="btn-edit" onClick={() => setShowEditModal(true)}>
                  Edit
                </button>
              </div>
            </div>
          </div>

          {/* Middle Column - Attachment & Return Address */}
          <div className="form-column">




            {/* <div className="form-group">
              <input
                type="text"
                name="returnFirstName"
                placeholder="First name"
                value={formData.returnFirstName}
                onChange={handleChange}
                className={errors.returnFirstName ? "error" : ""}
              />
              {errors.returnFirstName && (
                <span className="error-message">{errors.returnFirstName}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="returnLastName"
                placeholder="Last name"
                value={formData.returnLastName}
                onChange={handleChange}
                className={errors.returnLastName ? "error" : ""}
              />
              {errors.returnLastName && (
                <span className="error-message">{errors.returnLastName}</span>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="returnCompany"
                placeholder="Company"
                value={formData.returnCompany}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <div className="form-group flex-2">
                <input
                  type="text"
                  name="returnStreet"
                  placeholder="Street"
                  value={formData.returnStreet}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group flex-1">
                <input
                  type="text"
                  name="returnHouseNo"
                  placeholder="House no."
                  value={formData.returnHouseNo}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group flex-1">
                <input
                  type="text"
                  name="returnFlatNo"
                  placeholder="Flat no."
                  value={formData.returnFlatNo}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group flex-2">
                <input
                  type="text"
                  name="returnCity"
                  placeholder="City"
                  value={formData.returnCity}
                  onChange={handleChange}
                  className={errors.returnCity ? "error" : ""}
                />
                {errors.returnCity && (
                  <span className="error-message">{errors.returnCity}</span>
                )}
              </div>
              <div className="form-group flex-1">
                <input
                  type="text"
                  name="returnZipCode"
                  placeholder="ZIP code"
                  value={formData.returnZipCode}
                  onChange={handleChange}
                  className={errors.returnZipCode ? "error" : ""}
                />
                {errors.returnZipCode && (
                  <span className="error-message">{errors.returnZipCode}</span>
                )}
              </div>
            </div>

            <div className="form-actions-inline">
              <button className="btn-cancel" onClick={handleCancel}>
                CANCEL
              </button>
              <button className="btn-save" onClick={handleSave}>
                SAVE
              </button>
            </div> */}

            <h2>Notification email</h2>
            <div className="form-group">
              <input
                type="text"
                name="notifySubject"
                placeholder="Subject"
                value={formData.notifySubject}
                onChange={handleChange}
                className={errors.notifySubject ? "error" : ""}
              />
              {errors.notifySubject && (
                <span className="error-message">{errors.notifySubject}</span>
              )}
            </div>
            <div className="form-row">
              <div className="form-group flex-2">
                <input
                  type="text"
                  name="notifyRecipients"
                  placeholder="Email recipients"
                  value={formData.notifyRecipients}
                  onChange={handleChange}
                  className={errors.notifyRecipients ? "error" : ""}
                />
                {errors.notifyRecipients && (
                  <span className="error-message">{errors.notifyRecipients}</span>
                )}
              </div>
              <div className="form-group flex-0">
                <button className="btn-save" onClick={handleAddRecipient}>
                  + Add
                </button>
              </div>
            </div>
            
            {/* Email Recipients List */}
            {emailRecipients.length > 0 && (
              <div className="recipients-list">
                {emailRecipients.map((recipient, index) => (
                  <div key={index} className="recipient-tag">
                    <span>{recipient}</span>
                    <button type="button"
                      className="btn-close"  aria-label="Close"
                      onClick={() => handleRemoveRecipient(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                      height="100%"
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
        </div>

        <div className="form-navigation">
          <button type="button" className="btn-previous" onClick={handleCancel} disabled={isLoading}>
            PREVIOUS
          </button>
          <button 
            type="button" 
            className="btn-next" 
            onClick={handleNext} 
            disabled={isLoading}
            style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i> SENDING...
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane"></i> SEND
              </>
            )}
          </button>
        </div>
      </div>

      {/* Edit Return Address Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Return Address</h2>
              <button
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <input
                  type="text"
                  name="returnFirstName"
                  placeholder="Gilian"
                  value={formData.returnFirstName}
                  onChange={handleChange}
                  className={errors.returnFirstName ? "error" : ""}
                />
                {errors.returnFirstName && (
                  <span className="error-message">
                    {errors.returnFirstName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="returnLastName"
                  placeholder="Sterckx"
                  value={formData.returnLastName}
                  onChange={handleChange}
                  className={errors.returnLastName ? "error" : ""}
                />
                {errors.returnLastName && (
                  <span className="error-message">
                    {errors.returnLastName}
                  </span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="returnCompany"
                  placeholder="Colruyt Group"
                  value={formData.returnCompany}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group flex-2">
                  <input
                    type="text"
                    name="returnStreet"
                    placeholder="Edingensesteenweg"
                    value={formData.returnStreet}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group flex-1">
                  <input
                    type="text"
                    name="returnHouseNo"
                    placeholder="196"
                    value={formData.returnHouseNo}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group flex-1">
                  <input
                    type="text"
                    name="returnFlatNo"
                    placeholder="Box"
                    value={formData.returnFlatNo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-2">
                  <input
                    type="text"
                    name="returnCity"
                    placeholder="Halle"
                    value={formData.returnCity}
                    onChange={handleChange}
                    className={errors.returnCity ? "error" : ""}
                  />
                  {errors.returnCity && (
                    <span className="error-message">{errors.returnCity}</span>
                  )}
                </div>
                <div className="form-group flex-1">
                  <input
                    type="text"
                    name="returnZipCode"
                    placeholder="1500"
                    value={formData.returnZipCode}
                    onChange={handleChange}
                    className={errors.returnZipCode ? "error" : ""}
                  />
                  {errors.returnZipCode && (
                    <span className="error-message">
                      {errors.returnZipCode}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowEditModal(false)}
              >
                CANCEL
              </button>
              <button
                className="btn-save"
                onClick={() => setShowEditModal(false)}
              >
                SAVE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkLetter;
