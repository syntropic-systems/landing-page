# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cloud Glance Landing Page - A modern React/TypeScript landing page for an intelligent cloud infrastructure monitoring platform. Built with Vite, CSS Modules, Framer Motion, and React Intersection Observer.

## Development Commands

```bash
# Development server
npm run dev

# Production build 
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

Note: This project does not currently have test scripts configured.

## Architecture

### Tech Stack
- **Framework:** React 19 with TypeScript
- **Build Tool:** Vite 7
- **Styling:** CSS Modules with global utilities
- **Animations:** Framer Motion for animations and scroll effects
- **Scroll Detection:** React Intersection Observer
- **Content Management:** JSON-based content system with custom useContent hook

### Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Badge/       # Badge component with CSS Modules
│   │   ├── Button/      # Button variants (primary, secondary, etc.)
│   │   ├── Card/        # Card component with optional gradient borders
│   │   └── GradientText/ # Reusable gradient text effect
│   ├── layout/          # Layout components
│   │   ├── Footer/      # Site footer with responsive grid
│   │   └── Navbar/      # Navigation with mobile menu
│   └── sections/        # Page sections
│       ├── Demo/        # Product demo section
│       ├── Features/    # Features grid with benefits
│       ├── Hero/        # Hero section with floating metrics
│       ├── Services/    # Services section with scroll animations
│       ├── Testimonials/ # Customer testimonials
│       └── TrustBar/    # Client logos trust bar
├── hooks/
│   └── useContent.ts    # Custom hook for loading JSON content
├── styles/
│   ├── globals.css      # CSS variables, reset, typography
│   └── utilities.css    # Utility classes
├── types/
│   └── content.ts       # TypeScript interfaces for all content
└── assets/              # Images and static assets
```

### Content Management System

The project uses a JSON-based content system:
- Content files located in `/public/content/` and `/content/`
- Each section has corresponding TypeScript interfaces in `types/content.ts`
- Content loaded via `useContent<T>(filename)` hook
- Enables easy content updates without code changes

### Component Architecture

**Common Components:**
- Follow CSS Modules pattern with co-located `.module.css` files
- Include `index.ts` barrel exports for clean imports
- Support multiple variants through props (Button: primary/secondary/outline)
- Use TypeScript interfaces for all props

**Section Components:**
- Each section is self-contained with its own styles
- Use `useContent` hook to load section-specific data
- Implement responsive design with mobile-first approach
- Include scroll animations via Framer Motion and Intersection Observer

### Styling System

**CSS Variables (globals.css):**
- Complete design token system including colors, gradients, typography, spacing
- Dark theme first with strategic color usage
- Responsive typography using `clamp()` functions
- Comprehensive shadow, border-radius, and transition systems

**CSS Modules:**
- Scoped component styles prevent conflicts
- Consistent naming conventions
- Compose with utility classes where appropriate

**Key Design Patterns:**
- Gradient system: Primary (blue-purple), Accent (orange), Border gradients
- Animation strategy: Scroll-triggered fade-ins, floating elements, smooth transitions
- Responsive: Mobile-first with breakpoints at 640px, 768px, 1024px, 1280px, 1536px

## Development Guidelines

### Component Creation
1. Check existing patterns in `components/common/` for reusable elements
2. Use CSS Modules for component-specific styles
3. Follow TypeScript strict mode - define interfaces for all props
4. Include barrel exports (`index.ts`) for clean imports
5. Implement responsive design patterns from existing components

### Content Updates
- Modify JSON files in `/public/content/` to update page content
- Update corresponding TypeScript interfaces in `types/content.ts` when adding new fields
- Use the `useContent` hook pattern for loading data

### Styling Best Practices
- Use CSS variables from `globals.css` for consistency
- Leverage utility classes from `utilities.css` for common patterns
- Follow mobile-first responsive design
- Implement animations using Framer Motion for performance

### Performance Considerations
- Components use React 19 features where beneficial
- Images should be optimized (WebP with fallbacks)
- Lazy loading implemented for below-fold content
- CSS Modules enable automatic tree shaking