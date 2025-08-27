# Local Development Setup

This guide will walk you through setting up the project for local development.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/) (v18 or later recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js) or another package manager like [Yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/).

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd landing-page
    ```

2.  **Install dependencies:**

    Open your terminal in the project root directory and run one of the following commands, depending on your package manager:

    Using npm:
    ```bash
    npm install
    ```

    Using Yarn:
    ```bash
    yarn install
    ```

    Using pnpm:
    ```bash
    pnpm install
    ```

## Running the Development Server

Once the dependencies are installed, you can start the local development server:

Using npm:
```bash
npm run dev
```

Using Yarn:
```bash
yarn dev
```

Using pnpm:
```bash
pnpm dev
```

This will start the Vite development server. You can now open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`) to see the application running. The server supports Hot Module Replacement (HMR), so any changes you make to the source code will be reflected in the browser automatically. 