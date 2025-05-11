// src/pages/Showcase/components/Story.jsx
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Story.scss"; // Import component-specific styles

function StorySection({ storyText }) {
  const storyScrollerRef = useRef(null);
  const [isStoryResetting, setIsStoryResetting] = useState(false);

  // Manages automatic scrolling and reset for the story section.
  useEffect(() => {
    const scroller = storyScrollerRef.current;
    if (!scroller) return;

    let scrollInterval;
    const scrollSpeed = 0.5;
    const scrollIntervalTime = 10; // Milliseconds between scroll steps

    // Prevents manual mouse wheel scrolling during auto-scroll.
    const handleWheel = (event) => {
      event.preventDefault();
    };

    const startScrolling = () => {
      if (isStoryResetting) return; // Don't scroll if currently resetting

      // Enable smooth scrolling for the auto-scroll
      scroller.style.scrollBehavior = "smooth";
      scroller.addEventListener("wheel", handleWheel, { passive: false });

      scrollInterval = setInterval(() => {
        if (
          scroller.scrollTop <
          scroller.scrollHeight - scroller.clientHeight - 1 // Check if not at bottom
        ) {
          scroller.scrollTop += scrollSpeed;
        } else {
          // Reached the end of the story text
          clearInterval(scrollInterval);
          setIsStoryResetting(true); // Initiate reset sequence
          setTimeout(() => {
            // Fade out
            if (storyScrollerRef.current) {
              storyScrollerRef.current.style.opacity = "0";
            }
            setTimeout(() => {
              // Disable smooth scrolling for the reset
              if (storyScrollerRef.current) {
                storyScrollerRef.current.style.scrollBehavior = "auto";
                storyScrollerRef.current.scrollTop = 0;
                storyScrollerRef.current.style.opacity = "1";

                // Small delay before re-enabling smooth scrolling for next cycle
                setTimeout(() => {
                  if (storyScrollerRef.current) {
                    storyScrollerRef.current.style.scrollBehavior = "smooth";
                  }
                }, 50);
              }
              setIsStoryResetting(false); // End reset sequence
            }, 500); // Duration of fade out
          }, 1000); // Pause at end before reset
        }
      }, scrollIntervalTime);
    };

    if (!isStoryResetting) {
      startScrolling(); // Start or resume scrolling
    }

    return () => {
      // Cleanup on component unmount or re-render
      clearInterval(scrollInterval);
      if (scroller) {
        scroller.removeEventListener("wheel", handleWheel);
      }
    };
  }, [isStoryResetting]); // Re-run effect if story reset state changes

  return (
    <div className="story-box">
      <div
        className="story-text-scroller"
        ref={storyScrollerRef}
        style={{ touchAction: "none" }} // Disable touch scroll for auto-scroll behavior
      >
        {storyText &&
          storyText.split("\n\n").map(
            (
              paragraph,
              index // Check if storyText exists
            ) => <p key={index}>{paragraph}</p>
          )}
      </div>
    </div>
  );
}

// PropTypes definition
StorySection.propTypes = {
  storyText: PropTypes.string.isRequired,
};

export default StorySection;
