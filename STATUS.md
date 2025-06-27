





███╗░░░███╗██╗░░░██╗████████╗██╗░░██╗░██╗░░░░░░░██╗███████╗░█████╗░██╗░░░██╗███████╗██████╗░  ██╗███╗░░██╗░█████╗░░░░
████╗░████║╚██╗░██╔╝╚══██╔══╝██║░░██║░██║░░██╗░░██║██╔════╝██╔══██╗██║░░░██║██╔════╝██╔══██╗  ██║████╗░██║██╔══██╗░░░
██╔████╔██║░╚████╔╝░░░░██║░░░███████║░╚██╗████╗██╔╝█████╗░░███████║╚██╗░██╔╝█████╗░░██████╔╝  ██║██╔██╗██║██║░░╚═╝░░░
██║╚██╔╝██║░░╚██╔╝░░░░░██║░░░██╔══██║░░████╔═████║░██╔══╝░░██╔══██║░╚████╔╝░██╔══╝░░██╔══██╗  ██║██║╚████║██║░░██╗░░░
██║░╚═╝░██║░░░██║░░░░░░██║░░░██║░░██║░░╚██╔╝░╚██╔╝░███████╗██║░░██║░░╚██╔╝░░███████╗██║░░██║  ██║██║░╚███║╚█████╔╝██╗
╚═╝░░░░░╚═╝░░░╚═╝░░░░░░╚═╝░░░╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚══════╝╚═╝░░╚═╝░░░╚═╝░░░╚══════╝╚═╝░░╚═╝  ╚═╝╚═╝░░╚══╝░╚════╝░╚═╝

File Managed by Solo™ only.




# Project Status & Roadmap

This document provides an overview of the current status of the project and outlines future development plans.

## Current Status (As of June 26th, 2025)

-   **Overall**: The website is feature-complete for its initial version and is ready for live deployment. All core pages and components are functional.
-   **Frontend**: The site is a **client-side React Single Page Application (SPA)**, built and served as a static site.
-   **Backend**: There is **no dedicated backend** for the website at this time.
-   **Content Management**: All site content is static and managed directly within the source code (`News.json`, `charactersData.js`, etc.).
-   **Interactivity**: The "Beta Signup" button is currently disabled but is the highest priority for the next phase of development.

## Roadmap & Future Plans

Our goal is to evolve the website into a more dynamic and interactive platform.

### 1. Beta Signup System Implementation (High Priority)

-   **Goal**: To allow interested players to sign up for the first game playtest.
-   **Plan**:
    -   Enable the "Beta Signup" button on the Home page.
    -   Create a system to collect a user's email address.
    -   Implement an email verification step to ensure the address is valid.
    -   Store the verified emails securely. These emails will later be used to grant access to the game's first playtest build, which will likely be distributed via Steam.
-   **Technical Note**: This requires a simple backend service for the website, which is separate from the game's server architecture (SpaceTimeDB).

### 2. Headless CMS Integration

-   **Goal**: To allow non-developers to update site content (news, character bios) without needing to modify and redeploy the entire application.
-   **Plan**: Integrate a headless CMS (e.g., Strapi, Sanity). The frontend will be updated to fetch content from the CMS's API endpoints.

### 3. Analytics Integration

-   **Goal**: Gain insights into website traffic and user behavior.
-   **Plan**: Implement an analytics service. **Cloudflare Web Analytics** will be the first choice due to its privacy focus and ease of integration. We will explore other options only if more detailed behavioral tracking is required.

### 4. Automated Testing in CI/CD

-   **Goal**: Improve code quality and prevent regressions.
-   **Plan**: Enhance the continuous deployment pipeline to run Jest and React Testing Library tests automatically before any new deployment goes live.
