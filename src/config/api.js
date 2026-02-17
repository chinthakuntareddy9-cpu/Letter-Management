// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || "https://letters-test-hfaffqhaa0crfjgj.westeurope-01.azurewebsites.net";

// API Endpoints
export const API_ENDPOINTS = {
  SEND_LETTER: `${API_BASE_URL}/Letters/`,
};

export default API_BASE_URL;
