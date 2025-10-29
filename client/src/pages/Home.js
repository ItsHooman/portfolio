import React, { useEffect, useState } from "react";
import { fetchBackendMessage } from "../api";
import "./Home.css";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchBackendMessage().then(setMessage).catch(() => {});
  }, []);

  const scrollToAbout = () => {
    document.getElementById("about-intro")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="home-container">
        <img src="/profile.jpg" alt="Profile" className="profile-picture" />

        <h1 className="home-title">
          Hey, I’m <span className="accent">Hooman</span>
        </h1>

        <p className="home-roles">Full-Stack Developer • React • Node.js</p>

        <p className="home-message">
          {message ||
            "I build modern, responsive web experiences using React, Node, and web design principles."}
        </p>

        {/* ↓ cute bouncing scroll arrow */}
        <button
          type="button"
          className="scroll-indicator"
          aria-label="Scroll to About"
          onClick={scrollToAbout}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6 8l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 12l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </section>

      {/* ===== ABOUT PREVIEW ===== */}
      \<section className="about-box">
  <div id="about-intro">
    <h2>About Me</h2>
    <p>
      I’m a passionate full-stack developer with experience in <strong>React</strong>, <strong>Node.js</strong>, and
      <strong> JavaScript</strong>. I studied the 3-year <strong>Computer Programming &amp; Analysis</strong> program
      at <strong>George Brown College</strong> in Toronto, Canada, and graduated in 2025. I love designing modern,
      accessible websites and web applications that feel fast, clean, and delightful to use.
    </p>
  </div>

  <div id="certificates" className="certs">
    <h2>Certificates</h2>
    <p className="certs-note">Highlights from my program and additional training.</p>
    <div className="certs-grid">
      <img src="/certificates/diploma.png" alt="Computer Programming & Analysis Diploma (2025)" loading="lazy" />
      <img src="/certificates/npower-it-analyst.png" alt="NPower Canada – Junior IT Analyst" loading="lazy" />
    </div>
  </div>
</section>
    </>
  );
}
