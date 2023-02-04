import axios from 'axios'

const API = axios.create({
  baseURL: "https://studygraph-backend.onrender.com/api/v1/",
});

export default API