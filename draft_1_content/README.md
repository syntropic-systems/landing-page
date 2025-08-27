# Draft 1 Content README

This directory contains the JSON files for the first draft of the new landing page content, based on the `Draft 1.md` document.

## JSON Files

Here is a breakdown of each JSON file and the expected frontend changes:

### `navbar.json`

- **Purpose:** Defines the new navigation structure.
- **Code Changes:** The Navbar component needs to be updated to handle dropdowns dynamically. The content for the dropdowns themselves will likely need to be fetched or defined elsewhere.

### `hero.json`

- **Purpose:** Content for the main hero section.
- **Code Changes:** The Hero component should be updated to display the new title, subtitle, and buttons. It should also include a video player on the right side. The design reference is [Aceternity UI Spotlight](https://ui.aceternity.com/components/spotlight-new).

### `comparison.json`

- **Purpose:** The "WITH US / WITHOUT US" section.
- **Code Changes:** A new or updated Comparison component is needed to display this in a clear, two-column format.

### `workflow.json`

- **Purpose:** Content for "The CloudGlance Intelligence Workflow" section.
- **Code Changes:** This will require a new component that can render a three-part animated flow diagram, as described. The reference image and link (aitenders.com) should be consulted for the visual style.

### `features.json`

- **Purpose:** The "Revolutionary Features" section, split into two parts.
- **Code Changes:** The Features component will need a significant update to handle the two-part structure. Each part should be visually distinct, as shown in the reference images from asana.com.

### `technology.json`

- **Purpose:** The "RAG-Powered Difference" section.
- **Code Changes:** A new Technology component is needed. It should display the four points in a grid, with each point clearly showing the "Problem" and "Solution." The design should be inspired by the Aceternity UI grid and the Cryptgen template.

### `solutions.json`

- **Purpose:** The "Solutions for Every Role" section.
- **Code Changes:** A new component is needed to display the roles and their benefits, likely in a visually engaging way like a tabbed interface or an interactive grid.

### `testimonials.json`

- **Purpose:** The new customer comment section.
- **Code Changes:** This will replace the old testimonials section. A new component is needed that can display a single, prominent testimonial with an "overlay" feel, as seen on taplio.com.

### `faq.json`

- **Purpose:** The Frequently Asked Questions section.
- **Code Changes:** The FAQ component should be updated to render a list of questions and answers. Each question should be expandable/collapsible, with a chevron icon and a bottom divider, as per the reference images.

### `contact.json`

- **Purpose:** The final contact section.
- **Code Changes:** A new Contact component is needed with a form. The form should be built to handle the fields defined in the JSON. The design should be inspired by the Aceternity UI contact sections.

## General Notes

- The "Trusted by" logo marquee section should be omitted for now.
- All new components should be built with responsiveness in mind. We will follow a mobile first display model.
- The reference links and images in `Draft 1.md` should be used as a guide for the visual implementation.
