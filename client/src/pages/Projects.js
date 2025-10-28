import React, { useEffect, useState } from "react";
import { fetchProjects } from "../api";
import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  return (
    <div className="projects-container">
      <h1 className="projects-title">My Projects</h1>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project._id} className="project-item">
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
