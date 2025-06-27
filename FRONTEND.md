# Frontend Development Guide

This document outlines the architecture, conventions, and key concepts of the frontend application.

## 1. Core Technologies

-   **React**: The core JavaScript library for building the user interface.
-   **React Router (`react-router-dom`)**: Used for client-side routing and navigation between pages.
-   **CSS**: Standard CSS is used for styling, with a component-based approach. No CSS-in-JS libraries or pre-processors (like Sass) are currently in use.

## 2. Project Structure

The project follows a standard Create React App structure, with key conventions:

-   **`/src/components`**: Contains reusable UI components that are shared across multiple pages (e.g., `NavBar`, `Footer`, `CookieBanner`).
-   **`/src/pages`**: Contains top-level components that represent a full page or view (e.g., `Home`, `Showcase`). These components are responsible for composing the layout of a page using smaller, reusable components.
-   **Component Co-location**: Each component or page typically resides in its own folder, containing its JSX file, its dedicated CSS file, and any sub-components or data files it exclusively uses.

## 3. Styling

Our styling approach is designed for maintainability and consistency.

-   **Component-Scoped CSS**: Each component has its own `.css` file (e.g., `NavBar.css`). This keeps styles organized and relevant to the component they style, reducing the risk of global style conflicts.
-   **Global Styles & Theming (`Default.css`)**: Located in `/src/components/Default.css`, this file serves two purposes:
    1.  **Global Resets**: Basic CSS resets (`box-sizing`, `margin`, `padding`) are defined here.
    2.  **CSS Custom Properties (Variables)**: All theme-related values (colors, gradients, border styles) are defined as CSS variables in the `:root` pseudo-class. This allows for easy theme management and consistent styling across the entire application. Components should use these variables (e.g., `color: var(--theme-text-primary);`) instead of hardcoded values.

## 4. State Management

The application currently relies on React's built-in hooks for state management:

-   **`useState`**: Used for managing local component state (e.g., toggling a modal, handling form inputs).
-   **`useEffect`**: Used for handling side effects, such as fetching data (in the future), setting up event listeners, or reacting to changes in props or state.

There is no global state management library (like Redux or Zustand) as the current application complexity does not require it.

## 5. Data Handling

All application data is currently static and bundled with the frontend at build time.

-   **Data Location**: Data is stored in `.js` or `.json` files, typically within a `data` subfolder of the page that uses it (e.g., `/src/pages/Showcase/data/charactersData.js`).
-   **Usage**: Components import this data directly and render it. For example, `CharacterList.jsx` imports `charactersData` and maps over the array to create the character grid.
-   **Future State**: This is a key area for future development. The long-term plan is to replace these static imports with API calls to a headless CMS (see `STATUS.md`).