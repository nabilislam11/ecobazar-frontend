// Centralized Axios instance — not used yet (services return dummy data),
// but every service is written to swap to this with a one-line change.
// import axios from 'axios';
//
// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
//   headers: { 'Content-Type': 'application/json' },
// });
//
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('ecobazar_token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

const DUMMY_LATENCY = 300;

// Simulates network latency so loading states are visible/testable now,
// and this file is the only place that changes when a real API lands.
export const resolveAfter = (data, ms = DUMMY_LATENCY) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));
