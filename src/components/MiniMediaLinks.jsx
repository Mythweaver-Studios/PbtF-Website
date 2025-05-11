// src/components/MiniMediaLinks.jsx
import React from "react";
import InstagramIconPath from "../assets/MiniMediaNavbar/Instagram.svg";
import RedditIconPath from "../assets/MiniMediaNavbar/Reddit.svg";
import DiscordIconPath from "../assets/MiniMediaNavbar/Discord.svg";
import "./MiniMediaLinks.css"; // Import MiniMediaLinks specific styles

function MediaLinks() {
  return (
    <div className="media-links">
      {/* TODO: Update Instagram link */}
      <a
        href="https://discord.gg/pmu"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <img src={InstagramIconPath} alt="Instagram Icon" />
      </a>
      {/* TODO: Update Reddit link */}
      <a
        href="https://discord.gg/pmu"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Reddit"
      >
        <img src={RedditIconPath} alt="Reddit Icon" />
      </a>
      <a
        href="https://discord.gg/pmu"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discord"
      >
        <img src={DiscordIconPath} alt="Discord Icon" />
      </a>
    </div>
  );
}

export default MediaLinks;
