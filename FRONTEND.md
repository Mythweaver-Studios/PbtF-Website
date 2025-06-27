# Frontend Development Guide

This document outlines the architecture, conventions, and key concepts of the frontend application.

## 1. Core Technologies

-   **React**: The core JavaScript library for building the user interface.
-   **React Router (`react-router-dom`)**: Used for client-side routing and navigation.
-   **CSS**: Standard CSS with a component-based, modular approach.

## 2. Project Structure

-   **`/src/components`**: Contains reusable UI components shared across multiple pages (`NavBar`, `Footer`).
-   **`/src/pages`**: Contains top-level components representing a full page (`Home`, `Showcase`).
-   **Component Co-location**: Each component generally has its own folder containing its JSX, CSS, and any exclusive sub-components or data files.

## 3. Styling

-   **Component-Scoped CSS**: Each component has its own `.css` file.
-   **Global Styles & Theming (`Default.css`)**: Defines global resets and theme values (colors, gradients) as CSS Custom Properties (variables) in the `:root`. Components should always use these variables for consistency.

## 4. State Management

-   **React Hooks**: `useState` and `useEffect` are used for all local component state and side-effect management. There is currently no global state library.

## 5. Data & User Interaction

-   **Static Data**: Currently, all descriptive content (news, character bios) is stored in static `.js` and `.json` files and imported directly into components. The long-term plan is to migrate this content to a headless CMS.
-   **Future User Interaction**: The next development phase will introduce a **beta signup form**. This will involve:
    -   Creating a new React component for the signup form/modal.
    -   Implementing logic to handle form submission.
    -   Making an API call (`fetch` or `axios`) from the frontend to the future backend service to submit the user's email.
    -   Handling API responses to show success or error messages to the user.