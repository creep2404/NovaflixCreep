import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  // headers: {
  //   Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
  //   "Content-Type": "application/json",
  // },
});