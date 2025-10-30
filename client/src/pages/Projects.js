import React, { useEffect, useState } from "react";
import { fetchProjects } from "../api";
import "./Projects.css";

function isValid(url) {
  return typeof url === "string" && url.trim() !== "" && url.trim() !== "#";
}

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects().then(setProjects).catch(console.error);
  }, []);

  return (
    <div className="projects-container">
      <h1 className="projects-title">My Projects</h1>
      <ul className="project-list">
        {projects.map((project) => {
          // prefer `id`, fall back to `_id` just in case
          const key = project.id || project._id;

          // accept either canonical or legacy keys from API
          const live  = project.liveDemo   || project.liveUrl   || "";
          const video = project.youtubeDemo || project.videoLink || "";
          const repo  = project.githubLink || project.repoUrl   || "";

          return (
            <li key={key} className="project-item">
              <h2 className="project-name">{project.title}</h2>
              <p className="project-description">{project.description}</p>

              {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                <p className="project-tech">
                  <strong>Technologies:</strong> {project.technologies.join(", ")}
                </p>
              )}

              <div className="project-links" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                {isValid(live)  && (
                  <a href={live} target="_blank" rel="noopener noreferrer" className="project-link btn">
                    Live Demo
                  </a>
                )}
                {isValid(video) && (
                  <a href={video} target="_blank" rel="noopener noreferrer" className="project-link btn">
                    YouTube
                  </a>
                )}
                {isValid(repo)  && (
                  <a href={repo} target="_blank" rel="noopener noreferrer" className="project-link btn">
                    GitHub
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Projects;
