import axios from 'axios';
import { auth } from '../../firebase/firebase.js';

const BASE_URL = "http://127.0.0.1:5000";

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

AxiosInstance.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const idToken = await user.getIdToken();
      config.headers.Authorization = `Bearer ${idToken}`;
    }
    return config;

}, (error) => {
  return Promise.reject(error);
});

AxiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
      if (error.response && error.response.status === 401) {
          console.error('Unauthorized.');
      }
      return Promise.reject(error);
  }
)
export default AxiosInstance;