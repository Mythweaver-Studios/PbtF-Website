// src/components/MiniMediaLinks.jsx
import React from "react";
import InstagramIconPath from "../assets/icons/Instagram.svg";
import RedditIconPath from "../assets/icons/Reddit.svg";
import DiscordIconPath from "../assets/icons/Discord.svg";
import "./MiniMediaLinks.css";

function MediaLinks() {
    return (
        <div className="media-links">
            <a
                href="https://discord.gg/pmu" // TODO: Update Instagram link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="media-link-disabled" // Added class for disabled state
            >
                <img src={InstagramIconPath} alt="Instagram Icon" />
            </a>
            <a
                href="https://discord.gg/pmu" // TODO: Update Reddit link
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Reddit"
                className="media-link-disabled" // Added class for disabled state
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