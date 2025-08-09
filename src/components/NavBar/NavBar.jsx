// src/components/NavBar/NavBar.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaDiscord, FaReddit, FaInstagram } from 'react-icons/fa';
import { IoChevronDown } from 'react-icons/io5';
import Dropdown from '../Dropdown/Dropdown';
import './NavBar.css';

function NavBar() {
    const location = useLocation();

    const getNavLinkClass = ({ isActive }) => `nav-item ${isActive ? 'active' : ''}`;
    const isShowcaseActive = location.pathname.startsWith('/showcase');

    // The component is now wrapped in a single div that controls its internal layout.
    return (
        <div className="navbar-wrapper">
            <nav className="main-nav">
                <NavLink to="/home" className={getNavLinkClass} end>
                    <span>Main</span>
                </NavLink>

                <Dropdown
                    trigger={
                        <div className={`nav-item ${isShowcaseActive ? 'active' : ''}`}>
                            <span>Game Showcase</span>
                            <IoChevronDown className="arrow-indicator" />
                        </div>
                    }
                >
                    <ul>
                        <li>
                            <NavLink to="/showcase#story" className="dropdown-item">Story</NavLink>
                        </li>
                        <li>
                            <NavLink to="/showcase#characters" className="dropdown-item">Characters</NavLink>
                        </li>
                        <li>
                            <NavLink to="/showcase#features" className="dropdown-item">Features</NavLink>
                        </li>
                    </ul>
                </Dropdown>

                <NavLink to="/about-us" className={getNavLinkClass}>
                    <span>About Us</span>
                </NavLink>
                <NavLink to="/news" className={getNavLinkClass}>
                    <span>News</span>
                </NavLink>
            </nav>

            <div className="navbar__socials">
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link-disabled">
                    <FaInstagram />
                </a>
                <a href="https://www.reddit.com" target="_blank" rel="noopener noreferrer" aria-label="Reddit" className="social-link-disabled">
                    <FaReddit />
                </a>
                <a href="https://discord.gg/pmu" target="_blank" rel="noopener noreferrer" aria-label="Discord">
                    <FaDiscord />
                </a>
            </div>
        </div>
    );
}

export default NavBar;