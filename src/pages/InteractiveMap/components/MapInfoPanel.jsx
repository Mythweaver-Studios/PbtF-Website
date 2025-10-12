import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import './MapInfoPanel.css';

const panelVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 120, damping: 20 } },
    exit: { x: '100%', opacity: 0, transition: { duration: 0.2 } },
};

function MapInfoPanel({ region, onClose }) {
    if (!region) return null;

    // The lore text from the PM uses "/" as a separator for what seems to be paragraphs.
    const loreParagraphs = region.lore.split('/').map(p => p.trim()).filter(p => p.length > 0);

    return (
        <motion.div
            className="map-info-panel"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="info-panel-header">
                <h2 className="info-panel-title">{region.name}</h2>
                <button onClick={onClose} className="info-panel-close-btn" aria-label="Close panel">&times;</button>
            </div>
            <div className="info-panel-body">
                {loreParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </motion.div>
    );
}

MapInfoPanel.propTypes = {
    region: PropTypes.shape({
        name: PropTypes.string.isRequired,
        lore: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
};

export default MapInfoPanel;