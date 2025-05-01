// src/pages/Home.jsx
import React from 'react';
// Import shared styles :D
import '../components/Default.css';
import { Link } from 'react-router-dom';

function Home() { 
  return (
    // Overall container for the page layout
    <div className="homepage-container">
      {/* Top navigation bar */}
      <header className="header">
        {/* Logo area */}
        <div className="logo-container">
          <div className="logo-placeholder">Logo</div>
        </div>
        {/* Main navigation links */}
        <nav className="navigation">
          {/* Placeholder links - use React Router's <Link> I believe for actual navigation */}
          <a href="#home" className="nav-link active">Home</a> {/* Active link style */}
          <a href="#news" className="nav-link">News</a>
          <a href="#characters" className="nav-link">Characters</a>
          <Link to="/explore" className="nav-link">Explore</Link>
          <a href="#more" className="nav-link">More</a>
        </nav>
        {/* Login and Download actions */}
        <div className="auth-actions">
          <a href="#login" className="login-link">Log In</a>
          <button className="download-button header-download-button">Download</button>
        </div>
      </header>

      {/* Main content area below the header */}
      <main className="main-content">
        {/* Hero section with background and main call to action */}
        <div className="hero-section">
          {/* Main headline */}
          <h1 className="main-heading">
            Available on Multiple Platforms - Download Now!
          </h1>
          {/* Download buttons for different platforms */}
          <div className="platform-buttons">
            <button className="download-button platform-button">Android</button>
            <button className="download-button platform-button">PC</button>
            <button className="download-button platform-button">iOS</button>
          </div>
        </div>
      </main>

      {/* Optional: Footer Section (can be added later) */}
      {/* <footer className="footer">
        {/* Footer content goes here *}
      </footer> */}
    </div>
  );
}

// Export the Home component for use in other parts of the app (like App.js)
export default Home; // Changed export name to Home