import React, { useEffect, useState } from "react";
import "./Home.css";
import { fetchBackendMessage } from "../api"; // Import the API call function

export default function Home() {
  const [message, setMessage] = useState("");

  // Fetch welcome message from backend
  useEffect(() => {
    fetchBackendMessage().then(setMessage);
  }, []);

  return (
    <div className="home-container">
      <img src="/profile.JPG" alt="Profile" className="profile-picture" />
      <h1 className="home-text">Welcome to My Portfolio</h1>
      <p className="home-subtext">{message || "Full-stack developer passionate about building great web applications."}</p>
    </div>
  );
}
