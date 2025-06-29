// src/pages/CharacterList/CharacterList.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { charactersData } from "../Showcase/data/charactersData";
import CharacterGridCard from "./components/CharacterGridCard";
import CharacterDetailModal from "./components/CharacterDetailModal";
import NavBar from "../../components/NavBar";
import MiniMediaLinks from "../../components/MiniMediaLinks";
import Footer from "../../components/Footer";
import "./CharacterList.css";
import { TIER_DATA } from "../../utils/tierData" // Import tier data


function CharacterList() {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [tier, setTier] = useState("");
    const [sortAZ, setSortAZ] = useState(false);
    const [filteredCharacters, setFilteredCharacters] = useState([]);
    const location = useLocation();

    // Effect to scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
        console.log(charactersData)

    }, [location]);

    // Effect to handle body scroll lock when modal is open
    useEffect(() => {
        if (selectedCharacter) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        // Cleanup function
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedCharacter]);

    // Effect to handle character filtering
    useEffect(() => {
        let updatedCharacters = [...charactersData]
        
        // Updating character list to match selected tier
        if (tier) {
            updatedCharacters = updatedCharacters.filter((char) => TIER_DATA[char.tier]?.name === tier);
        }

        // Sorting alphabetically
        if (sortAZ){
            updatedCharacters = updatedCharacters.sort((a, b) => a.name.localeCompare(b.name));
        }

        setFilteredCharacters(updatedCharacters);
    }, [tier, sortAZ]);

    const handleCardClick = (character) => {
        setSelectedCharacter(character);
    };

    const closeModal = () => {
        setSelectedCharacter(null);
    };

    // Setting tier filter state
    const handleTierChange = (e) => {
        setTier(e.target.value)
    };

    const clearFilters = () => {
        setTier("");
        setSortAZ(false);
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

                <div className="character-filters">
                    <div className="left-filters">
                        <select onChange={handleTierChange} className="tier-filter" value={tier}>
                            <option value="">All Tiers</option>
                            <option value="Common">Common</option>
                            <option value="Uncommon">Uncommon</option>
                            <option value="Rare">Rare</option>
                            <option value="Epic">Epic</option>
                            <option value="Legendary">Legendary</option>
                            <option value="Mythic">Mythic</option>
                            <option value="Empyrean">Empyrean</option>               
                        </select>

                        <button
                            onClick={() => setSortAZ(!sortAZ)}
                            className={`name-filter ${sortAZ ? "active" : ""}`}
                        >
                            Sort Alphabetically
                        </button>
                    </div>

                    <button
                        onClick={clearFilters}
                        className="clear-filters"
                    >
                        Clear Filters
                    </button>
                </div>

                <div className="character-grid">
                    {filteredCharacters.map((character) => (
                        <CharacterGridCard
                            key={character.id}
                            character={character}
                            onClick={() => handleCardClick(character)}
                        />
                    ))}
                </div>
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