// src/pages/CharacterList/components/CharacterFilters/CharacterFilters.jsx
import React from "react";
import Select from 'react-select';
import PropTypes from 'prop-types';
import './CharacterFilters.css';
import { TIER_DATA } from "../../../../utils/tierData";
import { charactersData } from "../../../Showcase/data/charactersData";

// Styling for custom tier filter dropdown
const customStyles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: 'var(--theme-bg-gradient)',
        border: '0.125rem solid var(--theme-border-gold)',
        color: 'var(--theme-text-primary)',
        fontWeight: 600,
        fontSize: '1rem',
        minWidth: '13rem',
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
    placeholder: (styles) => ({ ...styles, color: "var(--theme-text-primary)" }),
    singleValue: (styles) => ({ ...styles, color: "var(--theme-text-primary)" }),
    menu: (styles) => ({
        ...styles,
        backgroundColor: "#1e1e1e",
        border: "1px solid var(--theme-border-gold)",
        borderRadius: '0.25rem',
        zIndex: 100,
    }),
    menuList: (base) => ({ ...base, paddingTop: 0, paddingBottom: 0 }),
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
    dropdownIndicator: (styles) => ({ ...styles, color: 'var(--theme-text-primary)', padding: "0.5rem" }),
    indicatorSeparator: () => ({ display: "none" }),
    input: (styles) => ({ ...styles, color: 'var(--theme-text-primary)' }),
};

function CharacterFilters({ tierFilter, onTierChange, sortAZ, onSortChange, onClear }) {
    // Dynamically generate tier options ONLY for tiers that have characters
    const tierOptions = Object.entries(TIER_DATA)
        .filter(([key]) => {
            const tierNumber = Number(key);
            return charactersData.some((char) => char.tier === tierNumber);
        })
        .map(([, tierInfo]) => ({
            value: tierInfo.name,
            label: tierInfo.name,
            color: tierInfo.textColor,
            bgcolor: tierInfo.color || "#999",
        }));

    return (
        <div className="character-filters">
            <div className="left-filters">
                <Select
                    value={tierFilter}
                    options={tierOptions}
                    onChange={onTierChange}
                    styles={customStyles}
                    isSearchable={false}
                    isClearable={true}
                    placeholder="All Tiers"
                />
                <button
                    onClick={() => onSortChange(!sortAZ)}
                    className={`name-filter ${sortAZ ? "active" : ""}`}
                >
                    Sort Alphabetically
                </button>
            </div>
            <button
                onClick={onClear}
                className="clear-filters"
            >
                Clear Filters
            </button>
        </div>
    );
}

CharacterFilters.propTypes = {
    tierFilter: PropTypes.object,
    onTierChange: PropTypes.func.isRequired,
    sortAZ: PropTypes.bool.isRequired,
    onSortChange: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
};

export default CharacterFilters;