import axios from 'axios';

// Remove trailing slash para evitar URLs duplicadas como //api
const API_BASE = (import.meta.env.VITE_API_BASE || 'http://localhost:4000').replace(/\/$/, '');

export const api = axios.create({ 
  baseURL: API_BASE + '/api',
  // Removido headers de cache - causam CORS issues na Vercel
  // O backend já trata cache adequadamente
});

export function setAuthToken(token) {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
}
