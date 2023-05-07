import axios from 'axios';

const AxiosConfigure = {
  timeout: 1000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
};

export default axios.create(AxiosConfigure);
