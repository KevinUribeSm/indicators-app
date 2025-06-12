import axios from 'axios';

const API_KEY = '69305a065f4bebfa803b837584a2be6768fc8e4f';
const BASE_URL = 'https://api.cmfchile.cl/api-sbifv3/recursos_api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  params: {
    apikey: API_KEY,
    formato: 'json',
  },
});

export default apiClient;
