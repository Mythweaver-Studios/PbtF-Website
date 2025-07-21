// src/pages/Showcase/data/charactersData.js

// Image imports
import Character1Img from "../../../assets/images/characters/noire_full.png";
import Character1Thumb from "../../../assets/images/characters/noire_thumb.png";
import Character2Img from "../../../assets/images/characters/yanyan_full.png";
import Character2Thumb from "../../../assets/images/characters/yanyan_thumb.png";
import Character3Img from "../../../assets/images/characters/benedict_full.png";
import Character3Thumb from "../../../assets/images/characters/benedict_thumb.png";

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
            timedQuote: [{ "word": "Even", "duration": 1683 }, { "word": "flame", "duration": 267 }, { "word": "needs", "duration": 758 }, { "word": "a", "duration": 271 }, { "word": "pause", "duration": 437 }, { "word": "to", "duration": 219 }, { "word": "burn", "duration": 288 }, { "word": "brighter", "duration": 225 }]
        },
        "OneStepThenAnother.wav": {
            quote: "One step... then another... that's all it ever is...",
            timedQuote: [{ "word": "One", "duration": 999 }, { "word": "step", "duration": 302 }, { "word": "then", "duration": 1000 }, { "word": "another", "duration": 370 }, { "word": "that's", "duration": 1356 }, { "word": "all", "duration": 295 }, { "word": "it", "duration": 362 }, { "word": "ever", "duration": 211 }, { "word": "is", "duration": 377 }]
        },
        "DrawFirstIfYouMustButStrikeLast.wav": {
            quote: "Draw first if you must, but strike. last.",
            timedQuote: [{ "word": "Draw", "duration": 798 }, { "word": "first", "duration": 285 }, { "word": "if", "duration": 330 }, { "word": "you", "duration": 174 }, { "word": "must", "duration": 161 }, { "word": "but", "duration": 639 }, { "word": "strike", "duration": 522 }, { "word": "last", "duration": 902 }]
        }
    },
    seralyth: {
        "Seralyth_About Self Line.wav": {
            quote: "Me? I wouldn't really call myself a fighter but, I can turn people around me, into one.",
            timedQuote: [{ "word": "Me", "duration": 493 }, { "word": "I", "duration": 1033 }, { "word": "wouldn't", "duration": 160 }, { "word": "really", "duration": 90 }, { "word": "call", "duration": 415 }, { "word": "myself", "duration": 416 }, { "word": "a", "duration": 352 }, { "word": "fighter", "duration": 413 }, { "word": "but", "duration": 325 }, { "word": "I", "duration": 936 }, { "word": "can", "duration": 299 }, { "word": "turn", "duration": 92 }, { "word": "people", "duration": 399 }, { "word": "around", "duration": 483 }, { "word": "me", "duration": 229 }, { "word": "into", "duration": 527 }, { "word": "one", "duration": 232 }],
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
            transform: 'scale(1.10) translateY(-20px)',
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
        longDescription: `Swift as a crashing wave and sharp as lightning�s edge, Yanyan is a master of the elemental sword arts, a relentless duelist who moves like water and strikes like a storm. A former disciple of a legendary order, she now walks her own path as a relic diver, chasing echoes of forgotten worlds and impossible truths.\n\nQuiet, focused, and driven by something she never speaks of, Yanyan carries more than just a blade. She seeks not only ancient power, but a way to challenge the very currents of fate.`,
        image: Character2Img,
        thumbnail: Character2Thumb,
        accentColor: "#d3e5fe",
        tier: 3, // Rare
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
        accentColor: "rgba(191, 191, 191, 0.8)",
        tier: 5, // Legendary
        statsBlurred: true,
        stats: { Strength: 4, Intelligence: 2, HP: 5, Dexterity: 1, Mana: 3 },
        hasVoiceLines: true,
        voiceLines: getVoiceLinesFor('benedict'),
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
        image: null,
        thumbnail: null,
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
        image: null,
        thumbnail: null,
        accentColor: "#6a0dad",
        tier: 7, // Empyrean
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
        image: null,
        thumbnail: null,
        accentColor: "#00b5ad",
        tier: 6, // Mythic
        statsBlurred: true,
        stats: { Strength: 0, Intelligence: 0, HP: 0, Dexterity: 0, Mana: 0 },
        hasVoiceLines: true,
        voiceLines: getVoiceLinesFor('seralyth'),
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
    }
];