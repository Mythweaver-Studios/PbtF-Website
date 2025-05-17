// src/pages/News/News.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";
import MediaLinks from "../../components/MiniMediaLinks";
import Footer from "../../components/Footer";
import newsItemsData from "./data/News.json";
import "../../components/Default.css";
import "./News.scss";

const ITEMS_PER_PAGE = 5; // Number of news items to show per page/load

function News() {
  const location = useLocation();
  // const navigate = useNavigate();
  const [displayedItems, setDisplayedItems] = useState([]);
  const [nextItemIndex, setNextItemIndex] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // Sort news items by date, newest first (assuming YYYY/MM/DD format for simplicity)
  const sortedNewsItems = [...newsItemsData].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const loadMoreItems = () => {
    const newItems = sortedNewsItems.slice(
      nextItemIndex,
      nextItemIndex + ITEMS_PER_PAGE
    );
    setDisplayedItems((prevItems) => [...prevItems, ...newItems]);
    setNextItemIndex((prevIndex) => prevIndex + newItems.length);
    if (nextItemIndex + newItems.length >= sortedNewsItems.length) {
      setHasMore(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadMoreItems();
  }, []); // Empty dependency array means this runs once on mount

  useEffect(() => {
    const hash = location.hash.substring(1);
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        // Ensure all items are loaded if a deep link is accessed, then scroll
        if (
          nextItemIndex < sortedNewsItems.length &&
          !displayedItems.find((item) => item.id === hash)
        ) {
          setDisplayedItems(sortedNewsItems);
          setNextItemIndex(sortedNewsItems.length);
          setHasMore(false);
          setTimeout(() => {
            const headerOffset = 80;
            const elementPosition =
              element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "auto" });
          }, 100);
        } else if (displayedItems.find((item) => item.id === hash)) {
          const headerOffset = 80;
          const elementPosition =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "auto" });
        }
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash, displayedItems]); // Re-check scroll on hash change or when items are loaded

  return (
    <div className="page-container news-page">
      <header className="news-header-sticky">
        <NavBar />
        <MediaLinks />
      </header>

      <main className="news-main-content">
        <div className="news-title-banner">
          <div className="news-title-banner-overlay"></div>
          <h1 className="news-page-title">News</h1>
        </div>

        <div className="news-list-full-container">
          {displayedItems.map((item) => (
            <Link
              to={item.linkToFullArticle}
              key={item.id}
              id={item.id}
              className="news-list-item-full"
            >
              <div className="news-item-date-full">{item.date}</div>
              <div className="news-item-text-content">
                <h2 className="news-item-title-full">{item.title}</h2>
                {item.summary && (
                  <p className="news-item-summary">{item.summary}</p>
                )}
              </div>
              <div className={`news-item-category-full ${item.categoryTheme}`}>
                {item.category}
              </div>
              <div className="news-item-arrow-container-full">
                <span className="news-item-arrow-icon-full"></span>
              </div>
            </Link>
          ))}
        </div>

        {hasMore && (
          <button onClick={loadMoreItems} className="btn btn-load-more">
            Load More News
          </button>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default News;
