# Publishing and Management Guide

This document outlines the process for publishing and managing the website using Cloudflare.

## Hosting Platform: Cloudflare Pages

We use **Cloudflare Pages** for hosting our website. It is a JAMstack platform for frontend developers to collaborate and deploy websites. The free tier is perfectly suited for our needs, offering generous build limits, automatic SSL, and a global CDN for fast load times.

## Prerequisites

1.  **A Cloudflare Account**: You need a free Cloudflare account.
2.  **A Purchased Domain**: A `.com` domain should be purchased from a registrar (e.g., Namecheap, GoDaddy, or Cloudflare Registrar).
3.  **Git Repository**: The project must be hosted on a Git provider like GitHub, GitLab, or Bitbucket.

## Deployment Steps

### 1. Add Your Domain to Cloudflare

-   Log in to your Cloudflare dashboard.
-   Click "Add a Site" and enter your purchased domain name (e.g., `your-game.com`).
-   Cloudflare will scan your existing DNS records. Click continue.
-   You will be prompted to change your domain's nameservers at your registrar to point to Cloudflare's nameservers. This process can take up to 24 hours to propagate.

### 2. Create a Cloudflare Pages Project

1.  In the Cloudflare dashboard, navigate to **Workers & Pages**.
2.  Click on **Create application** and select the **Pages** tab.
3.  Click **Connect to Git** and authorize Cloudflare to access your Git provider account.
4.  Select the repository for this project.

### 3. Configure Build Settings

Once the repository is selected, you need to configure the build settings. Cloudflare is excellent at detecting React projects, but it's best to confirm the settings:

-   **Project name**: Choose a name for your project.
-   **Production branch**: Set this to `main` (or your primary branch).
-   **Framework preset**: Select **Create React App**.
-   **Build command**: `npm run build`
-   **Build output directory**: `build`

After confirming the settings, click **Save and Deploy**. Cloudflare will pull your code, build the project, and deploy it to a unique `.pages.dev` subdomain.

### 4. Set Up Custom Domain

1.  Once the first deployment is successful, navigate to your new Pages project's settings.
2.  Go to the **Custom domains** tab.
3.  Click **Set up a domain** and enter your purchased domain that you've already added to Cloudflare.
4.  Cloudflare will automatically validate and configure the necessary DNS records to point your domain to the Pages deployment.

## Continuous Deployment

Cloudflare Pages is configured for continuous deployment. This means every time you `git push` a new commit to your production branch (`main`), Cloudflare will automatically trigger a new build and deploy the latest version of the site. No manual intervention is needed after the initial setup.