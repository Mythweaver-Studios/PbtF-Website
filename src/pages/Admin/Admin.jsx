// src/pages/Admin/Admin.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa';
import './Admin.css';

function Admin() {
    return (
        <div className="admin-page">
            <div className="admin-container">
                <h1 className="admin-title">Admin Dashboard</h1>
                <p className="admin-description">
                    Authentication is required to access this area.
                </p>
                <button className="btn btn-primary admin-login-button" disabled>
                    <FaDiscord />
                    <span>Login with Discord</span>
                </button>
                <Link to="/home" className="admin-back-link">
                    &larr; Return to Home
                </Link>
            </div>
        </div>
    );
}

export default Admin;