// src/pages/CharacterList/CharacterList.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// New Component Imports
import CharacterFilters from "./components/CharacterFilters/CharacterFilters";
import CharacterGrid from "./components/CharacterGrid/CharacterGrid";
import CharacterDetailModal from "./components/CharacterDetailModal/CharacterDetailModal";

// Custom Hook for Logic
import { useCharacterFilters } from "./hooks/useCharacterFilters";

// Shared Component Imports
import NavBar from "../../components/NavBar";
import MiniMediaLinks from "../../components/MiniMediaLinks";
import Footer from "../../components/Footer";

// CSS Imports
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
        setSortAZ,
        characterList,
        clearFilters,
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

                <CharacterFilters
                    tierFilter={tierFilter}
                    onTierChange={setTierFilter}
                    sortAZ={sortAZ}
                    onSortChange={setSortAZ}
                    onClear={clearFilters}
                />

                <CharacterGrid
                    characters={characterList}
                    tierFilter={tierFilter}
                    onCardClick={handleCardClick}
                    onClearFilters={clearFilters}
                />
            </main>

            {selectedCharacter && (
                <CharacterDetailModal
                    character={selectedCharacter}
                    onClose={closeModal}
                />
            )}

            <Footer />
        </div>
    );
}

export default CharacterList;