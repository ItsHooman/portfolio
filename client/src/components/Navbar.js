import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <h1 className="logo">My Portfolio</h1>

      {/* ✅ Mobile Menu Button */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* ✅ Navbar Links (Toggles on Mobile) */}
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
        
        <Link to="/projects" className="nav-link" onClick={() => setMenuOpen(false)}>Projects</Link>
        <Link to="/contact" className="nav-link" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/resume" className="nav-link" onClick={() => setMenuOpen(false)}>Resume</Link>
      </div>
    </nav>
  );
};

export default Navbar;
