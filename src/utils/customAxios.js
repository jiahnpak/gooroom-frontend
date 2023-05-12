import axios from 'axios';

const AxiosConfigure = {
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

export default axios.create(AxiosConfigure);
