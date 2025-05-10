// src/components/MiniMediaLinks.jsx
import InstagramIconPath from "../assets/MiniMediaNavbar/Instagram.svg";
import RedditIconPath from "../assets/MiniMediaNavbar/Reddit.svg";
import DiscordIconPath from "../assets/MiniMediaNavbar/Discord.svg";
import "./MiniMediaLinks.css"; // Import MiniMediaLinks specific styles

function MediaLinks() {
  return (
    <div className="media-links">
      <a href="https://discord.gg/pmu" aria-label="Instagram">
        <img src={InstagramIconPath} alt="Instagram Icon" />
      </a>
      <a href="https://discord.gg/pmu" aria-label="Reddit">
        <img src={RedditIconPath} alt="Reddit Icon" />
      </a>
      <a href="https://discord.gg/pmu" target="blank" aria-label="Discord">
        <img src={DiscordIconPath} alt="Discord Icon" />
      </a>
    </div>
  );
}

export default MediaLinks;
