// src/pages/CharacterList/hooks/useCharacterFilters.js
import { useState, useEffect, useCallback } from "react";
import { charactersData } from "../../Showcase/data/charactersData";
import { TIER_DATA } from "../../../utils/tierData";

/**
 * A custom hook to manage all state and logic for filtering and sorting characters.
 */
export function useCharacterFilters() {
    // --- State ---
    const [tierFilter, setTierFilter] = useState(null); // Now stores the react-select object
    const [sortAZ, setSortAZ] = useState(false);
    const [characterList, setCharacterList] = useState(charactersData);
    const [isAnimating, setIsAnimating] = useState(false);

    // Central effect to handle all filtering and sorting logic
    useEffect(() => {
        setIsAnimating(true); // Trigger fade-out animation on grid

        const animationTimeout = setTimeout(() => {
            let processedCharacters = [...charactersData];

            // Apply tier filter
            if (tierFilter && tierFilter.value) {
                processedCharacters = processedCharacters.filter(
                    (char) => TIER_DATA[char.tier]?.name === tierFilter.value
                );
            }

            // Apply sorting
            if (sortAZ) {
                processedCharacters.sort((a, b) => a.name.localeCompare(b.name));
            }

            setCharacterList(processedCharacters);
            setIsAnimating(false); // Trigger fade-in animation
        }, 300); // Duration must match CSS transition

        return () => clearTimeout(animationTimeout);
    }, [tierFilter, sortAZ]);


    const handleSortToggle = useCallback(() => {
        setSortAZ(prev => !prev);
    }, []);

    const handleClearFilters = useCallback(() => {
        setTierFilter(null);
        setSortAZ(false);
    }, []);

    return {
        tierFilter,
        setTierFilter, // Pass the setter directly to the component
        sortAZ,
        isAnimating,
        characterList,
        handleSortToggle,
        handleClearFilters,
    };
}