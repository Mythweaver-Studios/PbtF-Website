// src/components/NavBar.jsx
import { NavLink } from 'react-router-dom'; // Use NavLink for active styling

function NavBar() {
  // Function to determine className for NavLink (applies 'active' class)
  const getNavLinkClass = ({ isActive }) => {
    let classes = "nav-item"; // Base class for all nav items
    if (isActive) {
      classes += " active"; // Add active class if the link is active
    }
    return classes;
  };

  return (
    <nav className="main-nav">
      <NavLink to="/" className={getNavLinkClass}>
        <span>Home</span>
      </NavLink>
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