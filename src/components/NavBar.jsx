// src/components/NavBar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Default.css'; // Import shared styles

function NavBar() {
  const location = useLocation(); // Hook to get the current URL path

  // Helper to check if a nav link is the active page
  const isNavLinkActive = (path) => location.pathname === path;

  return (
    <header className="header">
      {/* Logo Section */}
      <div className="logo-container">
        {/* Wrap logo in a link to the homepage */}
        <Link to="/" className="logo-placeholder-link">
          <div className="logo-placeholder">Logo</div>
        </Link>
      </div>

      {/* Main Navigation Links */}
      <nav className="navigation">
        <Link to="/" className={`nav-link ${isNavLinkActive('/') ? 'active' : ''}`}>Home</Link>
        <Link to="/news" className={`nav-link ${isNavLinkActive('/news') ? 'active' : ''}`}>News</Link>
        <Link to="/characters" className={`nav-link ${isNavLinkActive('/characters') ? 'active' : ''}`}>Characters</Link>
        <Link to="/explore" className={`nav-link ${isNavLinkActive('/explore') ? 'active' : ''}`}>Explore</Link>
        <Link to="/more" className={`nav-link ${isNavLinkActive('/more') ? 'active' : ''}`}>More</Link>
      </nav>

      {/* Authentication/Action Buttons */}
      <div className="auth-actions">
        <Link to="/login" className="login-link">Log In</Link>
        <button className="download-button header-download-button">Download</button>
      </div>
    </header>
  );
}

export default NavBar;