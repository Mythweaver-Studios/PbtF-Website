// src/pages/Showcase/components/Features.jsx
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Features.scss"; // Import component-specific styles

function FeaturesSection({ featuresData }) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const featureTimeoutRef = useRef(null); // Stores timeout for auto-cycling

  // Cycles to the next feature.
  const nextFeature = () => {
    setCurrentFeatureIndex(
      (prevIndex) => (prevIndex + 1) % featuresData.length // Loop through features
    );
  };

  // Sets up and clears the automatic feature cycling timer.
  useEffect(() => {
    clearTimeout(featureTimeoutRef.current); // Clear any existing timeout first
    if (featuresData && featuresData.length > 1) {
      // Auto-cycle only if there's data and more than one feature
      featureTimeoutRef.current = setTimeout(nextFeature, 10000); // 10s display per feature
    }
    return () => clearTimeout(featureTimeoutRef.current); // Cleanup timer on unmount or before next run
  }, [currentFeatureIndex, featuresData]); // Dependencies for effect re-run

  // Handles manual selection of a feature slide via dots.
  const selectFeature = (index) => {
    if (index === currentFeatureIndex) return; // No change if same feature
    clearTimeout(featureTimeoutRef.current); // Stop auto-cycle on manual selection
    setCurrentFeatureIndex(index);
    // useEffect will handle restarting the timer due to currentFeatureIndex change
  };

  if (!featuresData || featuresData.length === 0) {
    return (
      <div className="features-slideshow-wrapper">Loading features...</div>
    ); // Or some placeholder
  }

  return (
    <div className="features-slideshow-wrapper">
      <div className="features-slideshow">
        {featuresData.map((feature, index) => (
          <div
            key={feature.id}
            className={`feature-slide ${
              index === currentFeatureIndex ? "active" : ""
            }`}
          >
            <img
              src={feature.image || "../../../assets/placeholders/feature.png"} // Fallback feature image
              alt={feature.title}
              className="feature-image"
            />
            <div className="feature-info">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      {featuresData.length > 1 && ( // Only show dots if more than one feature
        <div className="feature-dots">
          {featuresData.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentFeatureIndex ? "active" : ""}`}
              onClick={() => selectFeature(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// PropTypes definition
FeaturesSection.propTypes = {
  featuresData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string, // Fallback image is provided in component
    })
  ).isRequired,
};

export default FeaturesSection;
