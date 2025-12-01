import axios from "axios";

export const instance = axios.create({
  baseURL: process.env.VITE_BE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});