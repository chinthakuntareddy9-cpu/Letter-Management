import axios from "axios";

// Get token from localStorage or environment variable
const getToken = () => {
  // Try to get from localStorage first
  const storedToken = localStorage.getItem("authToken");
  if (storedToken) {
    return storedToken;
  }
  
  // Try environment variable
  return process.env.REACT_APP_AUTH_TOKEN || "";
};

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: "https://letters-test-hfaffqhaa0crfjgj.westeurope-01.azurewebsites.net",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      // COMMENTED OUT - No login page yet
      // localStorage.removeItem("authToken");
      // window.location.href = "/login"; // Redirect to login
      console.warn("Unauthorized: Token may be expired or invalid");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
