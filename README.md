# COOLTEXT
A browser-based text editor designed to be a Progressive Web Application (PWA). Create, edit, and store your notes or code snippets even when you're offline!

## Features

- **Offline Support**: Craft notes or code snippets without needing an internet connection.
- **Data Persistence**: Multiple data persistence techniques ensuring your data is safe and accessible.
- **IndexedDB Integration**: Uses the lightweight `idb` package for storing and retrieving data, trusted by companies like Google and Mozilla.
- **Service Worker**: Boosts performance by caching static assets.
- **Installable**: Can be downloaded and installed on your desktop for easier access.

## Getting Started

1. **Clone the Repository**  
   It's crucial to clone the starter code repository and then create your own repository with it. Do **NOT** directly fork the starter code repository.

   ```bash
   git clone (https://github.com/OKJay50/COOLTEXT.git)

  # Installation
Navigate to the root directory and install the necessary packages:

```bash
Copy code
npm install
Running the Application
Start both the backend and frontend by running:

```bash
Copy code
npm run start
Webpack Bundling
This app leverages Webpack for bundling JavaScript files. Run Webpack plugins to generate the required HTML file, service worker, and manifest file.

# Deploying
Follow the Heroku Deployment Guide for deploying the full-stack application.

# Usage
Open the application in your preferred browser.
IndexedDB will automatically create a database storage for you.
Start typing your notes or code snippets.
Your content will be saved automatically with IndexedDB when you click outside the DOM window.
To install the application on your desktop, click on the "Install" button.
Deployment
The application is deployed on Heroku. Check the live version here.
Contributing
We welcome contributions! Please see the contributing guide for details.

# License
This project is licensed under the MIT License. See the LICENSE file for details.

