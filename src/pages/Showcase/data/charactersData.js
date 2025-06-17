// src/pages/Showcase/data/charactersData.js

// Image imports
import Character1Img from "../../../assets/showcase/Noire_3.png";
import Character1Thumb from "../../../assets/showcase/Noire_3.png";
import Character2Img from "../../../assets/showcase/YanYan.png";
import Character2Thumb from "../../../assets/showcase/YanYan.png";
import Character3Img from "../../../assets/showcase/Character_Benedict.png";
import Character3Thumb from "../../../assets/showcase/Thumb_Benedict.png";

// Data for character showcase
export const charactersData = [
    {
        id: 1,
        name: "Noire Three",
        title: "Nameless Rose",
        description:
            "A living weapon forged in darkness, she broke her chains and vanished after claiming her revenge. Her purpose is now her own, a mystery to all who cross her path.",
        image: Character1Img,
        thumbnail: Character1Thumb,
        accentColor: "#8b9ff2",
        stars: 4,
        styles: {
            transform: 'scale(1.15) translateY(-20px) translateX(10px)', // Example: Zoom in, move up and right
            maxWidth: '50%',
        }
    },
    {
        id: 2,
        name: "YanYan",
        title: "The Unknown",
        description:
            "Unknown...",
        image: Character2Img,
        thumbnail: Character2Thumb,
        accentColor: "#d3e5fe",
        stars: 3,
        styles: {
            maxWidth: '50%', // Example: Make image slightly wider
        }
    },
    {
        id: 3,
        name: "Benedict",
        title: "Brightblade of Auravell",
        description:
            "A paladin sculpted into a perfect blade, he sacrificed love and peace for duty. Now he walks a solitary path toward a fate he knows he cannot avoid.",
        image: Character3Img,
        thumbnail: Character3Thumb,
        accentColor: "rgba(191, 191, 191, 0.8)",
        stars: 5,
        // No styles property here will use the default CSS styling
    },
];