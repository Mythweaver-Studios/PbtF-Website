// src/pages/CharacterList/CharacterList.jsx
import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { useLocation } from "react-router-dom";
import { charactersData } from "../Showcase/data/charactersData";
import CharacterGridCard from "./components/CharacterGridCard/CharacterGridCard";
import CharacterDetailModal from "./components/CharacterDetailModal/CharacterDetailModal";
import NavBar from "../../components/NavBar";
import MiniMediaLinks from "../../components/MiniMediaLinks";
import Footer from "../../components/Footer";
import "./CharacterList.css";
import { TIER_DATA } from "../../utils/tierData" // Import tier data

// Styling for custom tier filter dropdown
const customStyles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: 'var(--theme-bg-gradient)',
        border: '0.125rem solid var(--theme-border-gold)',
        color: 'var(--theme-text-primary)',
        fontWeight: 600,
        fontSize: '1rem',
        minWidth: '13rem', // Use min-width to allow expansion
        borderRadius: '0.5rem',
        padding: '0.25rem 1.25rem',
        cursor: 'pointer',
        boxShadow: state.isFocused ? '0 0 0.75rem rgba(255, 215, 0, 0.4)' : 'none',
        transition: 'all 0.2s ease',
        fontFamily: 'Georgia, serif',
        letterSpacing: '1px',

        '&:hover': {
            backgroundColor: "rgba(255, 215, 0, 0.2)",
            color: "var(--theme-text-primary)",
            boxShadow: "0 0 0.75rem rgba(255, 215, 0, 0.4)"
        },
    }),
    placeholder: (styles) => ({
        ...styles,
        color: "var(--theme-text-primary)",
    }),
    singleValue: (styles) => ({
        ...styles,
        color: "var(--theme-text-primary)",
    }),
    menu: (styles) => ({
        ...styles,
        backgroundColor: "#1e1e1e",
        border: "1px solid var(--theme-border-gold)",
        borderRadius: '0.25rem',
        zIndex: 100,
    }),
    menuList: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
    }),
    option: (styles, { data, isFocused }) => ({
        ...styles,
        backgroundColor: isFocused ? data.bgcolor || "rgba(255, 215, 0, 0.2)" : "#1e1e1e",
        backgroundImage: isFocused && data.value === "Empyrean" ? data.bgcolor : "none",
        color: isFocused ? data.color : "var(--theme-text-primary)",
        cursor: "pointer",
        fontFamily: "'Georgia', serif",
        letterSpacing: "1px",
        borderRadius: '0.125rem',
        padding: "0.5rem 1rem",
        transition: "background-color 0.2s ease",
    }),
    dropdownIndicator: (styles) => ({
        ...styles,
        color: 'var(--theme-text-primary)',
        padding: "0.5rem",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    input: (styles) => ({
        ...styles,
        color: 'var(--theme-text-primary)',
    }),
};


function CharacterList() {
    // --- Component State ---
    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [tierFilter, setTierFilter] = useState(null);
    const [sortAZ, setSortAZ] = useState(false);
    const [characterList, setCharacterList] = useState([]);
    const location = useLocation();

    // --- Effects ---
    // On mount, populate the character list with the base data
    useEffect(() => {
        setCharacterList(charactersData);
    }, []);

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
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedCharacter]);

    // Effect to handle character sorting when the sort button is toggled
    useEffect(() => {
        let charactersToDisplay = [...charactersData];
        if (sortAZ) {
            charactersToDisplay.sort((a, b) => a.name.localeCompare(b.name));
        }
        setCharacterList(charactersToDisplay);
    }, [sortAZ]);


    // --- Event Handlers ---
    const handleCardClick = (character) => {
        setSelectedCharacter(character);
    };

    const closeModal = () => {
        setSelectedCharacter(null);
    };

    const clearFilters = () => {
        setTierFilter(null);
        setSortAZ(false);
        setCharacterList([...charactersData]);
    };


    // --- Data Computations ---
    // Dynamically generate tier options ONLY for tiers that have characters
    const tierOptions = Object.entries(TIER_DATA)
        .filter(([key]) => {
            const tierNumber = Number(key);
            // Check if at least one character exists for this tier
            return charactersData.some((char) => char.tier === tierNumber);
        })
        .map(([, tierInfo]) => ({
            value: tierInfo.name,
            label: tierInfo.name,
            color: tierInfo.textColor,
            bgcolor: tierInfo.color || "#999",
        }));


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
                        <Select
                            value={tierFilter}
                            options={tierOptions}
                            onChange={setTierFilter}
                            styles={customStyles}
                            isSearchable={false}
                            isClearable={true}
                            placeholder="All Tiers"
                        />
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
                    {characterList.map((character) => {
                        // Determine the class based on the current filter
                        const isMatch = !tierFilter || TIER_DATA[character.tier]?.name === tierFilter.value;
                        const cardClassName = tierFilter ? (isMatch ? 'highlighted' : 'dimmed') : '';

                        return (
                            <CharacterGridCard
                                key={character.id}
                                character={character}
                                className={cardClassName}
                                onClick={() => isMatch ? handleCardClick(character) : null}
                            />
                        );
                    })}
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