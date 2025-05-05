// src/components/NavBar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling

function NavBar() {
  // Function to determine className for NavLink (applies 'active' class)
  const getNavLinkClass = ({ isActive }) => isActive ? 'active' : '';

  return (
    <nav className="main-nav">
      <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
      <NavLink to="/about" className={getNavLinkClass}>About us</NavLink>
      <NavLink to="/updates" className={getNavLinkClass}>Updates</NavLink>
    </nav>
  );
}

export default NavBar;