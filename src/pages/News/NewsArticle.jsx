// src/pages/News/NewsArticle.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import MediaLinks from "../../components/MiniMediaLinks";
import Footer from "../../components/Footer";
import newsItemsData from "./data/News.json";
import "../../components/Default.css";
import "./News.css";
import "./NewsArticle.css";

function NewsArticle() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        // Find the article by ID
        const foundArticle = newsItemsData.find(item => item.id === id);
        
        if (foundArticle) {
            setArticle(foundArticle);
        } else {
            // Article not found, redirect to news page
            navigate('/news');
        }
        setLoading(false);
        window.scrollTo(0, 0);
    }, [id, navigate]);

    if (loading) {
        return (
            <div className="page-container news-page">
                <header className="news-header-sticky">
                    <NavBar />
                    <MediaLinks />
                </header>
                <main className="news-main-content">
                    <div className="loading-message">Loading article...</div>
                </main>
                <Footer />
            </div>
        );
    }

    if (!article) {
        return (
            <div className="page-container news-page">
                <header className="news-header-sticky">
                    <NavBar />
                    <MediaLinks />
                </header>
                <main className="news-main-content">
                    <div className="error-message">Article not found</div>
                </main>
                <Footer />
            </div>
        );
    }

    function formatTitle(title) {
        const colonIndex = title.indexOf(":");
        if (colonIndex !== -1) {
            const beforeColon = title.slice(0, colonIndex + 1);
            const afterColon = title.slice(colonIndex + 1).trim();
            return (
                <>
                    {beforeColon}
                    <br />
                    {afterColon}
                </>
            );
        }
        return title;
    }

    return (
        <div className="page-container news-page">
            <header className="news-header-sticky">
                <NavBar />
                <MediaLinks />
            </header>

            <main className="news-main-content">
                <div className="news-article-container">
                    <Link to="/news" className="back-to-news-link">
                        <span className="back-arrow">←</span> Back to News
                    </Link>
                    
                    <article className="news-article-full">
                        <header className="news-article-header">
                            <div className="news-article-meta">
                                <div className="news-article-date">{article.date}</div>
                                <div className={`news-article-category ${article.categoryTheme}`}>
                                    {article.category}
                                </div>
                            </div>
                            <h1 className="news-article-title">{formatTitle(article.title)}</h1>
                            {article.summary && (
                                <p className="news-article-summary">{article.summary}</p>
                            )}
                        </header>

                        <div className="news-article-content">
                            {article.fullContent ? (
                                <div dangerouslySetInnerHTML={{ __html: article.fullContent }} />
                            ) : (
                                <div className="default-content">
                                    <p>This is a placeholder for the full article content. This would contain the complete article text, images, and other media.</p>
                                    <p>For now, you can see the summary above. The full content would be loaded from headless CMS</p>
                                    <p>To implement full content, integrate with a headless CMS</p>
                                </div>
                            )}
                        </div>

                        <footer className="news-article-footer">
                            <Link to="/news" className="back-to-news-button">
                                ← Back to News
                            </Link>
                        </footer>
                    </article>
                </div>
            </main>
            
            <Footer />
        </div>
    );
}

export default NewsArticle;