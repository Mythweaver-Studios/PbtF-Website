# Paved by the Fallen - Website

This is the official website for the game project "Paved by the Fallen". It is a client-side Single Page Application (SPA) built with React. The purpose of this site is to serve as a central hub for game information, news, character showcases, and community links.

## ✨ Features

-   **Responsive Design**: The site is designed to be accessible on a wide range of devices, from mobile phones to desktops.
-   **Component-Based Architecture**: Built with a modular structure using React components.
-   **Dynamic Routing**: Utilizes `react-router-dom` for seamless client-side navigation.
-   **Game Showcase**: Detailed sections for Story, Characters, and Features with interactive elements.
-   **Character List**: A filterable grid of all characters with detailed modal views.
-   **Cookie Consent Management**: A fully functional cookie banner and settings modal to comply with privacy regulations.
-   **Static Content**: All news and character data are currently managed via static JSON and JS files, ensuring fast load times.

## Prerequisites

To run this project locally, you will need to have the following installed on your machine:

-   [Node.js](https://nodejs.org/) (v16 or later recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)

## 🚀 Getting Started

Follow these steps to get a local copy up and running.

### 1. Clone the Repository

```sh
git clone https://github.com/ProjectPMU/Community-Service.git
cd Community-Service
```

### 2. Install Dependencies

Install all the required npm packages.

```sh
npm install
```

### 3. Run the Development Server

This command will start the application in development mode on `http://localhost:3000`. The page will auto-reload if you make edits to the source files.

```sh
npm start
```

### 4. Build for Production

This command builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

```sh
npm run build
```

The resulting static files in the `build` directory are ready for deployment.

## 🚀 Deployment

This project is configured for deployment as a static site. We use **Cloudflare Pages** for hosting. For detailed instructions on publishing, see the [PUBLISH.md](./PUBLISH.md) file.

## 📂 Project Structure

For a detailed breakdown of the folder and file structure, please see the [STRUCTURE.md](./STRUCTURE.md) file.