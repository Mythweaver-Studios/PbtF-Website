import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import useOnClickOutside from '../../../hooks/useOnClickOutside';
import './Dropdown.css';

const menuVariants = {
    hidden: {
        opacity: 0,
        y: -10,
        scale: 0.95,
        transition: {
            duration: 0.2,
            ease: 'easeOut',
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.2,
            ease: 'easeIn',
        },
    },
};

function Dropdown({ trigger, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    // Use the custom hook to close the dropdown when clicking outside
    useOnClickOutside(dropdownRef, () => setIsOpen(false));

    return (
        <div ref={dropdownRef} className="dropdown-container">
            <div className="dropdown-trigger" onClick={toggleDropdown} role="button" tabIndex={0} onKeyDown={toggleDropdown}>
                {trigger}
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="dropdown-menu"
                        variants={menuVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

Dropdown.propTypes = {
    trigger: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
};

export default Dropdown;