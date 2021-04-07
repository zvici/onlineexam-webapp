import axios from "axios";
import store from "../store/index";
const base_url = "https://hufionlineexam.herokuapp.com/api";
axios.defaults.baseURL = base_url;
axios.defaults.headers.get["Accept"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.interceptors.request.use((config) => {
  const token = store.getters.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default axios;
