# Components

The project's components are well-structured and follow the principle of component-based architecture. They are organized into three main categories: `common`, `layout`, and `sections`.

## Component Architecture

The general architecture for each component, especially the page sections, is as follows:

1.  **Self-Contained:** Each component is a self-contained unit with its own logic, styling, and content fetching.
2.  **Content Fetching:** Components use the `useContent` hook to fetch their content from a corresponding JSON file in the `content` directory.
3.  **Styling:** Components use CSS Modules for styling, which scopes the styles to the component and prevents naming collisions.
4.  **Animations:** Components use `framer-motion` for animations and `react-intersection-observer` to trigger animations when the component enters the viewport.

## `common` Components

These are small, reusable components that form the building blocks of the UI.

### `Button`

*   **Description:** A versatile and highly customizable button component.
*   **Features:**
    *   Supports multiple visual variants (`primary`, `secondary`, `outline`, `ghost`).
    *   Supports different sizes (`small`, `medium`, `large`).
    *   Can be rendered as a `<button>` or an `<a>` tag (if an `href` prop is provided).
    *   Includes a loading state and support for an icon.

### `Card`

*   **Description:** A generic container component for displaying content in a card format.
*   **Features:**
    *   Supports different visual variants (`default`, `gradient`, `glass`).
    *   Includes an optional hover effect.

### `Badge`

*   **Description:** A component for displaying small pieces of information, like tags or statuses.
*   **Features:**
    *   Supports different visual variants and sizes.
    *   Can include an icon.

### `GradientText`

*   **Description:** A simple component for applying a gradient style to text.

## `layout` Components

These components define the overall layout and structure of the page.

### `Navbar`

*   **Description:** The main navigation bar for the application.
*   **Features:**
    *   Fully responsive with a mobile menu.
    *   Becomes "sticky" and changes appearance on scroll.
    *   Supports dropdown menus.
    *   All content is loaded from `navbar.json`.

### `Footer`

*   **Description:** The footer for the application.
*   **Features:**
    *   Organized into a multi-column grid of links.
    *   Includes a bottom section for copyright and social media links.
    *   All content is loaded from `footer.json`.

## `sections` Components

These are the major sections of the landing page. Each section is a self-contained component that fetches its own data.

*   **`Hero`**: The main hero section with a prominent call-to-action. (Note: The `HeroContent` type has been updated. `title.highlightedText` is now `title.gradientText`.)
*   **`TrustBar`**: A section to display logos of trusted partners or clients.
*   **`Comparison`**: A detailed comparison section that showcases the benefits of the product in a two-column layout.
*   **`Services`**: A section describing the services offered, with a clever scroll-based image animation.
*   **`Features`**: A section highlighting the key features, with an embedded video and an annotated image.
*   **`Demo`**: A section for a product demonstration, with a grid of demo cards.
*   **`Testimonials`**: A section for customer testimonials, displayed in a card grid.

_A new `FAQ` section is anticipated, as indicated by the addition of the `FAQContent` type._ 