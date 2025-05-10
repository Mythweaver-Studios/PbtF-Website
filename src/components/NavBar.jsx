// src/components/NavBar.jsx
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css"; // Import NavBar specific styles

// Add onShowcaseLinkClick to props, make it optional
function NavBar({ onShowcaseLinkClick }) {
  const location = useLocation();

  const getNavLinkClass = ({ isActive }) =>
    `nav-item ${isActive ? "active" : ""}`;

  const getDropdownToggleClass = ({ isActive }) => {
    let classes = "nav-item dropdown-toggle";
    if (
      isActive ||
      location.pathname === "/showcase" ||
      location.pathname.startsWith("/showcase#")
    ) {
      classes += " active";
    }
    return classes;
  };

  const getDropdownItemClass = ({ isActive, isPending }) => {
    return `dropdown-item ${isActive ? "active" : ""} ${
      isPending ? "pending" : ""
    }`;
  };

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
          to="/showcase#story"
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

export default NavBar;
