# Backend Development Guide

## Current Status

**This project currently has no dedicated backend.**

## Architecture Explanation

The application is a pure client-side **Single Page Application (SPA)** built with React. The entire application is compiled into a set of static files (HTML, CSS, JavaScript) during the build process (`npm run build`).

These static files are then served by a static hosting provider, **Cloudflare Pages**. There is no server-side code, no traditional backend server, and no database connected to this project.

### Data Source

All data rendered on the site (such as news articles and character profiles) is currently stored in static `.js` and `.json` files within the `/src` directory. This data is bundled directly into the frontend application when it is built.

## Future Plans

While there is no backend at present, the project roadmap includes introducing backend functionality in the future. As outlined in the `STATUS.md` file, this will likely involve:

1.  **A Headless CMS**: To manage site content dynamically. The frontend will fetch data from the CMS via its API.
2.  **Serverless Functions**: For handling user interactions like form submissions (e.g., for a beta signup), we may use serverless functions (like Cloudflare Workers) to process data and interact with third-party services.

Any future backend development will be documented here.