// src/pages/Showcase/components/Features.jsx
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Features.scss"; // Import component-specific styles

const FEATURE_SLIDE_DURATION = 18500; // Duration for each slide in milliseconds

function FeaturesSection({ featuresData }) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const featureTimeoutRef = useRef(null); // Stores timeout for auto-cycling

  // Cycles to the next feature (used by auto-cycle and right arrow).
  const nextFeature = () => {
    setCurrentFeatureIndex(
      (prevIndex) => (prevIndex + 1) % featuresData.length // Loop through features
    );
  };

  // Cycles to the previous feature (used by left arrow).
  const previousFeature = () => {
    setCurrentFeatureIndex(
      (prevIndex) =>
        (prevIndex - 1 + featuresData.length) % featuresData.length // Loop backward
    );
  };

  // Sets up and clears the automatic feature cycling timer.
  useEffect(() => {
    clearTimeout(featureTimeoutRef.current); // Clear any existing timeout first
    if (featuresData && featuresData.length > 1) {
      // Auto-cycle only if there's data and more than one feature
      featureTimeoutRef.current = setTimeout(nextFeature, FEATURE_SLIDE_DURATION);
    }
    return () => clearTimeout(featureTimeoutRef.current); // Cleanup timer on unmount or before next run
  }, [currentFeatureIndex, featuresData]); // Dependencies for effect re-run

  // Handles manual selection of a feature slide via dots.
  const selectFeature = (index) => {
    if (index === currentFeatureIndex) return; // No change if same feature
    clearTimeout(featureTimeoutRef.current); // Stop auto-cycle on manual selection
    setCurrentFeatureIndex(index);
  };

  // Handler for the "next" arrow button click.
  const handleNextFeatureClick = () => {
    clearTimeout(featureTimeoutRef.current);
    nextFeature();
  };

  // Handler for the "previous" arrow button click.
  const handlePreviousFeatureClick = () => {
    clearTimeout(featureTimeoutRef.current);
    previousFeature();
  };

  if (!featuresData || featuresData.length === 0) {
    return (
      <div className="features-section-container"> {/* Main container for centering content */}
        <div className="features-slideshow-box">Loading features...</div> {/* Placeholder for the slideshow box */}
      </div>
    );
  }

  return (
    <div className="features-section-container"> {/* Main container for centering content */}
      <div className="features-slideshow-wrapper"> {/* For slideshow and side arrows */}
        {featuresData.length > 1 && (
          <button
            className="feature-arrow left"
            onClick={handlePreviousFeatureClick}
            aria-label="Previous feature"
          >
            {/* Arrow icon via CSS */}
          </button>
        )}

        <div className="features-slideshow-box"> {/* The actual slideshow box */}
          {featuresData.map((feature, index) => (
            <div
              key={feature.id}
              className={`feature-slide ${
                index === currentFeatureIndex ? "active" : ""
              }`}
            >
              <img
                src={feature.image || "../../../assets/placeholders/feature.png"}
                alt={feature.title}
                className="feature-image"
              />
              <div className="feature-info">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
          {/* Progress bar inside the slideshow box */}
          {featuresData.length > 1 && (
            <div className="feature-progress-container">
              <div
                key={`progress-${currentFeatureIndex}`} // Re-mounts on change, restarting animation
                className="feature-progress-bar"
                style={{ animationDuration: `${FEATURE_SLIDE_DURATION / 1000}s` }}
              ></div>
            </div>
          )}
        </div>

        {featuresData.length > 1 && (
          <button
            className="feature-arrow right"
            onClick={handleNextFeatureClick}
            aria-label="Next feature"
          >
            {/* Arrow icon via CSS */}
          </button>
        )}
      </div>

      {featuresData.length > 1 && ( // Dots container, below the slideshow and arrows
        <div className="feature-dots-container-external">
          <div className="feature-dots">
            {featuresData.map((_, index) => (
              <span
                key={`dot-${index}`}
                className={`dot ${
                  index === currentFeatureIndex ? "active" : ""
                }`}
                onClick={() => selectFeature(index)}
              />
            ))}
          </div>
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
      image: PropTypes.string,
    })
  ).isRequired,
};

export default FeaturesSection;