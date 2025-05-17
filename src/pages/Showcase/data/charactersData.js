// src/pages/Showcase/data/charactersData.js

// Image imports
import lordChoshenImg from "../../../assets/showcase/character_lord_choshen.png";
import lordChoshenThumb from "../../../assets/showcase/thumb_lord_choshen.png";
import blueStarImg from "../../../assets/showcase/character_blue_star.png";
import blueStarThumb from "../../../assets/showcase/thumb_blue_star.png";
import aliceKingstonImg from "../../../assets/showcase/character_alice_kingston.png";
import aliceKingstonThumb from "../../../assets/showcase/thumb_alice_kingston.png";

// Data for character showcase
export const charactersData = [
  {
    id: 1,
    name: "Lord Choshen",
    title: "Afraid of Women",
    description:
      "A once-feared lord, now a reluctant hero. Choshen's journey is one of redemption, courage, and the unexpected strength found in vulnerability.",
    image: lordChoshenImg,
    thumbnail: lordChoshenThumb,
    accentColor: "rgba(148, 88, 143, 0.8)", // Unique accent for Choshen
  },
  {
    id: 2,
    name: "Mr.BlueStar",
    title: "Lazy Typer",
    description:
      "A mysterious figure with a penchant for laziness, Mr. BlueStar is a master of strategy and manipulation, often using his wit to outsmart opponents.",
    image: blueStarImg,
    thumbnail: blueStarThumb,
    accentColor: "rgba(0, 255, 34, 0.8)", // Unique accent for BlueStar
  },
  {
    id: 3,
    name: "Alice Kingston",
    title: "The Flame Lotus",
    description:
      "A fierce warrior with a fiery spirit, Alice is known for her unmatched combat skills and her ability to harness the power of fire in battle.",
    image: aliceKingstonImg,
    thumbnail: aliceKingstonThumb,
    accentColor: "rgb(255, 30, 0)", // Red/Orange accent for Alice
  },
];
