import axios from "axios";

export const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    authorization: `Beared ${localStorage.getItem("token")}`,
  },
});
