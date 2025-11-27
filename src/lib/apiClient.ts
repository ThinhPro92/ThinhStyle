import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api-class-o1lo.onrender.com/api/thinhstyle",
});

export default apiClient;
