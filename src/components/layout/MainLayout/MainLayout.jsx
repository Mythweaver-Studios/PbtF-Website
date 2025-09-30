// src/components/layout/MainLayout/MainLayout.jsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './MainLayout.css';

function MainLayout({ onOpenCookieSettings }) {
  const location = useLocation();

  return (
    <div className="main-layout">
      <header className="main-header">
        <NavBar />
      </header>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          className="page-wrapper"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <main className="main-layout__content">
            <Outlet />
          </main>
        </motion.div>
      </AnimatePresence>
      <Footer onOpenCookieSettings={onOpenCookieSettings} />
    </div>
  );
}

MainLayout.propTypes = {
  onOpenCookieSettings: PropTypes.func.isRequired,
};

export default MainLayout;