import React from "react";
import "./Resume.css";

const Resume = () => {
  return (
    <div className="resume-container">
      <div className="resume-box">
        <h1 className="resume-title">My Resume</h1>

        <iframe
          src="/Hooman-Afsharnia-Resume.pdf#view=FitH&zoom=100"
          title="Resume"
          className="resume-frame"
        ></iframe>

        <a
          href="/Hooman-Afsharnia-Resume.pdf"
          download="Hooman-Afsharnia-Resume.pdf"
          className="download-link"
        >
          <button className="download-button">Download Resume</button>
        </a>
      </div>
    </div>
  );
};

export default Resume;
