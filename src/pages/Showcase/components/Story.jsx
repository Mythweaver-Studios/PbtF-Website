// src/pages/Showcase/components/Story.jsx
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./Story.css"; // Import component-specific styles

const SCROLL_SPEED = 0.5; // Pixels to scroll per interval
const SCROLL_INTERVAL_TIME = 30; // Milliseconds between intervals
const INITIAL_SCROLL_DELAY = 2500; // 2.5 seconds
const END_PAUSE_DURATION = 3000; // 3 seconds
const FADE_DURATION = 500; // 0.5 seconds

function StorySection({ storyText }) {
    const scrollerRef = useRef(null);
    // Use a single ref to hold all timer IDs for easy cleanup
    const timers = useRef({
        initial: null,
        scroll: null,
        reset: null,
        fade: null,
    });

    // This function handles the fade-out, reset, and restart sequence
    const resetAnimation = () => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        // 1. Pause at the end before doing anything
        timers.current.reset = setTimeout(() => {
            // 2. Fade out the text
            scroller.style.transition = `opacity ${FADE_DURATION}ms ease-in-out`;
            scroller.style.opacity = "0";

            // 3. After fade-out, reset scroll position and opacity, then restart
            timers.current.fade = setTimeout(() => {
                scroller.scrollTop = 0;
                scroller.style.transition = "none"; // Disable transition for instant opacity change
                scroller.style.opacity = "1";

                // 4. Restart the entire animation cycle from the beginning
                // eslint-disable-next-line no-use-before-define
                startAnimationCycle();
            }, FADE_DURATION);
        }, END_PAUSE_DURATION);
    };

    // This function intelligently starts the animation cycle
    const startAnimationCycle = () => {
        const scroller = scrollerRef.current;
        if (!scroller) return;

        const attemptToStart = () => {
            // Check if the content is scrollable before starting.
            // This prevents a race condition on initial render.
            if (scroller.scrollHeight > scroller.clientHeight) {
                // Content is ready, wait for the initial delay then start the scroll interval
                timers.current.initial = setTimeout(() => {
                    timers.current.scroll = setInterval(() => {
                        if (scroller.scrollTop < scroller.scrollHeight - scroller.clientHeight - 1) {
                            scroller.scrollTop += SCROLL_SPEED;
                        } else {
                            // Reached the end, clear interval and start the reset process
                            clearInterval(timers.current.scroll);
                            resetAnimation();
                        }
                    }, SCROLL_INTERVAL_TIME);
                }, INITIAL_SCROLL_DELAY);
            } else {
                // Content not yet fully rendered, poll again shortly
                timers.current.initial = setTimeout(attemptToStart, 100);
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

        // Cleanup function: cancel all timers on unmount
        return () => {
            clearTimeout(timers.current.initial);
            clearInterval(timers.current.scroll);
            clearTimeout(timers.current.reset);
            clearTimeout(timers.current.fade);
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