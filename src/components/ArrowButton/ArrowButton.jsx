// src/components/ArrowButton/ArrowButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import LeftArrowIcon from '../../assets/icons/Left-Arrow.svg';
import RightArrowIcon from '../../assets/icons/Right-Arrow.svg';
import './ArrowButton.css';

function ArrowButton({ onClick, direction }) {
  return (
    <button
      className="arrow-button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
    >
      <img src={direction === 'left' ? LeftArrowIcon : RightArrowIcon} alt={`${direction} arrow`} />
    </button>
  );
}

ArrowButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default ArrowButton;