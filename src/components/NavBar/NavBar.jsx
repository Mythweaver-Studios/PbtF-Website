// src/components/NavBar/NavBar.jsx
import React from "react";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import MiniMediaLinks from "./MiniMediaLinks";
import "./NavBar.css";

// onShowcaseLinkClick is an optional prop for handling showcase section navigation
function NavBar({ onShowcaseLinkClick }) {
  const location = useLocation();

  const getMainNavLinkClass = ({ isActive }) => {
    let classes = "nav-item";
    if (isActive || location.pathname.startsWith("/home#")) {
      classes += " active";
    }
    return classes;
  };
  
  const getNavLinkClass = ({ isActive }) =>
    `nav-item ${isActive ? "active" : ""}`;

  const getDropdownToggleClass = ({ isActive }) => {
    let classes = "nav-item dropdown-toggle";
    if (isActive || location.pathname.startsWith("/showcase#")) {
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
    <>
      <nav className="main-nav">
        <NavLink to="/home" className={getMainNavLinkClass} end>
          <span>Main</span>
        </NavLink>

        <div className={`nav-item-dropdown-container ${isCurrentlyOnShowcasePage ? "has-active-path" : ""}`}>
          <NavLink
            to="/showcase"
            className={getDropdownToggleClass}
            aria-haspopup="true"
            onClick={(e) => {
              if (isCurrentlyOnShowcasePage && onShowcaseLinkClick) {
                onShowcaseLinkClick(e, "story");
              }
            }}
          >
            <span>Game Showcase</span>
            <span className="arrow-indicator">▼</span>
          </NavLink>

          <ul className="dropdown-menu">
            <li>
              <NavLink to="/showcase#story" className={getDropdownItemClass} end onClick={(e) => { if (isCurrentlyOnShowcasePage && onShowcaseLinkClick) { onShowcaseLinkClick(e, "story"); } }}>
                Story
              </NavLink>
            </li>
            <li>
              <NavLink to="/showcase#characters" className={getDropdownItemClass} end onClick={(e) => { if (isCurrentlyOnShowcasePage && onShowcaseLinkClick) { onShowcaseLinkClick(e, "characters"); } }}>
                Characters
              </NavLink>
            </li>
            <li>
              <NavLink to="/showcase#features" className={getDropdownItemClass} end onClick={(e) => { if (isCurrentlyOnShowcasePage && onShowcaseLinkClick) { onShowcaseLinkClick(e, "features"); } }}>
                Features
              </NavLink>
            </li>
          </ul>
        </div>

        <NavLink to="/about-us" className={getNavLinkClass}>
          <span>About Us</span>
        </NavLink>
        <NavLink to="/news" className={getNavLinkClass}>
          <span>News</span>
        </NavLink>
      </nav>
      {/* Media links are now part of the header, but positioned by the flex container */}
      <MiniMediaLinks />
    </>
  );
}

NavBar.propTypes = {
  onShowcaseLinkClick: PropTypes.func,
};

export default NavBar;