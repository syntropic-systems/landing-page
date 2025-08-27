# Screenshot Generation

The project includes a utility script for automatically generating screenshots of the landing page. This is a very useful feature for documentation, testing, and marketing purposes.

## The `screenshot.js` Script

The script is located at the root of the project and is named `screenshot.js`. It uses the Puppeteer library to control a headless Chrome browser and take screenshots.

## How it Works

1.  **Launch Puppeteer:** The script launches a headless Chrome browser.
2.  **Navigate to URL:** It navigates to the URL provided as a command-line argument.
3.  **Wait for Content:** The script is cleverly designed to handle the dynamic and animated nature of the landing page. It waits for the network to be idle, for the main content to appear, and then slowly scrolls through the page. This ensures that all the animations are triggered and all the lazy-loaded content is loaded before the screenshot is taken.
4.  **Take Screenshots:** The script takes two types of screenshots:
    *   A **full-page screenshot** of the entire landing page.
    *   A **viewport-sized screenshot** of the visible portion of the page.
5.  **Save Screenshots:** The screenshots are saved in the `screenshots` directory with a timestamp in the filename.

## Usage

To use the script, you first need to have the development server running. Then, you can run the script from the command line and pass it the URL of the running application.

```bash
# First, start the development server
npm run dev

# In a new terminal, run the screenshot script
node screenshot.js http://localhost:5173
```

This will generate two new screenshot files in the `screenshots` directory.

## Key Features

*   **Puppeteer:** Uses Puppeteer for accurate, browser-based rendering.
*   **Handles Dynamic Content:** Intelligently waits for animations and lazy-loaded content to ensure a complete screenshot.
*   **Multiple Screenshot Types:** Generates both full-page and viewport screenshots.
*   **Timestamped Filenames:** Keeps screenshots organized with timestamped filenames.

This script is a great example of how to use headless browsers to automate tasks and improve the development workflow. 