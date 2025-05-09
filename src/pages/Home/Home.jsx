// src/pages/Home/Home.jsx
import NavBar from "../../components/NavBar";
import MediaLinks from "../../components/MiniMediaLinks";
import "./Home.scss"; // Import Home page specific styles

function Home() {
  return (
    // Use the general page container class, styled by Home.scss
    <div className="page-container">
      {/* Header layout specific to Home, styled by Home.scss */}
      <header className="home-header">
        <NavBar />
        <MediaLinks />
      </header>
      {/* Content structure specific to Home, styled by Home.scss */}
      <main className="home-content">
        <div className="content-left">
          {/* Title uses custom font via Home.scss */}
          <h1>Crownless</h1>
          {/* Game pitch with custom font and bold style */}
          <p className="game-pitch">
            <strong>
              Crownless: The Beginning is a tactical survival game where you
              control the fate of summoned heroes battling through a ruthless
              tower of trials. No retries. No revives. Just consequences
            </strong>
          </p>
          {/* Button layout and styles from Home.scss */}
          <div className="action-buttons">
            <div className="button-row-top">
              <button className="btn btn-primary">
                Beta Signup
              </button>
              <button className="btn btn-secondary">Watch Trailer</button>
            </div>
            <button className="btn btn-tertiary">Add to Wishlist</button>
          </div>
        </div>
        <div className="content-right">
          {/* Empty right side, relies on background from body or page-container */}
        </div>
      </main>
    </div>
  );
}

export default Home;