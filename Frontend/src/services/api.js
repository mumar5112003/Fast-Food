import axios from "axios";

const apiURL = "http://localhost:4000";

const API = axios.create({
  baseURL: apiURL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("token")
    )}`;
  }
  return req;
});

export default API;
export { apiURL };
