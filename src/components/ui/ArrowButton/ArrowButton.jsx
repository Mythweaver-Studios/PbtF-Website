import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import LeftArrowIcon from '../../../assets/icons/Left-Arrow.svg';
import RightArrowIcon from '../../../assets/icons/Right-Arrow.svg';
import './ArrowButton.css';

function ArrowButton({ onClick, direction }) {
  return (
    <motion.button
      className="arrow-button"
      onClick={onClick}
      aria-label={direction === 'left' ? 'Previous' : 'Next'}
      whileTap={{ scale: 0.90 }}
      transition={{ duration: 0.1 }}
    >
      <img src={direction === 'left' ? LeftArrowIcon : RightArrowIcon} alt={`${direction} arrow`} />
    </motion.button>
  );
}

ArrowButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
};

export default ArrowButton;