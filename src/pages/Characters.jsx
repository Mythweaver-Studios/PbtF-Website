// src/pages/Characters.jsx
import React, { useState } from 'react'; // Import useState
// Import shared styles :D - Still needed for page-specific content
import '../components/Default.css';
// Removed Link import related to NavBar, but keep it if used elsewhere in Characters page

function Characters() {
  // --- State Management ---
  const [activeWorld, setActiveWorld] = useState('World 1');

  // Placeholder data
  const characterData = {
    name: 'Character Name',
    voiceActor: "Voice Actor's Name",
    description: `BABY GIRL!`, // Placeholder text
  };

  // Example worlds
  const worlds = ['World 1', 'World 2', 'World 3', 'World 4'];

  // --- Event Handlers ---
  const handleWorldClick = (worldName) => {
    setActiveWorld(worldName);
    console.log(`Selected: ${worldName}`);
  };

  return (
    // No need for the overall `.characters-page` if Layout handles structure
    // The main content for the Characters page specifically
    <main className="main-content character-view">
      <div className="character-content-wrapper">
        {/* Left Sidebar for World Selection */}
        <aside className="world-selector">
          {worlds.map((world) => (
            <button
              key={world}
              className={`world-button ${activeWorld === world ? 'active' : ''}`}
              onClick={() => handleWorldClick(world)}
            >
              {world}
            </button>
          ))}
        </aside>

        {/* Central Content Area for Character Details */}
        <section className="character-details-card">
          <div className="character-info">
            <p className="va-name">VA: {characterData.voiceActor}</p>
            <h1 className="character-name-heading">{characterData.name}</h1>
            <p className="character-description">{characterData.description}</p>
          </div>
          <div className="character-image-placeholder">
            {/* Intentionally empty */}
          </div>
        </section>

        {/* Right Navigation Arrow */}
        <div className="navigation-arrow right-arrow">
          {/* Arrow */}
        </div>
      </div>
    </main>
    // Footer is handled by Layout if implemented there
  );
}

export default Characters;