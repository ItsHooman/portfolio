import axios from "axios";

const API_URL = "http://localhost:5010";

// 📌 Fetch welcome message from backend
export const fetchBackendMessage = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.message; // Ensure this matches what the backend sends
  } catch (error) {
    console.error("Error fetching data:", error);
    return "Error connecting to backend";
  }
};

// 📌 Fetch all projects from backend
export const fetchProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

// 📌 Edit a project
export const updateProject = async (id, updatedProject) => {
  try {
    const response = await axios.put(`${API_URL}/projects/${id}`, updatedProject);
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    return null;
  }
};

// 📌 Delete a project
export const deleteProject = async (id) => {
  try {
    await axios.delete(`${API_URL}/projects/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting project:", error);
    return false;
  }
};
