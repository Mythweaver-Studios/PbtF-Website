import React from 'react';
import PropTypes from 'prop-types';
import './MapMarker.css';

function MapMarker({ region, onClick, isActive }) {
    return (
        <div
            id={`marker-${region.id}`}
            className={`map-marker ${isActive ? 'active' : ''}`}
            style={{ top: region.coords.top, left: region.coords.left }}
            onClick={() => onClick(region)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && onClick(region)}
        >
            <div className="marker-pulse"></div>
            <div className="marker-dot"></div>
            <span className="marker-label">{region.name}</span>
        </div>
    );
}

MapMarker.propTypes = {
    region: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        coords: PropTypes.shape({
            top: PropTypes.string.isRequired,
            left: PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    isActive: PropTypes.bool.isRequired,
};

export default MapMarker;