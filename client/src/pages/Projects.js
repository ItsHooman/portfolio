import React, { useEffect, useState } from "react";
import { fetchProjects, deleteProject, updateProject } from "../api";
import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [editingProject, setEditingProject] = useState(null);
  const [updatedProject, setUpdatedProject] = useState({ title: "", description: "" });

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      const success = await deleteProject(id);
      if (success) setProjects(projects.filter((project) => project._id !== id));
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project._id);
    setUpdatedProject({ title: project.title, description: project.description });
  };

  const handleUpdate = async (id) => {
    const success = await updateProject(id, updatedProject);
    if (success) {
      setProjects(projects.map((p) => (p._id === id ? { ...p, ...updatedProject } : p)));
      setEditingProject(null);
    }
  };

  return (
    <div className="projects-container">
      <h1 className="projects-title">My Projects</h1>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project._id} className="project-item">
            {editingProject === project._id ? (
              <>
                <input
                  type="text"
                  value={updatedProject.title}
                  onChange={(e) => setUpdatedProject({ ...updatedProject, title: e.target.value })}
                />
                <textarea
                  value={updatedProject.description}
                  onChange={(e) => setUpdatedProject({ ...updatedProject, description: e.target.value })}
                />
                <button onClick={() => handleUpdate(project._id)}>Save</button>
                <button onClick={() => setEditingProject(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h2 className="project-name">{project.title}</h2>
                <p className="project-description">{project.description}</p>
                <p className="project-tech">
                  <strong>Technologies:</strong> {project.technologies.join(", ")}
                </p>
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
                    View on GitHub
                  </a>
                )}
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project._id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
