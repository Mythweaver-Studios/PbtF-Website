// src/components/NavBar.jsx
import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css"; // Import NavBar specific styles

// Add onShowcaseLinkClick to props, make it optional
function NavBar({ onShowcaseLinkClick }) {
  const location = useLocation();

  // Determines class names for NavLink based on active state.
  const getNavLinkClass = ({ isActive }) =>
    `nav-item ${isActive ? "active" : ""}`;

  // Determines class names for the dropdown toggle, considering active state and current path.
  const getDropdownToggleClass = ({ isActive }) => {
    let classes = "nav-item dropdown-toggle";
    // Check if the base path is active or if current location is related to showcase
    if (
      isActive ||
      location.pathname === "/showcase" ||
      location.pathname.startsWith("/showcase#")
    ) {
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
      <NavLink to="/" className={getNavLinkClass}>
        <span>Main</span>
      </NavLink>

      <div
        className={`nav-item-dropdown-container ${
          isCurrentlyOnShowcasePage ? "has-active-path" : ""
        }`}
      >
        <NavLink
          to="/showcase#story" // Default to #story section
          className={getDropdownToggleClass}
          aria-haspopup="true"
          onClick={(e) =>
            isCurrentlyOnShowcasePage &&
            onShowcaseLinkClick &&
            onShowcaseLinkClick(e, "story")
          }
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
              onClick={(e) =>
                isCurrentlyOnShowcasePage &&
                onShowcaseLinkClick &&
                onShowcaseLinkClick(e, "story")
              }
            >
              Story
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/showcase#characters"
              className={getDropdownItemClass}
              end
              onClick={(e) =>
                isCurrentlyOnShowcasePage &&
                onShowcaseLinkClick &&
                onShowcaseLinkClick(e, "characters")
              }
            >
              Characters
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/showcase#features"
              className={getDropdownItemClass}
              end
              onClick={(e) =>
                isCurrentlyOnShowcasePage &&
                onShowcaseLinkClick &&
                onShowcaseLinkClick(e, "features")
              }
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

// Define prop types for the component
NavBar.propTypes = {
  onShowcaseLinkClick: PropTypes.func, // onShowcaseLinkClick is an optional function
};

export default NavBar;