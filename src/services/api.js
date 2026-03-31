// src/services/api.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.DEV ? '/' : 'https://ekyc-j7lp.onrender.com/',
  headers: { 'Content-Type': 'application/json' }
});

export const createCase = (phoneNumber) => apiClient.post('/api/Customer/create_case', {
  "phone": phoneNumber,
});

export const checkStatus = (id) => apiClient.post(`/api/Customer/verifications`, {
  "verificationsId": id
});

export default apiClient;

