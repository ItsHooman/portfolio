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

        <p className="home-roles">Full-Stack Developer </p>

        

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
  I’m a passionate full-stack developer who enjoys transforming ideas into clean, interactive digital
  experiences. My core expertise lies in <strong>React</strong>, <strong>Node.js</strong>, and modern
  <strong> JavaScript</strong>, but I’m equally comfortable working across the full web stack — from crafting
  responsive front-end interfaces to designing robust RESTful and GraphQL backends.
  <br /><br />
  I completed the <strong>3-year Computer Programming &amp; Analysis</strong> program at
  <strong> George Brown College</strong> in Toronto, where I built a strong foundation in software engineering,
  data structures, and UI/UX principles. During my studies, I developed multiple full-stack projects, including
  <strong> TripMate</strong> — a travel companion platform that connects solo travelers based on shared goals
  and experiences. That project deepened my love for scalable app design and real-world problem solving.
  <br /><br />
  Beyond technical skills, I value <strong>clarity, accessibility,</strong> and
  <strong> performance</strong> in everything I build. I’m passionate about clean design, semantic code, and
  creating web applications that don’t just function well but also <em>feel right</em> to use.
  <br /><br />
  I currently live in Toronto, constantly learning and experimenting with emerging web technologies, cloud
  deployment, and creative front-end animation techniques. My goal is to continue growing as a developer while
  collaborating on projects that merge creativity, technology, and purpose.
  <br /><br />
  <strong>Let’s head over to the Projects page to see some of my work!</strong>
</p>
<div className="about-cta">
  <button
  className="go-projects-btn"
  onClick={() => (window.location.href = "/projects")}
>
  💻 Let’s go to the Projects page ✨
</button>

</div>


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
