// src/pages/Home.jsx
import React from 'react';
// Import shared styles :D - Still needed for page-specific content
import '../components/Default.css';
// Removed Link and useLocation imports as NavBar handles them

function Home() {
  // No need for location or active link logic here anymore

  return (
    // No need for the overall `.homepage-container` if Layout handles structure
    // The main content for the Home page specifically
    <main className="main-content home-view">
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
    // Footer is handled by Layout if implemented there
  );
}

export default Home;