import axios from 'axios';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // από .env
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, 
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API Error]', error);
    return Promise.reject(error);
  }
);

export default httpClient;