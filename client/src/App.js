import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
/*import About from "./pages/About";*/
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import Resume from "./pages/Resume";
import "./App.css";

// 💬 Chat widget import
import ChatWidget from "./components/ChatWidget";

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

      {/* 💬 Persistent Chat Widget (shows on all pages) */}
      <ChatWidget ownerName="Hooman" position="left" />
    </div>
  );
}

export default App;
