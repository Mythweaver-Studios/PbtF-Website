// src/hooks/useBreakpoint.js
import { useState, useEffect } from 'react';

const breakpoints = {
    isMobile: '(max-width: 768px)',
    isTablet: '(max-width: 992px)',
};

/**
 * A custom hook to track viewport breakpoints.
 * @returns {object} An object with boolean flags e.g., { isMobile: true, isTablet: true, isDesktop: false }.
 */
function useBreakpoint() {
    const [breakpoint, setBreakpoint] = useState({});

    useEffect(() => {
        const handleResize = () => {
            const newBreakpointState = {
                isMobile: window.matchMedia(breakpoints.isMobile).matches,
                isTablet: window.matchMedia(breakpoints.isTablet).matches,
                isDesktop: !window.matchMedia(breakpoints.isTablet).matches,
            };
            setBreakpoint(newBreakpointState);
        };

        // Initial check
        handleResize();

        // Add listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return breakpoint;
}

export default useBreakpoint;