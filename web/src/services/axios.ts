import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/',
  withCredentials: true,
});

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

export default instance;
