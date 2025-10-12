import React from 'react';
import PropTypes from 'prop-types';
import './MapControls.css';

function MapControls({ regions, onRegionSelect, activeRegionId }) {
    return (
        <div className="map-controls-panel">
            <h3 className="map-controls-title">Regions</h3>
            <ul className="map-controls-list">
                {regions.map(region => (
                    <li key={region.id}>
                        <button
                            className={`map-control-button ${activeRegionId === region.id ? 'active' : ''}`}
                            onClick={() => onRegionSelect(region.id)}
                        >
                            {region.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

MapControls.propTypes = {
    regions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
    })).isRequired,
    onRegionSelect: PropTypes.func.isRequired,
    activeRegionId: PropTypes.string,
};

export default MapControls;