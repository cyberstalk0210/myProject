// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8085/api',
  headers: {
    Authorization: 'Bearer ' + localStorage.getItem('AccessToken'),
    'Content-Type': 'application/json',
  },
});

export default api;
