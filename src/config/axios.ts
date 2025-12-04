import axios, { AxiosInstance } from "axios";

export const instance: AxiosInstance = axios.create({
  baseURL: process.env.VITE_BE_API_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});