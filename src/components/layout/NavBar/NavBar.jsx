import React, { useState } from 'react';
import { NavLink, useLocation, Link } from 'react-router-dom';
import { Drawer, Button } from 'antd';
import { FaDiscord, FaReddit, FaInstagram } from 'react-icons/fa';
import { IoChevronDown } from 'react-icons/io5';
import { HiMenu } from 'react-icons/hi';
import Dropdown from '../../ui/Dropdown/Dropdown';
import './NavBar.css';

function NavBar() {
    const location = useLocation();
    const [drawerVisible, setDrawerVisible] = useState(false);

    const showDrawer = () => setDrawerVisible(true);
    const closeDrawer = () => setDrawerVisible(false);

    const getNavLinkClass = ({ isActive }) => `nav-item ${isActive ? 'active' : ''}`;
    const getMobileNavLinkClass = ({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`;
    const isShowcaseActive = location.pathname.startsWith('/showcase');

    const socialLinks = (
        <div className="navbar__socials">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link-disabled"><FaInstagram /></a>
            <a href="https://www.reddit.com" target="_blank" rel="noopener noreferrer" aria-label="Reddit" className="social-link-disabled"><FaReddit /></a>
            <a href="https://discord.gg/pmu" target="_blank" rel="noopener noreferrer" aria-label="Discord"><FaDiscord /></a>
        </div>
    );

    const navigationLinks = (
        <nav className="main-nav desktop-nav">
            <NavLink to="/home" className={getNavLinkClass} end><span>Main</span></NavLink>
            <Dropdown
                trigger={<div className={`nav-item ${isShowcaseActive ? 'active' : ''}`}><span>Game Showcase</span><IoChevronDown className="arrow-indicator" /></div>}
            >
                <ul>
                    <li><NavLink to="/showcase#story" className="dropdown-item">Story</NavLink></li>
                    <li><NavLink to="/showcase#characters" className="dropdown-item">Characters</NavLink></li>
                    <li><NavLink to="/showcase#features" className="dropdown-item">Features</NavLink></li>
                </ul>
            </Dropdown>
            <NavLink to="/about-us" className={getNavLinkClass}><span>About Us</span></NavLink>
        </nav>
    );

    const mobileNavigationLinks = (
        <nav className="mobile-nav-links">
            <NavLink to="/home" className={getMobileNavLinkClass} onClick={closeDrawer} end>Main</NavLink>
            <NavLink to="/showcase" className={getMobileNavLinkClass} onClick={closeDrawer}>Game Showcase</NavLink>
            <NavLink to="/about-us" className={getMobileNavLinkClass} onClick={closeDrawer}>About Us</NavLink>
        </nav>
    );

    return (
        <div className="navbar-wrapper">
            <Link to="/home" className="mobile-header-title">Paved by the Fallen</Link>
            
            {navigationLinks}
            <div className="navbar__socials desktop-socials">{socialLinks}</div>
            
            <Button className="mobile-menu-button" type="text" icon={<HiMenu />} onClick={showDrawer} />
            
            <Drawer
                title="Navigation"
                placement="right"
                onClose={closeDrawer}
                open={drawerVisible}
                className="theme-drawer"
            >
                {mobileNavigationLinks}
                <div className="mobile-socials">{socialLinks}</div>
            </Drawer>
        </div>
    );
}

export default NavBar;