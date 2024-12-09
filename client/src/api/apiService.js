import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const saveUser = async (userData) => {
  return axios.post(`${API_URL}/user`, userData);
};
