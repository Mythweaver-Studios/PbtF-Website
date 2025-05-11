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
    if (featuresData && featuresData.length > 1) {
      // Check if featuresData exists
      featureTimeoutRef.current = setTimeout(nextFeature, 10000); // 10s display per feature
    }
    return () => clearTimeout(featureTimeoutRef.current); // Cleanup timer
  }, [currentFeatureIndex, featuresData]); // featuresData in dependency array

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
              onClick={() => {
                // Manual selection of feature slide
                clearTimeout(featureTimeoutRef.current);
                setCurrentFeatureIndex(index);
                // Restart auto-cycle timer
                if (featuresData.length > 1) {
                  featureTimeoutRef.current = setTimeout(nextFeature, 10000);
                }
              }}
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
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default FeaturesSection;
