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

function CharacterList() {
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const location = useLocation();

    // Effect to scroll to top on page load
    useEffect(() => {
        window.scrollTo(0, 0);
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

                <div className="character-grid">
                    {charactersData.map((character) => (
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