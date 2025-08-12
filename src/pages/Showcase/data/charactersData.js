// src/pages/Showcase/data/charactersData.js

// Image imports
import Character1Img from "../../../assets/images/characters/noire_full.png";
import Character1Thumb from "../../../assets/images/characters/noire_thumb.png";
// import Character2Img from "../../../assets/images/characters/yanyan_full.png";
// import Character2Thumb from "../../../assets/images/characters/yanyan_thumb.png";
import Character3Img from "../../../assets/images/characters/benedict_full.png";
import Character3Thumb from "../../../assets/images/characters/benedict_thumb.png";
import Character4Img from "../../../assets/images/characters/oriane_full2.png";
import Character4Thumb from "../../../assets/images/characters/oriane_thumb.png";
import Character5Img from "../../../assets/images/characters/alzarich_full.png";
import Character5Thumb from "../../../assets/images/characters/alzarich_thumb.png";
import Character10Img from "../../../assets/images/characters/seralyth_full.png";
import Character10Thumb from "../../../assets/images/characters/seralyth_thumb.png";

import voicelineManifest from '../../../assets/audio/voiceline-manifest.json';

const createPlaceholderTimedQuote = (quote) => {
    return quote.replace(/[^a-zA-Z\s']/g, "").split(' ').map(word => ({ word, duration: 500 }));
};

// --- TIMED VOICELINE DATA ---
// The keys here MUST EXACTLY MATCH the audio filenames.
const VOICELINE_DATA = {
    benedict: {
        "EvenFlameNeedsAPauseToBurnBrighter.wav": {
            quote: "Even flame... needs a pause to burn brighter.",
            timedQuote: [{ "word": "Even", "duration": 1559 }, { "word": "flame", "duration": 596 }, { "word": "needs", "duration": 233 }, { "word": "a", "duration": 141 }, { "word": "pause", "duration": 598 }, { "word": "to", "duration": 102 }, { "word": "burn", "duration": 606 }, { "word": "brighter", "duration": 771 }]
        },
        "OneStepThenAnother.wav": {
            quote: "One step... then another... that's all it ever is...",
            timedQuote: [{ "word": "One", "duration": 769 }, { "word": "step", "duration": 522 }, { "word": "then", "duration": 1071 }, { "word": "another", "duration": 530 }, { "word": "that's", "duration": 956 }, { "word": "all", "duration": 336 }, { "word": "it", "duration": 172 }, { "word": "ever", "duration": 233 }, { "word": "is", "duration": 522 }]
        },
        "DrawFirstIfYouMustButStrikeLast.wav": {
            quote: "Draw first if you must, but strike. last.",
            timedQuote: [{ "word": "Draw", "duration": 622 }, { "word": "first", "duration": 517 }, { "word": "if", "duration": 232 }, { "word": "you", "duration": 181 }, { "word": "must", "duration": 512 }, { "word": "but", "duration": 555 }, { "word": "strike", "duration": 412 }, { "word": "last", "duration": 1234 }]
        }
    },
    seralyth: {
        "IWouldntReallyCallMyselfAFighter.wav": {
            quote: "Me? I wouldn't really call myself a fighter but, I can turn people around me, into one.",
            timedQuote: [{ "word": "Me", "duration": 728 }, { "word": "I", "duration": 1016 }, { "word": "wouldn't", "duration": 311 }, { "word": "really", "duration": 316 }, { "word": "call", "duration": 314 }, { "word": "myself", "duration": 49 }, { "word": "a", "duration": 350 }, { "word": "fighter", "duration": 497 }, { "word": "but", "duration": 495 }, { "word": "I", "duration": 696 }, { "word": "can", "duration": 221 }, { "word": "turn", "duration": 229 }, { "word": "people", "duration": 669 }, { "word": "around", "duration": 267 }, { "word": "me", "duration": 240 }, { "word": "into", "duration": 383 }, { "word": "one", "duration": 362 }],
        },
        "WhenDidMonstersBecomeThisWeak.wav": {
            quote: "When did monsters become this weak?",
            timedQuote: [{ "word": "When", "duration": 321 }, { "word": "did", "duration": 179 }, { "word": "monsters", "duration": 614 }, { "word": "become", "duration": 487 }, { "word": "this", "duration": 372 }, { "word": "weak", "duration": 522 }],
        }
    }
};

const getVoiceLinesFor = (characterName) => {
    const charKey = characterName.toLowerCase();
    const files = voicelineManifest[charKey] || [];
    const characterData = VOICELINE_DATA[charKey];

    if (!characterData) return [];

    return files.map((file) => {
        const filename = decodeURIComponent(file.split('/').pop());
        const data = characterData[filename];

        if (!data) {
            console.warn(`Data for voiceline "${filename}" not found in charactersData.js.`);
            return {
                quote: `Quote for ${filename} not found...`,
                audioSrc: file,
                timedQuote: createPlaceholderTimedQuote('Quote not found'),
            };
        }

        return {
            quote: data.quote,
            audioSrc: file,
            timedQuote: data.timedQuote || createPlaceholderTimedQuote(data.quote),
        };
    });
};

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
        world: "Unknown",
        description:
            "A living weapon forged in darkness, she broke her chains and vanished after claiming her revenge. Her purpose is now her own, a mystery to all who cross her path.",
        longDescription: `Born into captivity under the Fourfold Circle's black market, she was a nameless child taken from the ruins of forgotten villages. Stripped of identity and forged through relentless training, she was starved of kindness and saturated with violence, honed into a perfect weapon. Her masters carved skill into her bones, obedience into her mind, and death into her hands. Each mission survived reinforced a single truth: she was replaceable, a shadow meant to fight till she broke. In the Circle's cold halls, affection was treason, and failure meant erasure.\n\nBut even a broken blade can turn. Captured after a mission and marked for execution by her masters, she bit through her own hand to escape. Slowly, each of her captors met a gruesome death. Some say she perished after her revenge. Others whispered she joined Echo of a Dream. But no one knows.`,
        image: Character1Img,
        thumbnail: Character1Thumb,
        accentColor: "#8b9ff2",
        tier: 4, // Epic
        specialEffect: 'shadow',
        showcaseStyles: {
            transform: 'scale(1.1) translateY(18px)',
        },
        modalStyles: {
            transform: 'scale(1.45) translateY(5px)',
        },
        stats: { Strength: 4, Intelligence: 3, HP: 2, Dexterity: 5, Mana: 1 },
        hasVoiceLines: false,
    },
    {
        id: 2,
        name: "YanYan",
        fullName: "YanYan, Blade of the Azure",
        title: "The Azure Tempest",
        class: "Unknown",
        species: "Human",
        gender: "Female",
        world: "Unknown",
        description:
            "A master of elemental sword arts who strikes like a storm. Once a disciple of a legendary order, she now walks a solitary path as a relic diver, seeking the power to challenge fate itself.",
        longDescription: `Swift as a crashing wave and sharp as lightning's edge, Yanyan is a master of the elemental sword arts, a relentless duelist who moves like water and strikes like a storm. A former disciple of a legendary order, she now walks her own path as a relic diver, chasing echoes of forgotten worlds and impossible truths.\n\nQuiet, focused, and driven by something she never speaks of, Yanyan carries more than just a blade. She seeks not only ancient power, but a way to challenge the very currents of fate.`,
        image: null,
        thumbnail: null,
        accentColor: "#d3e5fe",
        tier: 3, // Rare
        specialEffect: 'water',
        statsBlurred: true,
        showcaseStyles: {
            transform: 'scale(1) translateY(-12px)',
        },
        stats: { Strength: 2, Intelligence: 4, HP: 3, Dexterity: 4, Mana: 4 },
        hasVoiceLines: false,
    },
    {
        id: 3,
        name: "Benedict",
        fullName: "Sir Benedict the Bright",
        title: "Brightblade of Auravell",
        class: "Paladin",
        species: "Human",
        gender: "Male",
        world: "Unknown",
        description:
            "A paladin sculpted into a perfect blade, he sacrificed love and peace for duty. Now he walks a solitary path toward a fate he knows he cannot avoid.",
        longDescription: `Benedict is a warrior born in a crucible of flame, a paladin whose soul has been scoured clean of love, peace, and doubt. Chosen from a young age and raised without compassion, he was sculpted into a perfect blade, a Bright Lord meant to illuminate the world's darkest hours.\n\nUnder his helmet and shimmering armor lies a man who has given up everything in service of his duty. His past is marked by sacrifice and regret, love turned ashes, and comrades fallen by his side. His future promises only a solitary path, a showdown against a fate he cannot avoid.`,
        appearanceDescription: "A holy knight encased in a full suit of immaculate, off-white plate armor with ornate gold trim and blue cloth underneath. His face is completely hidden by a full helm. A large, eight-pointed star is emblazoned on his chestplate, and a halo of light floats behind his head, complemented by a pair of large, radiant golden wings.",
        image: Character3Img,
        thumbnail: Character3Thumb,
        accentColor: "rgba(255, 255, 0, 0.8)",
        tier: 5, // Legendary
        specialEffect: 'holyFlame',
        statsBlurred: true,
        stats: { Strength: 4, Intelligence: 2, HP: 5, Dexterity: 1, Mana: 3 },
        hasVoiceLines: true,
        voiceLines: getVoiceLinesFor('benedict'),
        voiceActor: {
            name: "Nathan Wagner",
            url: "https://www.nathanwagnervo.com/",
        },
    },
    {
        id: 4,
        name: "Oriane",
        fullName: "Unknown",
        title: "???",
        class: "Unknown",
        species: "Unknown",
        gender: "Female",
        world: "Unknown",
        description: "The identity and purpose of this individual are yet to be revealed.",
        longDescription: "[[Further details about this enigmatic figure are shrouded in mystery, waiting to be unveiled.]]",
        appearanceDescription: "A celestial being with angelic wings and a halo, both appearing to be made of living flame. She has long, wavy white hair that transitions into fire at the ends. Her eyes are a warm, glowing orange. She wears an elegant, form-fitting white dress with gold trim and a plunging neckline, which dissolves into a fiery red gradient at the hem.",
        image: Character4Img,
        thumbnail: Character4Thumb,
        accentColor: "#ff7b00",
        tier: 6, // Mythic
        statsBlurred: true,
        stats: { Strength: 0, Intelligence: 0, HP: 0, Dexterity: 0, Mana: 0 },
        hasVoiceLines: false,
    },
    {
        id: 5,
        name: "Alzarich",
        fullName: "Unknown",
        title: "???",
        class: "Unknown",
        species: "Unknown",
        gender: "Male",
        world: "Unknown",
        description: "The identity and purpose of this individual are yet to be revealed.",
        longDescription: "[[Further details about this enigmatic figure are shrouded in mystery, waiting to be unveiled.]]",
        appearanceDescription: "A young man with black hair and determined blue eyes, clad in a full suit of ornate, light-gray plate armor with intricate gold trim and purple accents. A long purple cape, bearing a golden griffin emblem, flows from his shoulders. His helmet and boots are adorned with elegant wing motifs.",
        image: Character5Img,
        thumbnail: Character5Thumb,
        accentColor: "#6a0dad",
        tier: 7, // Empyrean
        modalStyles: {
            transform: 'scale(1.15) translateY(12px)',
        },
        statsBlurred: true,
        stats: { Strength: 0, Intelligence: 0, HP: 0, Dexterity: 0, Mana: 0 },
        hasVoiceLines: false,
    },
    {
        id: 6,
        name: "Seralyth",
        fullName: "Unknown",
        title: "???",
        class: "Unknown",
        species: "Unknown",
        gender: "Female",
        world: "Unknown",
        description: "The identity and purpose of this individual are yet to be revealed.",
        longDescription: "[[Further details about this enigmatic figure are shrouded in mystery, waiting to be unveiled.]]",
        appearanceDescription: "An elegant woman with serene blue eyes and light blue hair styled in a bob, with a longer section tied back. A distinctive tattoo marks her face below her left eye. She is dressed in a sophisticated white robe with deep blue and gold lining, featuring a high collar and a large celestial crest on the back.",
        image: Character10Img,
        thumbnail: Character10Thumb,
        accentColor: "#00b5ad",
        tier: 6, // Mythic
        statsBlurred: true,
        stats: { Strength: 0, Intelligence: 0, HP: 0, Dexterity: 0, Mana: 0 },
        hasVoiceLines: true,
        voiceLines: getVoiceLinesFor('seralyth'),
        voiceActor: {
            name: "Sullivan Clare Williams",
            url: "https://www.castingcall.club/Sullivanwilliams",
        },
        gridCardStyles: {
            transform: 'scale(1.2)',
            objectPosition: '50% 20%', // Focus more on the upper part of the image
        },
    },
    {
        id: 7,
        name: "Valkara",
        fullName: "Unknown",
        title: "???",
        class: "Unknown",
        species: "Unknown",
        gender: "Female",
        world: "Unknown",
        description: "The identity and purpose of this individual are yet to be revealed.",
        longDescription: "[[Further details about this enigmatic figure are shrouded in mystery, waiting to be unveiled.]]",
        appearanceDescription: "A powerfully built woman with tanned skin and brown hair tied in a practical ponytail. Her body is a map of her history, marked by numerous scars. She wears a simple black crop top and shorts, covered by a heavy brown cloak. Her hands and forearms are wrapped in white bandages, and an eyepatch covers her left eye.",
        image: null,
        thumbnail: null,
        accentColor: "#c0c0c0",
        tier: 5, // Legendary
        statsBlurred: true,
        stats: { Strength: 0, Intelligence: 0, HP: 0, Dexterity: 0, Mana: 0 },
        hasVoiceLines: false,
    },
    {
        id: 8,
        name: "Ragna",
        fullName: "Unknown",
        title: "???",
        class: "Unknown",
        species: "Unknown",
        gender: "Male",
        world: "Unknown",
        description: "The identity and purpose of this individual are yet to be revealed.",
        longDescription: "[[Further details about this enigmatic figure are shrouded in mystery, waiting to be unveiled.]]",
        appearanceDescription: "A towering, pale-skinned man with a gaunt face, piercing red eyes, and short black horns. His muscular, bare-chested torso is adorned with floating pieces of dark, segmented armor around his midsection. He wears dark leggings with scale-like patterns and a red sash, his forearms wrapped in dark fabric.",
        image: null,
        thumbnail: null,
        accentColor: "#e53935",
        tier: 5, // Legendary
        statsBlurred: true,
        stats: { Strength: 0, Intelligence: 0, HP: 0, Dexterity: 0, Mana: 0 },
        hasVoiceLines: false,
    },
    {
        id: 9,
        name: "Roxan Everblack",
        fullName: "Unknown",
        title: "???",
        class: "Unknown",
        species: "Unknown",
        gender: "Female",
        world: "Unknown",
        description: "The identity and purpose of this individual are yet to be revealed.",
        longDescription: "[[Further details about this enigmatic figure are shrouded in mystery, waiting to be unveiled.]]",
        appearanceDescription: "A woman with voluminous black hair adorned with braids and gold rings, and striking green eyes. She wears a romantic-era white blouse with large, transparent sleeves under a laced black corset. Her attire is completed with dark shorts, a layered dark green skirt open at the front, and various chains and accessories, giving her a practical yet stylish look.",
        image: null,
        thumbnail: null,
        accentColor: "#7e57c2",
        tier: 4, // Epic
        statsBlurred: true,
        stats: { Strength: 0, Intelligence: 0, HP: 0, Dexterity: 0, Mana: 0 },
        hasVoiceLines: false,
    },
        {
        id: 10,
        name: "Sylvia Bloodfallen",
        fullName: "Unknown",
        title: "???",
        class: "Unknown",
        species: "Unknown",
        gender: "Female",
        world: "Unknown",
        description: "The identity and purpose of this individual are yet to be revealed.",
        longDescription: "[[Further details about this enigmatic figure are shrouded in mystery, waiting to be unveiled.]]",
        appearanceDescription: "Unknown",
        image: null,
        thumbnail: null,
        accentColor: "#ff7a7aff",
        tier: 5, // Legendary
        statsBlurred: true,
        stats: { Strength: 0, Intelligence: 0, HP: 0, Dexterity: 0, Mana: 0 },
        hasVoiceLines: false,
    }
];