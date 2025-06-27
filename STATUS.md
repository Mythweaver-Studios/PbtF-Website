# Project Status & Roadmap

This document provides an overview of the current status of the project and outlines future development plans.

## Current Status (As of June 26)

-   **Overall**: The website is feature-complete for its initial version and is ready for live deployment. All core pages and components are functional.
-   **Frontend**: The site is a **client-side React Single Page Application (SPA)**. It is built to be served as a static site.
-   **Backend**: There is **no dedicated backend**. The application is entirely self-contained.
-   **Content Management**: All site content is currently static and managed directly within the source code.
    -   **News**: Managed via the static `/src/pages/News/data/News.json` file.
    -   **Characters**: Managed via the static `/src/pages/Showcase/data/charactersData.js` file.
    -   **Other Text**: Page-specific text (like Story and Features) is hardcoded in their respective data files.
-   **Interactivity**: The "Beta Signup", "Watch Trailer", and "Add to Wishlist" buttons on the Home page are currently disabled as they require backend functionality that is not yet implemented.

## Roadmap & Future Plans

Our goal is to evolve the website into a more dynamic and easily manageable platform.

### 1. Headless CMS Integration

-   **Goal**: To decouple content from the codebase, allowing non-developers (like writers or community managers) to update site content without needing to modify and redeploy the entire application.
-   **Plan**: We will integrate a **headless CMS** (Content Management System). Content such as news articles, character profiles, and feature descriptions will be moved to the CMS.
-   **Technology Candidates**: Strapi, Sanity, Contentful.

### 2. API-Driven Content

-   **Goal**: Fetch all dynamic content from an external API instead of local static files.
-   **Plan**: Once the headless CMS is set up, the frontend will be updated to fetch data from the CMS's API endpoints using `fetch` or a library like `axios`. This will make the site's content dynamic.

### 3. Backend for User Interaction

-   **Goal**: Enable functionality for the interactive buttons on the Home page.
-   **Plan**:
    -   **Beta Signup / Wishlist**: Implement a simple backend service or integrate with a third-party mailing list provider (e.g., Mailchimp) to handle email signups.
    -   This will likely involve creating a small serverless function (e.g., Cloudflare Workers) to process form submissions securely.

### 4. Analytics

-   **Goal**: Gain insights into website traffic and user behavior.
-   **Plan**: Integrate a privacy-focused analytics service (like Plausible or Fathom), or Google Analytics. Integration will fully respect the user's choices from the cookie consent banner.

### 5. Automated Testing in CI/CD

-   **Goal**: Improve code quality and prevent regressions.
-   **Plan**: Enhance the current continuous deployment pipeline on Cloudflare Pages to run our Jest and React Testing Library tests automatically before any new deployment goes live.