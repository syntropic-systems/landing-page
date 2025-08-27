# Animations

The project makes extensive use of animations to create a dynamic and engaging user experience. The animations are primarily handled by the `framer-motion` library, with `react-intersection-observer` used to trigger animations when elements scroll into view.

## `framer-motion`

`framer-motion` is a popular and powerful animation library for React. It provides a simple and declarative API for creating complex animations.

*   **Usage:**
    *   Most of the animated elements are wrapped in a `motion` component (e.g., `motion.div`).
    *   The `initial`, `animate`, and `transition` props are used to define the animation.
    *   `initial`: The initial state of the animation (e.g., `opacity: 0`, `y: 20`).
    *   `animate`: The final state of the animation (e.g., `opacity: 1`, `y: 0`).
    *   `transition`: The timing and easing of the animation (e.g., `duration`, `delay`, `ease`).

## `react-intersection-observer`

`react-intersection-observer` is a React hook that makes it easy to use the Intersection Observer API. It's used to detect when a component is visible in the viewport.

*   **Usage:**
    *   The `useInView` hook is called in a component, which returns a `ref` and an `inView` boolean.
    *   The `ref` is attached to the component's root element.
    *   The `inView` boolean is used to conditionally trigger the `framer-motion` animation.
    *   The `triggerOnce` option is set to `true` to ensure the animation only runs once.

## Animation Patterns

The project uses a few common animation patterns:

*   **Fade In and Slide Up:** This is the most common animation, used for section headers and content blocks. Elements start with a lower opacity and a slight vertical offset, and then animate to their final position.
*   **Staggered Animations:** For lists or grids of items, a `delay` is added to the `transition` prop, with the delay increasing for each item. This creates a pleasing "stagger" or "ripple" effect.
*   **Scroll-Based Animation:** The `Services` section features a more complex scroll-based animation. It uses a scroll event listener to track the scroll progress within the section and updates the displayed image accordingly. This creates a flipbook-style animation as the user scrolls.
*   **Continuous Animations:** The `Hero` section features floating shapes with continuous, looping animations.

The combination of `framer-motion` and `react-intersection-observer` is a very effective and performant way to add animations to a React application. The animations in this project are well-executed and add a lot of personality to the landing page. 