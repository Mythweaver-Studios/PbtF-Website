// src/pages/News/News.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./News.css";

function News() {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            <div className="news-title-banner">
                <div className="news-title-banner-overlay"></div>
                <h1 className="news-page-title">News</h1>
            </div>

            <div className="news-list-full-container">
                <p className="no-news-message">No news available at the moment. Check back soon!</p>
            </div>
            {/* Future "Load More" button would go here */}
        </>
    );
}

export default News;