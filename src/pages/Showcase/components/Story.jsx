// src/pages/Showcase/components/Story.jsx
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Story.scss"; // Import component-specific styles

const SCROLL_SPEED = 0.5; // Pixels per interval
const SCROLL_INTERVAL_TIME = 30; // Milliseconds
const INITIAL_SCROLL_DELAY = 7500; // Milliseconds before scrolling starts
const END_PAUSE_DURATION = 3000; // Milliseconds to pause at the end before resetting
const FADE_DURATION = 500; // Milliseconds for fade out/in effect
const RESET_SMOOTH_SCROLL_DELAY = 50; // Milliseconds delay before re-enabling smooth scroll

function StorySection({ storyText }) {
  const storyScrollerRef = useRef(null);
  const [isStoryResetting, setIsStoryResetting] = useState(false);
  const isMountedRef = useRef(false); // Tracks mount status for async operations

  // Effect to track component mount status.
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Effect for persistent scroll prevention listeners.
  useEffect(() => {
    const scroller = storyScrollerRef.current;
    if (!scroller) return;

    // Prevents manual mouse wheel scrolling.
    const handleWheel = (event) => {
      event.preventDefault();
    };

    // Prevents manual touch scrolling (e.g., swiping).
    const handleTouchMove = (event) => {
      event.preventDefault();
    };

    // Prevents middle-click "automatic scrolling".
    const handleMouseDown = (event) => {
      if (event.button === 1) {
        // Middle mouse button
        event.preventDefault();
      }
    };

    scroller.addEventListener("wheel", handleWheel, { passive: false });
    scroller.addEventListener("touchmove", handleTouchMove, { passive: false });
    scroller.addEventListener("mousedown", handleMouseDown, { passive: false });

    return () => {
      // Check scroller again in cleanup, as it might have been set to null.
      if (storyScrollerRef.current) {
        storyScrollerRef.current.removeEventListener("wheel", handleWheel);
        storyScrollerRef.current.removeEventListener(
          "touchmove",
          handleTouchMove
        );
        storyScrollerRef.current.removeEventListener(
          "mousedown",
          handleMouseDown
        );
      }
    };
  }, []); // Runs once on mount, cleans up on unmount.

  // Effect for managing automatic scrolling and reset logic.
  useEffect(() => {
    const scroller = storyScrollerRef.current;
    if (!scroller) return;

    let scrollIntervalId; // Interval ID for the auto-scrolling mechanism.
    let initialScrollDelayTimeoutId; // Timeout ID for delaying the start of scrolling.
    let resetFadeOutTimeoutId, resetScrollTopTimeoutId, resetFadeInTimeoutId; // Timeout IDs for reset sequence.

    if (!isStoryResetting) {
      scroller.style.scrollBehavior = "smooth"; // Ensure smooth scrolling for auto-scroll.

      initialScrollDelayTimeoutId = setTimeout(() => {
        if (!isMountedRef.current) return; // Guard against updates if unmounted.

        scrollIntervalId = setInterval(() => {
          if (!isMountedRef.current) {
            clearInterval(scrollIntervalId);
            return;
          }
          // Check if scroll position is near the bottom.
          if (
            scroller.scrollTop <
            scroller.scrollHeight - scroller.clientHeight - 1
          ) {
            scroller.scrollTop += SCROLL_SPEED;
          } else {
            // Reached end, initiate reset.
            clearInterval(scrollIntervalId);
            if (isMountedRef.current) {
              setIsStoryResetting(true);
            }
          }
        }, SCROLL_INTERVAL_TIME);
      }, INITIAL_SCROLL_DELAY);
    } else {
      // isStoryResetting is true: handle the reset animation and state changes.
      resetFadeOutTimeoutId = setTimeout(() => {
        if (!isMountedRef.current || !storyScrollerRef.current) return;
        storyScrollerRef.current.style.opacity = "0"; // Start fade out.

        resetScrollTopTimeoutId = setTimeout(() => {
          if (!isMountedRef.current || !storyScrollerRef.current) return;
          storyScrollerRef.current.style.scrollBehavior = "auto"; // Instant scroll to top.
          storyScrollerRef.current.scrollTop = 0;
          storyScrollerRef.current.style.opacity = "1"; // Start fade in.

          resetFadeInTimeoutId = setTimeout(() => {
            if (!isMountedRef.current || !storyScrollerRef.current) return;
            storyScrollerRef.current.style.scrollBehavior = "smooth"; // Re-enable smooth scroll.
            if (isMountedRef.current) {
              setIsStoryResetting(false); // End reset, allows scrolling to start again.
            }
          }, RESET_SMOOTH_SCROLL_DELAY);
        }, FADE_DURATION); // Duration of fade out.
      }, END_PAUSE_DURATION); // Pause at end before reset.
    }

    return () => {
      // Cleanup for this effect.
      clearTimeout(initialScrollDelayTimeoutId);
      clearInterval(scrollIntervalId);
      clearTimeout(resetFadeOutTimeoutId);
      clearTimeout(resetScrollTopTimeoutId);
      clearTimeout(resetFadeInTimeoutId);
    };
  }, [isStoryResetting]); // Re-run effect if isStoryResetting changes.

  return (
    <div className="story-box">
      <div
        className="story-text-scroller"
        ref={storyScrollerRef}
        style={{ touchAction: "none" }} // Disables default touch scroll behavior.
      >
        {storyText &&
          storyText.split("\n\n").map(
            (
              paragraph,
              index // Render paragraphs if storyText exists.
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
