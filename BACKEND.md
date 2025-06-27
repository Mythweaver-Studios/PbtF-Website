# 𝕄𝕪𝕥𝕙𝕨𝕖𝕒𝕧𝕖𝕣 𝕀𝕟𝕔.

File Managed by Solo™ only.

# Backend Development Guide

## Current Status

**This project currently has no dedicated backend.**

The application is a pure client-side **Single Page Application (SPA)** served as static files. All data is bundled with the frontend.

## Future Plans

The immediate backend development priority is to support the beta signup functionality.

### 1. Beta Signup Service

This will be the first backend service for the website. Its sole purpose is to handle user signups for the game's playtest.

-   **Functionality Required**:
    1.  An API endpoint to receive an email address from the frontend signup form.
    2.  A mechanism to generate a unique verification token and send a confirmation email to the user.
    3.  A second endpoint to handle the verification link clicked by the user.
    4.  A secure database to store the verified email addresses.

-   **Proposed Technologies**:
    -   **API/Logic**: Serverless functions are the ideal choice for this task due to their low cost and scalability. Candidates include **Cloudflare Workers** or **AWS Lambda**.
    -   **Database**: A simple, low-maintenance database is sufficient. Candidates include Cloudflare's **KV Store** (for temporary tokens) and **D1** (for storing verified emails), or a similar managed NoSQL/SQL database.

-   **Important Distinction**: The backend for this website is **entirely separate** from the game's backend. The game itself uses **SpaceTimeDB** for its server and database needs, but SpaceTimeDB will **not** be used for any website functionality.

### 2. Headless CMS

Following the implementation of the beta signup, the next major backend-related task will be the integration of a headless CMS as described in the `STATUS.md` file.
