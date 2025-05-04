// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // Component to render child routes
import NavBar from './NavBar'; // Import the navigation bar
import './Default.css'; // Import shared styles

function Layout() {
  return (
    // Main container for the entire application layout
    <div className="app-layout">
      {/* Render the navigation bar at the top */}
      <NavBar />

      {/* Content area where routed pages will be displayed */}
      <div className="page-content">
        <Outlet /> {/* Renders the matched child route component */}
      </div>

      {/* Optional Footer - Placeholder */}
      {/* <footer className="footer">
        <p>© 2024 Your Game Title. All rights reserved.</p>
      </footer> */}
    </div>
  );
}

export default Layout;