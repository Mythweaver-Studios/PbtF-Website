import React from "react";
import PropTypes from "prop-types";
import "./CharacterModal.scss";

const CharacterModal = ({
    characterData = {}
}) => {

    return (
        <div className="character-modal flex-column">
            <div className="character-display">
                <img
                    src={
                        characterData.image ||
                        "../../../assets/placeholders/character_large.png" // Fallback image
                    }
                    alt={characterData.name}
                    className="character-main-image"
                />
                <div className="character-info flex-column">
                      <h3>{characterData.name}</h3>
                      <h4>{characterData.title}</h4>
                      <p>{characterData.description}</p>
                </div>
            </div>
        </div>
    );
}

CharacterModal.propTypes = {
    characterData: PropTypes.shape({
        image: PropTypes.string,
        name: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
    }),
};

export default CharacterModal;