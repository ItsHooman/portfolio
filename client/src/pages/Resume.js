import React from 'react';
import './Resume.css';


const Resume = () => {
  return (
    <div className="resume-container">
      <h1>My Resume</h1>
      <iframe
        src="/Hooman-Afsharnia-Resume.pdf"
        width="100%"
        height="800px"
        style={{ border: "none" }}
        title="Resume"
      ></iframe>

      {/* Download Button */}
      <a href="/Hooman-Afsharnia-Resume.pdf" download="Hooman-Afsharnia-Resume.pdf">
        <button className="download-button">Download Resume</button>
      </a>
    </div>
  );
};

export default Resume;