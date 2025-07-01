// src/pages/CharacterList/hooks/useCharacterFilters.js
import { useState, useEffect, useCallback } from "react";
import { charactersData } from "../../Showcase/data/charactersData";

/**
 * A custom hook to manage all state and logic for filtering and sorting characters.
 */
export function useCharacterFilters() {
    // --- State ---
    const [tierFilter, setTierFilter] = useState(null);
    const [sortAZ, setSortAZ] = useState(false);
    const [characterList, setCharacterList] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false); // State to control animation

    // --- Effects ---
    // Initialize character list on first load
    useEffect(() => {
        setCharacterList(charactersData);
    }, []);

    // --- Handlers with Animation Logic ---
    const triggerAnimation = (callback) => {
        setIsAnimating(true); // Start fade-out
        setTimeout(() => {
            callback(); // Perform the state change after fade-out
            setIsAnimating(false); // Start fade-in
        }, 300); // This duration must match the CSS transition duration
    };

    const handleSortToggle = useCallback(() => {
        triggerAnimation(() => {
            const newSortState = !sortAZ;
            setSortAZ(newSortState);
            let charactersToDisplay = [...charactersData];
            if (newSortState) {
                charactersToDisplay.sort((a, b) => a.name.localeCompare(b.name));
            }
            setCharacterList(charactersToDisplay);
        });
    }, [sortAZ]);

    const handleClearFilters = useCallback(() => {
        triggerAnimation(() => {
            setTierFilter(null);
            setSortAZ(false);
            setCharacterList([...charactersData]);
        });
    }, []);

    return {
        tierFilter,
        setTierFilter,
        sortAZ,
        isAnimating,
        characterList,
        handleSortToggle,
        handleClearFilters,
    };
}