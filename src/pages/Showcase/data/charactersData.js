// src/pages/Showcase/data/charactersData.js

// Image imports
import Character1Img from "../../../assets/showcase/Character_Noire_3.png";
import Character1Thumb from "../../../assets/showcase/Thumb_Noire_3.png";
import Character2Img from "../../../assets/showcase/Character_YanYan.png";
import Character2Thumb from "../../../assets/showcase/Thumb_YanYan.png";
import Character3Img from "../../../assets/showcase/Character_Benedict.png";
import Character3Thumb from "../../../assets/showcase/Thumb_Benedict.png";

// Data for character showcase
export const charactersData = [
    {
        id: 1,
        name: "Noire Three",
        fullName: "Project N-03, 'Noire'",
        title: "Nameless Rose",
        class: "Assassin",
        species: "Horned One (Demon)",
        gender: "Female",
        description:
            "A living weapon forged in darkness, she broke her chains and vanished after claiming her revenge. Her purpose is now her own, a mystery to all who cross her path.",
        longDescription: `Born into captivity under the Fourfold Circle's black market, she was a nameless child taken from the ruins of forgotten villages. Stripped of identity and forged through relentless training, she was starved of kindness and saturated with violence, honed into a perfect weapon. Her masters carved skill into her bones, obedience into her mind, and death into her hands. Each mission survived reinforced a single truth: she was replaceable, a shadow meant to fight till she broke. In the Circle's cold halls, affection was treason, and failure meant erasure.\n\nBut even a broken blade can turn. Captured after a mission and marked for execution by her masters, she bit through her own hand to escape. Slowly, each of her captors met a gruesome death. Some say she perished after her revenge. Others whispered she joined Echo of a Dream. But no one knows.`,
        image: Character1Img,
        thumbnail: Character1Thumb,
        accentColor: "#8b9ff2",
        stars: 4,
        maxStars: 6,
        styles: {
            transform: 'scale(1.10) translateY(-20px)',
        },
        stats: {
            Strength: 4,
            Intelligence: 3,
            HP: 2,
            Dexterity: 5,
            Mana: 1,
        }
    },
    {
        id: 2,
        name: "YanYan",
        fullName: "YanYan, Blade of the Azure",
        title: "The Azure Tempest",
        class: "Elementalist",
        species: "Human",
        gender: "Female",
        description:
            "A master of elemental sword arts who strikes like a storm. Once a disciple of a legendary order, she now walks a solitary path as a relic diver, seeking the power to challenge fate itself.",
        longDescription: `Swift as a crashing wave and sharp as lightning's edge, Yanyan is a master of the elemental sword arts, a relentless duelist who moves like water and strikes like a storm. A former disciple of a legendary order, she now walks her own path as a relic diver, chasing echoes of forgotten worlds and impossible truths.\n\nQuiet, focused, and driven by something she never speaks of, Yanyan carries more than just a blade. She seeks not only ancient power, but a way to challenge the very currents of fate.`,
        image: Character2Img,
        thumbnail: Character2Thumb,
        accentColor: "#d3e5fe",
        stars: 3,
        maxStars: 6,
        statsBlurred: true,
        styles: {
            transform: 'scale(1) translateY(-12px)',
        },
        stats: {
            Strength: 2,
            Intelligence: 4,
            HP: 3,
            Dexterity: 4,
            Mana: 4,
        }
    },
    {
        id: 3,
        name: "Benedict",
        fullName: "Sir Benedict the Bright",
        title: "Brightblade of Auravell",
        class: "Paladin",
        species: "Human",
        gender: "Male",
        description:
            "A paladin sculpted into a perfect blade, he sacrificed love and peace for duty. Now he walks a solitary path toward a fate he knows he cannot avoid.",
        longDescription: `Benedict is a warrior born in a crucible of flame, a paladin whose soul has been scoured clean of love, peace, and doubt. Chosen from a young age and raised without compassion, he was sculpted into a perfect blade, a Bright Lord meant to illuminate the world's darkest hours.\n\nUnder his helmet and shimmering armor lies a man who has given up everything in service of his duty. His past is marked by sacrifice and regret, love turned ashes, and comrades fallen by his side. His future promises only a solitary path, a showdown against a fate he cannot avoid.`,
        image: Character3Img,
        thumbnail: Character3Thumb,
        accentColor: "rgba(191, 191, 191, 0.8)",
        stars: 5,
        maxStars: 6,
        statsBlurred: true,
        stats: {
            Strength: 4,
            Intelligence: 2,
            HP: 5,
            Dexterity: 1,
            Mana: 3,
        }
    }
];