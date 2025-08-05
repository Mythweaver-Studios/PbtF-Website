// src/pages/News/News.jsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
// Import newsItemsData from "./data/News.json";
import "../../styles/Theme.css";
import "./News.css";

// const ITEMS_PER_PAGE = 5; // Commented out as it's not used when no news is displayed

function News() {
    const location = useLocation();
    // const [displayedItems, setDisplayedItems] = useState([]); // Commented out
    // const [nextItemIndex, setNextItemIndex] = useState(0); // Commented out
    // const [hasMore, setHasMore] = useState(true); // Commented out

    // Sort news items by date, newest first (commented out for now)
    // const sortedNewsItems = [...newsItemsData].sort(
    //   (a, b) => new Date(b.date) - new Date(a.date)
    // );

    // const loadMoreItems = () => { // Commented out
    //   const newItems = sortedNewsItems.slice(
    //     nextItemIndex,
    //     nextItemIndex + ITEMS_PER_PAGE
    //   );
    //   setDisplayedItems((prevItems) => [...prevItems, ...newItems]);
    //   setNextItemIndex((prevIndex) => prevIndex + newItems.length);
    //   if (nextItemIndex + newItems.length >= sortedNewsItems.length) {
    //     setHasMore(false);
    //   }
    // };

    useEffect(() => {
        // Initial load - currently just scrolls to top as there's no news to load.
        // If news loading is re-implemented, this is where you'd call `loadMoreItems()`.
        window.scrollTo(0, 0);
    }, []); // Empty dependency array means this runs once on mount

    useEffect(() => {
        // Simplified scroll handling for when news items are not displayed.
        // If you re-implement news, you'll need to adapt the original hash scrolling logic.
        const hash = location.hash.substring(1);
        if (hash) {
            // Attempt to scroll to an element if a hash is present.
            // This might be useful if other elements on the page become targetable.
            const element = document.getElementById(hash);
            if (element) {
                const headerOffset = 80; // Adjust as needed
                const elementPosition =
                    element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: "auto" });
            }
        } else if (!location.hash) {
            // If no hash, scroll to top (redundant with the first useEffect, but kept for clarity)
            window.scrollTo(0, 0);
        }
    }, [location.hash]);

    return (
        <div className="page-container news-page">
            <header className="news-header-sticky">
            </header>

            <main className="news-main-content">
                <div className="news-title-banner">
                    <div className="news-title-banner-overlay"></div>
                    <h1 className="news-page-title">News</h1>
                </div>

                <div className="news-list-full-container">
                    {/*
            To re-implement news display:
            1. Uncomment `newsItemsData` import, state variables (displayedItems, nextItemIndex, hasMore),
               `sortedNewsItems`, and `loadMoreItems` function.
            2. Ensure `News.json` exists in the `src/pages/News/data/` directory and is populated.
               Each news item in News.json should follow a structure like:
               {
                 "id": "unique-news-id-20231027", // Used for React keys and HTML element IDs for deep linking
                 "date": "2023/10/27", // Publication date
                 "title": "Full News Article Title",
                 "category": "Updates", // E.g., Updates, Events, Info
                 "categoryTheme": "updates", // CSS class for styling (e.g., 'updates', 'events', 'info')
                 "summary": "A short summary or teaser for the news item displayed on the list.",
                 "linkToFullArticle": "/news#unique-news-id-20231027", // Crucial for navigation and deep linking
                 // Optionally, add a 'fullContent' field if you plan to render full articles on this page or a sub-route.
                 // "fullContent": "<p>This is the <strong>full HTML content</strong> of the news article...</p>"
               }
            3. Uncomment the mapping logic below and replace the static paragraph.
            4. Uncomment the "Load More News" button and its conditional rendering.
            5. Adapt the `useEffect` for `location.hash` to correctly scroll to items after they are loaded,
               similar to its original implementation.

            Example of mapping:
            {displayedItems.length > 0 ? (
              displayedItems.map((item) => (
                <Link // Or use a div if it's not a link to a separate page/section
                  to={item.linkToFullArticle} // Ensure this navigates correctly
                  key={item.id}
                  id={item.id} // For deep linking with URL hash
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
              ))
            ) : (
              <p className="no-news-message">No news available at the moment. Check back soon!</p>
            )}
          */}
                    <p className="no-news-message">No news available at the moment. Check back soon!</p>
                </div>

                {/*
          Uncomment this button when news loading is re-implemented:
          {hasMore && (
            <button onClick={loadMoreItems} className="btn btn-load-more">
              Load More News
            </button>
          )}
        */}
            </main>
        </div>
    );
}

export default News;