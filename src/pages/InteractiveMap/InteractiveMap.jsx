// src/pages/InteractiveMap/InteractiveMap.jsx
import React, { useEffect } from 'react';
import './InteractiveMap.css';
import '../../Showcase/Showcase.css'; // Re-using showcase styles for consistency

function InteractiveMap() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="showcase-section interactive-map-page">
            <div className="section-title-container">
                <h1 className="section-title">Interactive Map</h1>
            </div>
            <div className="placeholder-content">
                <p>The interactive map is currently under development.</p>
                <p>Check back soon to explore the world of Paved by the Fallen.</p>
            </div>
        </div>
    );
}

export default InteractiveMap;