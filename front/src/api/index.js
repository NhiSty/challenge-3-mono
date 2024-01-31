import Axios from "axios";

export const apiClient = Axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/ld+json",
    'Authorization': 'Bearer ' + localStorage.getItem('token'),
  },
});
