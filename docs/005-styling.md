# Styling

The project employs a modern and robust styling architecture that combines the power of CSS Modules for component-level styles with the flexibility of a utility-first approach for global styles.

## Styling Strategy

The styling strategy is based on three main pillars:

1.  **Design Tokens:** A comprehensive set of design tokens is defined in `src/styles/globals.css` using CSS custom properties. This ensures a consistent design system across the entire application.
2.  **CSS Modules:** Each component has its own `*.module.css` file, which scopes the styles to that component. This prevents naming collisions and makes the styles more maintainable.
3.  **Utility Classes:** A set of global utility classes is defined in `src/styles/utilities.css`. These classes can be used for common styling tasks, such as layout, typography, and colors.

## `globals.css`

This file is the foundation of the styling system. It contains:

*   **Resets and Base Styles:** A set of CSS resets and base styles to ensure a consistent look and feel across different browsers.
*   **Design Tokens:** A comprehensive set of design tokens for:
    *   Colors
    *   Gradients
    *   Typography (including fluid typography with `clamp()`)
    *   Spacing
    *   Shadows
    *   Border Radius
    *   Transitions
    *   Z-index
*   **Global Element Styles:** Basic styles for HTML elements like `h1`, `p`, and `a`.

## `utilities.css`

This file provides a set of utility classes that can be used to apply common styles directly in the JSX. This is similar to a utility-first CSS framework like Tailwind CSS, but in a more lightweight form. The utility classes cover:

*   Layout (Flexbox and Grid)
*   Spacing (margin and padding)
*   Typography
*   Colors
*   and more...

## CSS Modules

Each component has its own `*.module.css` file. This is the primary way that components are styled.

*   **Scoped Styles:** CSS Modules automatically generate unique class names for each component, which means you don't have to worry about class name collisions.
*   **Component-Level Styling:** The styles for a component are co-located with the component itself, which makes it easy to understand and maintain the component's styling.

## Styling Workflow

The typical styling workflow is as follows:

1.  **Component Structure:** The main layout and structure of a component are defined in its CSS Module.
2.  **Fine-Tuning:** Utility classes are used for fine-tuning the styles, such as adjusting spacing or colors.
3.  **Design System:** All styles are based on the design tokens defined in `globals.css`, which ensures consistency.

This hybrid approach to styling provides the best of both worlds: the encapsulation and maintainability of CSS Modules, and the flexibility and speed of a utility-first approach. 