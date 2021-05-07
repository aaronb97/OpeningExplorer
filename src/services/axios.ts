import axios from 'axios';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://opening-explorer-backend.herokuapp.com/'
    : 'http://localhost:3001/';

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded';
axios.defaults.withCredentials = true;

export default instance;
