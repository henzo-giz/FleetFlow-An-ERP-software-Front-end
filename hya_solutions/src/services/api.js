// src/services/api.js
const API_BASE_URL = "http://localhost:5000"; // json-server base URL

// Generic request helper
async function request(endpoint, method = "GET", body = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }
  return response.json();
}

// Example API functions
export const login = (credentials) =>
  request("/auth/login", "POST", credentials);

export const getVehicles = (token) =>
  request("/vehicles", "GET", null, token);

export const addVehicle = (vehicleData, token) =>
  request("/vehicles", "POST", vehicleData, token);

// Add more like updateDriver, deleteTrip, etc.
