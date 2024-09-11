import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4200/api',
  timeout: 30000,
});

export default instance;
