// src/pages/Showcase/components/Story.jsx
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Story.css"; // Import component-specific styles

const SCROLL_SPEED = 30; // Pixels per second
const INITIAL_SCROLL_DELAY = 2500; // 2.5 seconds
const END_PAUSE_DURATION = 3000; // 3 seconds
const FADE_DURATION = 500; // 0.5 seconds

function StorySection({ storyText }) {
    const scrollerRef = useRef(null);
    const animationFrameId = useRef(null);
    const timeoutId = useRef(null);
    const lastTimestamp = useRef(0);

    // This is the core animation loop, driven by requestAnimationFrame
    const animateScroll = (timestamp) => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        // Initialize timestamp on the first frame
        if (lastTimestamp.current === 0) {
            lastTimestamp.current = timestamp;
        }

        // Calculate time elapsed and corresponding scroll distance
        const elapsed = timestamp - lastTimestamp.current;
        const scrollAmount = (SCROLL_SPEED * elapsed) / 1000;

        scroller.scrollTop += scrollAmount;
        lastTimestamp.current = timestamp;

        // Continue animation if not at the end, otherwise start the reset process
        if (scroller.scrollTop < scroller.scrollHeight - scroller.clientHeight) {
            animationFrameId.current = requestAnimationFrame(animateScroll);
        } else {
            resetAnimation();
        }
    };

    // This function handles the fade-out, reset, and restart sequence
    const resetAnimation = () => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        // 1. Pause at the end before doing anything
        timeoutId.current = setTimeout(() => {
            // 2. Fade out the text
            scroller.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
            scroller.style.opacity = "0";

            // 3. After the fade-out completes, reset scroll position and opacity
            timeoutId.current = setTimeout(() => {
                scroller.scrollTop = 0;
                scroller.style.transition = "none"; // Disable transition for instant opacity change
                scroller.style.opacity = "1";

                // 4. Restart the entire animation cycle from the beginning
                startAnimationCycle();
            }, FADE_DURATION);
        }, END_PAUSE_DURATION);
    };

    // This function intelligently starts the animation cycle
    const startAnimationCycle = () => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        // Reset timestamp for the new animation cycle
        lastTimestamp.current = 0;

        const attemptToStart = () => {
            // *** THE CORE FIX ***
            // Check if the content is actually scrollable. If not, wait and try again.
            // This prevents the race condition where the animation starts before layout is complete.
            if (scroller.scrollHeight > scroller.clientHeight) {
                // Content is ready, wait for the initial delay then start the animation loop
                timeoutId.current = setTimeout(() => {
                    animationFrameId.current = requestAnimationFrame(animateScroll);
                }, INITIAL_SCROLL_DELAY);
            } else {
                // Content not yet rendered to full height, poll again shortly
                timeoutId.current = setTimeout(attemptToStart, 100);
            }
        };

        attemptToStart();
    };

    // Main effect hook to manage the entire component lifecycle
    useEffect(() => {
        const scroller = scrollerRef.current;
        // Add event listeners to prevent manual scrolling
        const preventDefault = (e) => e.preventDefault();
        if (scroller) {
            scroller.addEventListener("wheel", preventDefault, { passive: false });
            scroller.addEventListener("touchmove", preventDefault, { passive: false });
        }

        // Kick off the animation process
        startAnimationCycle();

        // Cleanup function: cancel all timers and animations on unmount
        return () => {
            cancelAnimationFrame(animationFrameId.current);
            clearTimeout(timeoutId.current);
            if (scroller) {
                scroller.removeEventListener("wheel", preventDefault);
                scroller.removeEventListener("touchmove", preventDefault);
            }
        };
    }, [storyText]); // Dependency array ensures this runs once on mount (or if text changes)

    return (
        <div className="story-box">
            <div
                className="story-text-scroller"
                ref={scrollerRef}
                style={{ touchAction: "none" }}
            >
                {storyText &&
                    storyText.split("\n\n").map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
            </div>
        </div>
    );
}

StorySection.propTypes = {
    storyText: PropTypes.string.isRequired,
};

export default StorySection;