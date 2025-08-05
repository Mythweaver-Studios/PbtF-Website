// src/pages/AboutUs/AboutUs.jsx
import React, { useEffect } from "react";
import "./AboutUs.css";

const availableTeams = [
  "Animation Team",
  "Art Team",
  "Balancing Team",
  "Concept Team",
  "Music Team",
  "Narrative Design Team",
  "Programming Team",
  "Story Team",
  "Visual Implementation Team",
  "Voice Acting Team",
  "Web Developer Team",
].sort();

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-us-wrapper">
      <section id="our-story" className="about-section company-section">
        <div className="section-title-container">
          <h2 className="section-title">Our Story</h2>
        </div>
        <div className="company-description">
          <p>
            We aren&apos;t a conventional game studio, nor are we bound by
            corporate structures. Instead, we are a collective of passionate
            individuals, united by our deep love for compelling narratives
            found in manhwa, manga, and beyond. Our mission is to breathe
            interactive life into these cherished worlds, transforming them
            into engaging gaming experiences.
          </p>
          <p>
            Every member of our team contributes their skills and time
            voluntarily, driven by the desire to create something truly
            special. This is a labor of love, an opportunity to hone our
            crafts, gain invaluable real-world experience, and build a
            portfolio that reflects our dedication. We believe that by pouring
            our hearts into these projects, we can make these stories shine
            even brighter, offering fans new ways to connect with the
            characters and universes they adore.
          </p>
          <p>
            Join us on this journey as we strive to turn ambitious dreams into
            tangible realities, one game at a time.
          </p>
        </div>
      </section>

      <section id="join-us" className="about-section recruitment-section">
        <div className="section-title-container">
          <h2 className="section-title">Join Our Ranks</h2>
        </div>
        <div className="recruitment-content">
          <p className="recruitment-intro">
            We are always looking for talented and enthusiastic individuals to
            help us forge new adventures. If you share our passion and believe
            you have skills that can contribute to our projects, we&apos;d
            love to hear from you!
          </p>
          <h3 className="available-teams-title">Available Teams:</h3>
          <ul className="teams-list">
            {availableTeams.map((team) => (
              <li key={team} className="team-item">
                {team}
              </li>
            ))}
          </ul>
          <div className="recruitment-how-to">
            <h4>How to Get Involved:</h4>
            <p>
              The best way to express your interest and learn more about
              current opportunities is to join our community. Please create a
              ticket in our official Discord server, detailing your skills,
              interests, and which team(s) you&apos;re interested in.
            </p>
            <a
              href="https://discord.gg/pmu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-discord"
            >
              Join Our Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;