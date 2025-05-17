// src/components/NavBar.jsx
import React from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";

// onShowcaseLinkClick is an optional prop for handling showcase section navigation
function NavBar({ onShowcaseLinkClick }) {
  const location = useLocation();

  // Determines class names for NavLink based on active state.
  // For "Main", it's active if current path is exactly "/home" or starts with "/home#"
  const getMainNavLinkClass = ({ isActive }) => {
    let classes = "nav-item";
    if (isActive || location.pathname.startsWith("/home#")) {
      classes += " active";
    }
    return classes;
  };
  
  // General active class for other NavLinks
  const getNavLinkClass = ({ isActive }) =>
    `nav-item ${isActive ? "active" : ""}`;


  // Determines class names for the dropdown toggle.
  // Active if current path is /showcase or any /showcase#section.
  const getDropdownToggleClass = ({ isActive }) => { // isActive is true if current path is exactly "/showcase"
    let classes = "nav-item dropdown-toggle";
    // Check if the base path is active or if current location is related to showcase
    if (isActive || location.pathname.startsWith("/showcase#")) {
      classes += " active";
    }
    return classes;
  };

  // Determines class names for dropdown items, including active and pending states.
  const getDropdownItemClass = ({ isActive, isPending }) => {
    return `dropdown-item ${isActive ? "active" : ""} ${
      isPending ? "pending" : ""
    }`;
  };

  // Checks if the current page is the showcase page or one of its sections.
  const isCurrentlyOnShowcasePage = location.pathname.startsWith("/showcase");

  return (
    <nav className="main-nav">
      <NavLink to="/home" className={getMainNavLinkClass} end> {/* Use end for stricter matching for /home */}
        <span>Main</span>
      </NavLink>

      <div
        className={`nav-item-dropdown-container ${
          isCurrentlyOnShowcasePage ? "has-active-path" : ""
        }`}
      >
        <NavLink
          to="/showcase" // Link to the base showcase page
          className={getDropdownToggleClass}
          aria-haspopup="true"
          onClick={(e) => {
            if (isCurrentlyOnShowcasePage && onShowcaseLinkClick) {
              onShowcaseLinkClick(e, "story"); // Default to story section if already on showcase page
            }
            // Otherwise, NavLink default navigation to '/showcase' occurs.
          }}
        >
          <span>Game Showcase</span>
          <span className="arrow-indicator">▼</span>
        </NavLink>

        <ul className="dropdown-menu">
          <li>
            <NavLink
              to="/showcase#story"
              className={getDropdownItemClass}
              end
              onClick={(e) => {
                if (isCurrentlyOnShowcasePage && onShowcaseLinkClick) {
                  onShowcaseLinkClick(e, "story");
                }
              }}
            >
              Story
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/showcase#characters"
              className={getDropdownItemClass}
              end
              onClick={(e) => {
                if (isCurrentlyOnShowcasePage && onShowcaseLinkClick) {
                  onShowcaseLinkClick(e, "characters");
                }
              }}
            >
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/showcase#features"
              className={getDropdownItemClass}
              end
              onClick={(e) => {
                if (isCurrentlyOnShowcasePage && onShowcaseLinkClick) {
                  onShowcaseLinkClick(e, "features");
                }
              }}
            >
              Features
            </NavLink>
          </li>
        </ul>
      </div>

      <NavLink to="/about-us" className={getNavLinkClass}>
        <span>About Us</span>
      </NavLink>
      <NavLink to="/news" className={getNavLinkClass}> {/* Points to /news */}
        <span>News</span>
      </NavLink>
    </nav>
  );
}

// Define prop types for the component
NavBar.propTypes = {
  onShowcaseLinkClick: PropTypes.func,
};

export default NavBar;