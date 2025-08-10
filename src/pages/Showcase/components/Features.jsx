// src/pages/Showcase/components/Features.jsx
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import ArrowButton from "../../../components/ArrowButton/ArrowButton";
import "./Features.css";

const FEATURE_SLIDE_DURATION = 18500;

function FeaturesSection({ featuresData }) {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const featureTimeoutRef = useRef(null);

  const nextFeature = () => {
    setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % featuresData.length);
  };

  const previousFeature = () => {
    setCurrentFeatureIndex((prevIndex) => (prevIndex - 1 + featuresData.length) % featuresData.length);
  };

  useEffect(() => {
    clearTimeout(featureTimeoutRef.current);
    if (featuresData && featuresData.length > 1) {
      featureTimeoutRef.current = setTimeout(nextFeature, FEATURE_SLIDE_DURATION);
    }
    return () => clearTimeout(featureTimeoutRef.current);
  }, [currentFeatureIndex, featuresData]);

  const selectFeature = (index) => {
    if (index === currentFeatureIndex) return;
    clearTimeout(featureTimeoutRef.current);
    setCurrentFeatureIndex(index);
  };

  if (!featuresData || featuresData.length === 0) {
    return <div className="features-section-container"><div className="features-slideshow-box">Loading features...</div></div>;
  }

  return (
    <div className="features-section-container">
      <div className="features-slideshow-wrapper">
        <div className="features-slideshow-box">
          {featuresData.map((feature, index) => (
            <div key={feature.id} className={`feature-slide ${index === currentFeatureIndex ? "active" : ""}`}>
              <img src={feature.image || "../../../assets/placeholders/feature.png"} alt={feature.title} className="feature-image" />
              <div className="feature-info">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
          {featuresData.length > 1 && (
            <div className="feature-progress-container">
              <div key={`progress-${currentFeatureIndex}`} className="feature-progress-bar" style={{ animationDuration: `${FEATURE_SLIDE_DURATION / 1000}s` }}></div>
            </div>
          )}
        </div>
      </div>

      {featuresData.length > 1 && (
        <div className="features-nav-controls">
          <ArrowButton onClick={previousFeature} direction="left" />
          <div className="feature-dots">
            {featuresData.map((_, index) => (
              <button key={`dot-${index}`} className={`dot ${index === currentFeatureIndex ? "active" : ""}`} onClick={() => selectFeature(index)} aria-label={`Go to feature ${index + 1}`} />
            ))}
          </div>
          <ArrowButton onClick={nextFeature} direction="right" />
        </div>
      )}
    </div>
  );
}

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