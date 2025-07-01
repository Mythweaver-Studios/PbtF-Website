# CharacterList Page Architecture Guide

## Purpose
This document explains the refactored file structure and data flow for the `CharacterList` page. The goal of this architecture is to improve maintainability, readability, and scalability by separating concerns.

## Structure Overview
The page is broken down into several key parts:
- A main **Page Component** (`CharacterList.jsx`) that acts as an orchestrator.
- A custom **Hook** (`useCharacterFilters.js`) that contains all the complex state and logic.
- Several self-contained **UI Components**, each with its own specific job.

```
CharacterList/
├── CharacterList.jsx         # The main page layout component.
├── CharacterList.css         # Styles for the page layout.
│
├── components/                 # UI components used only by this page.
│   │
│   ├── CharacterFilters/       # Component for all filter controls (dropdown, buttons).
│   │   ├── CharacterFilters.jsx
│   │   └── CharacterFilters.css
│   │
│   ├── CharacterGrid/          # Component for the character grid display.
│   │   ├── CharacterGrid.jsx
│   │   └── CharacterGrid.css
│   │
│   ├── CharacterGridCard/      # Component for a single character card in the grid.
│   │   ├── CharacterGridCard.jsx
│   │   └── CharacterGridCard.css
│   │
│   └── CharacterDetailModal/   # Component for the detailed character pop-up view.
│       ├── CharacterDetailModal.jsx
│       ├── CharacterDetailModal.css
│       │
│       └── effects/            # Folder for all background visual effects used in the modal.
│           ├── Soon to be many .jsx & .css
│
│
└── hooks/                      # Reusable logic for this page.
    └── useCharacterFilters.js  # The "brain" managing all filter/sort state and logic.
```

## Component Breakdown

1.  **`CharacterList.jsx` (The Orchestrator)**
    -   Its only job is to manage the overall page layout.
    -   It calls the `useCharacterFilters` hook to get all the necessary data and functions.
    -   It then passes this data down as props to its child components (`CharacterFilters` and `CharacterGrid`).

2.  **`hooks/useCharacterFilters.js` (The Brain)**
    -   This custom hook holds all the state for this feature (`tierFilter`, `sortAZ`, `characterList`).
    -   It contains all the `useEffect` logic that calculates the filtered and sorted list of characters.
    -   It returns the current state and functions to update that state (e.g., `setTierFilter`, `clearFilters`).

3.  **`components/CharacterFilters/CharacterFilters.jsx` (The Controls)**
    -   This is a "dumb" UI component. It receives the current filter state and handler functions as props.
    -   It is responsible for displaying the dropdowns and buttons.
    -   When a user interacts with a control, it calls the appropriate function passed down from the parent (e.g., `onTierChange`).

4.  **`components/CharacterGrid/CharacterGrid.jsx` (The Display)**
    -   This is also a "dumb" UI component. Its only job is to receive an array of characters and render them using `CharacterGridCard`.
    -   It also handles the logic for what happens when a card is clicked (either opening the modal or clearing filters).

5.  **`components/CharacterDetailModal/` (The Detail View)**
    -   This component is responsible for displaying the detailed pop-up panel for a selected character.
    -   It conditionally renders visual background effects (from the `effects/` sub-folder) based on the character's data.

## Data Flow
The data flows in a one-way circle, which is easy to follow:
1.  **`CharacterList`** calls `useCharacterFilters` to get state and functions.
2.  State and functions are passed down to **`CharacterFilters`** as props.
3.  User interacts with **`CharacterFilters`** (e.g., selects a tier).
4.  This calls a function (e.g., `setTierFilter`) that lives in **`useCharacterFilters`**.
5.  The state inside **`useCharacterFilters`** updates, causing it to recalculate the character list.
6.  The new list is passed back up to **`CharacterList`**, which then re-renders **`CharacterGrid`** with the updated data.

This pattern ensures that our logic is centralized and our UI components are simple and predictable.