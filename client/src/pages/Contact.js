import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-box">
        <h1 className="contact-title">Contact Me</h1>

        <p className="contact-info">
          Email:{" "}
          <a href="mailto:hoomanafsharnia@yahoo.com">
            hoomanafsharnia@yahoo.com
          </a>
        </p>

        <p className="contact-info">
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/hooman-afsharnia-25b75a15a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/hooman
          </a>
        </p>

        <p className="contact-info">
          GitHub:{" "}
          <a
            href="https://github.com/ItsHooman"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/hooman
          </a>
        </p>
      </div>
    </div>
  );
};

export default Contact;
