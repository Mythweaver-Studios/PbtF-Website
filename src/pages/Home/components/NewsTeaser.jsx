// src/pages/Home/components/NewsTeaser.jsx
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./NewsTeaser.css";

function NewsTeaser({ sectionRef }) {
    return (
        <section id="news-teaser" className="news-teaser-section" ref={sectionRef}>
            <h2 className="section-title">Latest News</h2>
            <div className="news-list-container">
                {/*
          To add news items:
          1. Prepare your news data. This could be from a JSON file, an API, or managed state.
             An example structure for a single news item could be:
             {
               "id": "unique-news-identifier-2023102701", // Unique ID for keys and linking
               "date": "2023/10/27", // Publication date
               "title": "Exciting New Feature Announced!", // News headline
               "category": "Updates", // Display category (e.g., Updates, Events, Info)
               "categoryTheme": "updates", // CSS class for styling the category tag (e.g., 'updates', 'events', 'info')
               "summary": "A brief summary of what this news is about...", // Optional: for fuller teasers
               "linkToFullArticle": "/news#unique-news-identifier-2023102701" // Link to the full news page/article
             }
          2. If using dynamic data, you would typically fetch it in a useEffect hook and store it in state using useState.
             For example:
             const [newsItems, setNewsItems] = useState([]);
             useEffect(() => {
               // Fetch or import your news data here
               // const fetchedNews = await fetchNewsFromAPI();
               // setNewsItems(fetchedNews.slice(0, 3)); // Example: display top 3 latest news
             }, []);
          3. Map over the `newsItems` array below to render each news item dynamically.
             Replace the static <p> tag with your mapping logic.
             Example of mapping:
              {newsItems.length > 0 ? (
                newsItems.map((newsItem) => (
                  <Link
                    to={newsItem.linkToFullArticle}
                    key={newsItem.id}
                    className="news-item" // Ensure your CSS targets this class
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
                ))
              ) : (
                <p className="no-news-message">No news available at the moment. Check back soon!</p>
              )}
        */}
                <p className="no-news-message">No news available at the moment. Check back soon!</p>
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