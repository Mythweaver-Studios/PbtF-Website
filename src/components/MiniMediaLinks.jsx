// src/components/MediaLinks.jsx
import React from "react";

// Import SVG files as modules or use direct paths
import InstagramIconPath from "../assets/MiniMediaNavbar/Instagram.svg";
import RedditIconPath from "../assets/MiniMediaNavbar/Reddit.svg";
import DiscordIconPath from "../assets/MiniMediaNavbar/Discord.svg";

function MediaLinks() {
  return (
    <div className="media-links">
      {/* Use img tags to display the SVG files */}
      <a href="#" aria-label="Instagram">
        {" "}
        {/* Placeholder link */}
        <img src={InstagramIconPath} alt="Instagram Icon" />
      </a>
      <a href="#" aria-label="Reddit">
        {" "}
        {/* Placeholder link */}
        <img src={RedditIconPath} alt="Reddit Icon" />
      </a>
      <a href="https://discord.gg/pmu" target="blank" aria-label="Discord">
        <img src={DiscordIconPath} alt="Discord Icon" />
      </a>
    </div>
  );
}

export default MediaLinks;
