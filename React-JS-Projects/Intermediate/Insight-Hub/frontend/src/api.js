// api.js

import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL: `${BASE_URL}`, // Replace with your backend server URL
});

export default instance;
