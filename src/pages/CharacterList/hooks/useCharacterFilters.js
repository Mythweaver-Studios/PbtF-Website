// src/pages/CharacterList/hooks/useCharacterFilters.js
import { useState, useEffect } from "react";
import { charactersData } from "../../Showcase/data/charactersData";

/**
 * A custom hook to manage all state and logic for filtering and sorting characters.
 */
export function useCharacterFilters() {
    const [tierFilter, setTierFilter] = useState(null);
    const [sortAZ, setSortAZ] = useState(false);
    const [characterList, setCharacterList] = useState([]);

    // Initialize character list on first load
    useEffect(() => {
        setCharacterList(charactersData);
    }, []);

    // Effect to handle character sorting when the sort button is toggled
    useEffect(() => {
        let charactersToDisplay = [...charactersData];
        if (sortAZ) {
            charactersToDisplay.sort((a, b) => a.name.localeCompare(b.name));
        }
        setCharacterList(charactersToDisplay);
    }, [sortAZ]);

    const clearFilters = () => {
        setTierFilter(null);
        setSortAZ(false);
        setCharacterList([...charactersData]);
    };

    return {
        tierFilter,
        setTierFilter,
        sortAZ,
        setSortAZ,
        characterList,
        clearFilters,
    };
}