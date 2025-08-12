import React from 'react';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './MainLayout.css';

function MainLayout({ onOpenCookieSettings }) {
  return (
    <div className="main-layout">
      {/* The header element now lives here, wrapping the NavBar */}
      <header className="main-header">
        <NavBar />
      </header>
      <main className="main-layout__content">
        <Outlet />
      </main>
      <Footer onOpenCookieSettings={onOpenCookieSettings} />
    </div>
  );
}

MainLayout.propTypes = {
  onOpenCookieSettings: PropTypes.func.isRequired,
};

export default MainLayout;