// src/pages/CharacterList/CharacterList.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// Data Imports
import { TIER_DATA } from "../../utils/tierData";

// Component and Hook Imports
import CharacterFilters from "./components/CharacterFilters/CharacterFilters";
import CharacterGrid from "./components/CharacterGrid/CharacterGrid";
import CharacterDetailModal from "./components/CharacterDetailModal/CharacterDetailModal";
import { useCharacterFilters } from "./hooks/useCharacterFilters";

// Shared Component Imports
import NavBar from "../../components/NavBar";
import MiniMediaLinks from "../../components/MiniMediaLinks";
import Footer from "../../components/Footer";

// CSS Imports
import "../../components/Default.css";
import "./CharacterList.css";

function CharacterList() {
    // --- State Management ---
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const location = useLocation();

    // Custom hook handles all filtering and sorting logic
    const {
        tierFilter,
        setTierFilter,
        sortAZ,
        isAnimating,
        characterList,
        handleSortToggle,
        handleClearFilters,
    } = useCharacterFilters();

    // --- Effects ---
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        if (selectedCharacter) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedCharacter]);

    // --- Event Handlers ---
    const handleCardClick = (character) => {
        setSelectedCharacter(character);
    };

    const closeModal = () => {
        setSelectedCharacter(null);
    };

    // Function to get list of characters the filter applies to.
    const getFilteredList = () => {
        // This function is still needed for modal navigation if filters are applied
        return characterList.filter((char) => {
            if (!tierFilter) return true;
            return TIER_DATA[char.tier]?.name === tierFilter.value;
        });
    };

    // Function to handle character navigation (next and previous arrow buttons)
    const handleNavigate = (direction) => {
        const visibleCharacters = getFilteredList();
        if (!selectedCharacter || visibleCharacters.length === 0) return;

        const currentIndex = visibleCharacters.findIndex(c => c.id === selectedCharacter.id);

        if (currentIndex === -1) {
            setSelectedCharacter(visibleCharacters[0] || null);
            return;
        }

        let newIndex;
        if (direction === "next") {
            newIndex = (currentIndex + 1) % visibleCharacters.length;
        } else {
            newIndex = (currentIndex - 1 + visibleCharacters.length) % visibleCharacters.length;
        }

        setSelectedCharacter(visibleCharacters[newIndex]);
    };

    return (
        <div className="page-container character-list-page">
            <header className="character-list-header">
                <NavBar />
                <MiniMediaLinks />
            </header>

            <main className="character-list-content">
                <div className="character-list-title-container">
                    <h1 className="character-list-title">Characters</h1>
                    <div className="title-divider"></div>
                </div>

                <div className="layout-container">
                    <aside className="filters-sidebar">
                        <CharacterFilters
                            tierFilter={tierFilter}
                            onTierChange={setTierFilter}
                            sortAZ={sortAZ}
                            onSortChange={handleSortToggle}
                            onClear={handleClearFilters}
                        />
                    </aside>

                    <div className="grid-content">
                        <CharacterGrid
                            characters={characterList}
                            isAnimating={isAnimating}
                            onCardClick={handleCardClick}
                        />
                    </div>
                </div>
            </main>

            {selectedCharacter && (
                <CharacterDetailModal
                    character={selectedCharacter}
                    onClose={closeModal}
                    onNavigateNext={() => handleNavigate("next")}
                    onNavigatePrevious={() => handleNavigate("prev")}
                />
            )}

            <Footer />
        </div>
    );
}

export default CharacterList;