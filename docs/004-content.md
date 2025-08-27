# Content Management

A key architectural feature of this project is the separation of content from the presentation layer. All the text, images, and other content for the landing page are stored in JSON files, which are then fetched and rendered by the React components. This approach makes it incredibly easy to update the content without needing to modify the application's code.

## The `content` Directory

All the content files are located in the `content` directory. Each major component or section of the landing page has its own corresponding JSON file.

*   `navbar.json`
*   `hero.json`
*   `trustbar.json`
*   `services.json`
*   `features.json`
*   `demo.json`
*   `testimonials.json`
*   `footer.json`

## The `useContent` Hook

The `useContent` hook is a custom React hook that is responsible for fetching and managing the content from the JSON files.

*   **Location:** `src/hooks/useContent.ts`
*   **Functionality:**
    *   It takes the filename of the JSON file as an argument.
    *   It uses the `fetch` API to make a request to the `/content/<filename>` endpoint.
    *   It parses the JSON response and returns the data to the component.
    *   It uses React's `useState` and `useEffect` hooks to manage the loading state of the content.
    *   It is a generic hook that can be used to fetch any type of content, with type safety provided by a generic type parameter.

## TypeScript Types

To ensure type safety, all the content structures are defined as TypeScript interfaces in the `src/types/content.ts` file. This allows for autocompletion and compile-time checks, which helps to prevent errors and improve the developer experience.

## Content Workflow

The overall workflow for content is as follows:

1.  **Content Creation:** Content is written and structured in the appropriate JSON file in the `content` directory.
2.  **Type Definition:** The structure of the JSON is defined as a TypeScript interface in `src/types/content.ts`.
3.  **Content Fetching:** The component calls the `useContent` hook with the filename and the appropriate type.
4.  **Content Rendering:** The component receives the content from the hook and renders it.

This content management strategy is a powerful and flexible way to build a content-driven website. It makes the application more maintainable, scalable, and easier to update. 