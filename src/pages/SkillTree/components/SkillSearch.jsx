import React from 'react';
import PropTypes from 'prop-types';
import './SkillSearch.css';

function SkillSearch({ searchTerm, setSearchTerm }) {
    return (
        <div className="skill-search-container">
            <input
                type="text"
                placeholder="Search for a skill..."
                className="skill-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}

SkillSearch.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired,
};

export default SkillSearch;