// src/pages/Home/components/NewsTeaser.jsx
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import newsItemsData from "../../News/data/News.json"; // Updated path to main News.json
import "./NewsTeaser.scss";

function NewsTeaser({ sectionRef }) {
  const [latestNews, setLatestNews] = useState([]);

  useEffect(() => {
    // Sort by date (newest first) and take top 3
    const sortedNews = [...newsItemsData]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
    setLatestNews(sortedNews);
  }, []);

  return (
    <section id="news-teaser" className="news-teaser-section" ref={sectionRef}>
      <h2 className="section-title">Latest News</h2>
      <div className="news-list-container">
        {latestNews.map((newsItem) => (
          <Link
            to={newsItem.linkToFullArticle}
            key={newsItem.id}
            id={newsItem.id}
            className="news-item"
          >
            <div className="news-item-date">{newsItem.date}</div>
            <div className="news-item-content">
              <p className="news-item-title">{newsItem.title}</p>
            </div>
            <div className={`news-item-category ${newsItem.categoryTheme}`}>
              {newsItem.category}
            </div>
            <div className="news-item-arrow-container">
              <span className="news-item-arrow-icon"></span>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/news" className="btn btn-see-news">
        See All News
      </Link>
    </section>
  );
}

NewsTeaser.propTypes = {
  sectionRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default NewsTeaser;
