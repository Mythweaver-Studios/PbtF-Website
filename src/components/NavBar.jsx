// src/components/NavBar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function NavBar() {
  const location = useLocation(); // To check current path for 'active' state of dropdown toggle

  // Function to determine className for NavLink (applies 'active' class)
  const getNavLinkClass = ({ isActive }) => 
    `nav-item ${isActive ? 'active' : ''}`;
  
  // Special class for the dropdown toggle NavLink
  const getDropdownToggleClass = ({ isActive }) => {
    let classes = "nav-item dropdown-toggle";
    if (isActive || location.pathname.startsWith('/showcase')) { // Also active if on any /showcase sub-path
      classes += " active";
    }
    return classes;
  };

  // Function to determine className for dropdown NavLink items
  const getDropdownItemClass = ({ isActive }) =>
    `dropdown-item ${isActive ? 'active' : ''}`;

  // Determine if any part of the showcase is active for the container
  const isShowcasePathActiveForContainer = location.pathname.startsWith('/showcase');

  return (
    <nav className="main-nav">
      <NavLink to="/" className={getNavLinkClass}>
        <span>Home</span>
      </NavLink>
      
      {/* Dropdown container - hover will control visibility via CSS */}
      <div className={`nav-item-dropdown-container ${isShowcasePathActiveForContainer ? 'has-active-path' : ''}`}>
        {/* Game Showcase toggle is now a NavLink */}
        <NavLink
          to="/showcase#story" // Links to the top/story section of the showcase page
          className={getDropdownToggleClass}
          aria-haspopup="true"
        >
          <span>Game Showcase</span>
          {/* Arrow indicator, rotates via CSS hover */}
          <span className="arrow-indicator">▼</span>
        </NavLink>
        
        {/* Dropdown menu - visibility controlled by CSS hover on parent */}
        <ul className="dropdown-menu">
          <li>
            <NavLink 
              to="/showcase#story" 
              className={getDropdownItemClass} 
            >
              Story
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/showcase#characters" 
              className={getDropdownItemClass} 
            >
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/showcase#features" 
              className={getDropdownItemClass} 
            >
              Features
            </NavLink>
          </li>
        </ul>
      </div>

      <NavLink to="/about" className={getNavLinkClass}>
        <span>About Us</span>
      </NavLink>
      <NavLink to="/updates" className={getNavLinkClass}>
        <span>Updates</span>
      </NavLink>
    </nav>
  );
}

export default NavBar;