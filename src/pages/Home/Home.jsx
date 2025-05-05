// src/pages/Home.jsx
import React from "react";
import NavBar from "../../components/NavBar";
import MediaLinks from "../../components/MiniMediaLinks";
// Home uses the default styles from Default.css imported in App.jsx

function Home() {
  return (
    // Use the general page container class
    <div className="page-container">
      {/* Header remains specific to Home */}
      <header className="home-header">
        <NavBar />
        <MediaLinks />
      </header>
      {/* Content structure remains specific to Home */}
      <main className="home-content">
        <div className="content-left">
          {/* Title uses custom font via CSS */}
          <h1>Crownless</h1>
          {/* Removed h2 subtitle */}
          <p>
            Crownless: The Beginning is a tactical survival game where you
            control the fate of summoned heroes battling through a ruthless
            tower of trials. No retries. No revives. Just consequences
          </p>
          {/* Button layout updated for two rows */}
          <div className="action-buttons">
            {/* Row 1: Beta Signup (Primary Style) & Watch Trailer (Secondary Style) */}
            <div className="button-row-top">
              {/* Beta Signup as Primary (White button) */}
              <button className="btn btn-primary">
                {/* Optional: Add an icon if desired for Beta Signup */}
                Beta Signup
              </button>
              {/* Watch Trailer as Secondary (Transparent button) */}
              <button className="btn btn-secondary">Watch Trailer</button>
            </div>
            {/* Row 2: Add to Wishlist (Using Secondary Style for consistency) */}
            <button className="btn btn-tertiary">Add to Wishlist</button>
          </div>
        </div>
        <div className="content-right">
          {/* Empty right side, relies on background */}
        </div>
      </main>
    </div>
  );
}

export default Home;
