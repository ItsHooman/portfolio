import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
/*import About from "./pages/About";*/
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import "./App.css"; 
import Resume from "./pages/Resume";

function App() {
  return (
    <div className="app-container">
      {/* 🔹 Add Wave Elements */}
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/resume" element={<Resume />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
