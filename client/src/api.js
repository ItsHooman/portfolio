// src/api.js
import axios from "axios";

// Prefer env var in production; fall back to DO URL (good for local testing too)
const API_URL =
  process.env.REACT_APP_API_URL || // CRA
  import.meta?.env?.VITE_API_URL || // Vite
  "https://squid-app-2fq8l.ondigitalocean.app"; // fallback

// Create a single axios instance
const api = axios.create({
  baseURL: API_URL,
});

// OPTIONAL: attach token if you later protect PUT/DELETE
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`; // or raw token if your middleware expects raw
//   return config;
// });

export const fetchBackendMessage = async () => {
  try {
    const { data } = await api.get("/");
    // Your backend currently returns { message: "" } at "/"
    return data?.message ?? "";
  } catch (err) {
    console.error("Error fetching backend message:", err);
    return "Error connecting to backend";
  }
};

export const fetchProjects = async () => {
  try {
    const { data } = await api.get("/projects");
    return data;
  } catch (err) {
    console.error("Error fetching projects:", err);
    return [];
  }
};

export const updateProject = async (id, updatedProject) => {
  try {
    const { data } = await api.put(`/projects/${id}`, updatedProject);
    return data;
  } catch (err) {
    console.error("Error updating project:", err);
    return null;
  }
};

export const deleteProject = async (id) => {
  try {
    await api.delete(`/projects/${id}`);
    return true;
  } catch (err) {
    console.error("Error deleting project:", err);
    return false;
  }
};
