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
        longDescription: "Designated Project N-03, 'Noire' was an experimental bio-weapon created by the clandestine organization 'Umbra'. Infused with forbidden arts, she possesses unparalleled combat prowess. After fulfilling her designated mission—the annihilation of her creators—she severed all ties to her past. Now, she wanders the fractured world, her purpose a self-defined enigma. Observers note her detached demeanor is occasionally broken by moments of profound sorrow, hinting at a past she can neither escape nor fully remember.",
        image: Character1Img,
        thumbnail: Character1Thumb,
        accentColor: "#8b9ff2",
        stars: 4,
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
        longDescription: "Hailing from the mist-shrouded peaks of the Azure Monastery, YanYan was a prodigy, mastering the order's sacred sword techniques before she was of age. When an ancient relic she was sworn to protect was stolen, shattering the order's power, she took it upon herself to retrieve it. Her journey transformed her from a disciplined disciple into a relentless tempest, a relic diver who braves the most dangerous ruins in search of answers and the power to reclaim her honor.",
        image: Character2Img,
        thumbnail: Character2Thumb,
        accentColor: "#d3e5fe",
        stars: 3,
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
        longDescription: "Sir Benedict was the youngest captain of the Knights of Auravell, his devotion to the code as unyielding as his sacred blade. To save his kingdom from a creeping blight, he made a pact with an ancient celestial, sacrificing his personal connections and emotions for immense power. He succeeded, but at the cost of his own humanity. He is now a lonely sentinel, bound by duty to a fading kingdom, marching toward a prophesied sacrifice he has long since accepted.",
        image: Character3Img,
        thumbnail: Character3Thumb,
        accentColor: "rgba(191, 191, 191, 0.8)",
        stars: 5,
        stats: {
            Strength: 4,
            Intelligence: 2,
            HP: 5,
            Dexterity: 1,
            Mana: 3,
        }
    }
];