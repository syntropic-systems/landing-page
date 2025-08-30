# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 14 landing page application built with TypeScript, React 18, and Tailwind CSS. The project uses the App Router pattern and includes a comprehensive shadcn/ui component library.

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

Note: The project has ESLint and TypeScript build errors disabled in `next.config.mjs` (ignoreDuringBuilds: true, ignoreBuildErrors: true). Consider these settings when making changes.

## Architecture & Structure

### Core Technologies
- **Framework**: Next.js 14 with App Router
- **UI Components**: shadcn/ui components in `components/ui/`
- **Styling**: Tailwind CSS with custom configuration
- **Forms**: react-hook-form with zod validation
- **Animations**: Framer Motion
- **Email**: EmailJS for contact forms
- **Icons**: Lucide React and Heroicons

### Directory Structure
- `/app` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with theme provider
  - `page.tsx` - Homepage component
  - `globals.css` - Global styles and Tailwind directives
- `/components` - React components
  - `/ui` - shadcn/ui reusable components (50+ components)
  - `/pages/home` - Homepage-specific components
    - `/bento` - Bento grid feature components
- `/lib` - Utility functions
  - `utils.ts` - Contains `cn()` helper for className merging
- `/public` - Static assets
  - `/images`, `/logos`, `/workflow-animation`

### Key Patterns

1. **Component Imports**: Use `@/` path alias for absolute imports (configured in tsconfig.json)
2. **Styling**: Use Tailwind utility classes with `cn()` helper from `lib/utils`
3. **Theming**: CSS variables defined in globals.css, consumed via Tailwind config
4. **Component Structure**: shadcn/ui components follow consistent patterns with forwardRef and variant props

### Theme System
The app uses CSS custom properties for theming with light/dark mode support:
- Theme provider wraps the app in `components/theme-provider.tsx`
- Color variables defined in `app/globals.css`
- Consumed through Tailwind config (`tailwind.config.ts`)

### Form Handling
Forms use react-hook-form with zod schemas for validation. See `demo-request-form.tsx` for reference implementation.

## 🚨 CRITICAL STYLING GUIDELINES - NEVER BREAK THESE RULES 🚨

### Design System Consistency

#### Color Usage - MANDATORY
- **ALWAYS** use CSS variables from `globals.css` through Tailwind classes
- **NEVER** hardcode hex/rgb/hsl colors directly in components
- **Primary brand colors**: `--brand-1` through `--brand-5` 
- **Theme colors**: Use semantic names (`primary`, `secondary`, `foreground`, `background`, `muted`)
- **Status colors**: Use predefined success/error variables
- **FORBIDDEN**: Creating new color values without adding to the design system

#### Spacing & Layout - STRICT RULES
- **ALWAYS** use Tailwind spacing scale (p-4, m-8, gap-6)
- **NEVER** use arbitrary values unless absolutely necessary
- **Responsive design**: MANDATORY mobile-first approach
  - Start with base (mobile) styles
  - Add `md:`, `lg:`, `xl:` prefixes for larger screens
- **Container max-width**: 1320px for content sections
- **Section padding**: Consistent `px-4 md:px-6 lg:px-8`
- **FORBIDDEN**: Inline styles for spacing

#### Typography - ENFORCE CONSISTENCY
- **ALWAYS** use Typography components from `components/ui/typography.tsx`
- **Font sizes**: Use Tailwind's text scale (`text-sm`, `text-base`, `text-lg`)
- **Font weights**: Stick to `font-normal`, `font-medium`, `font-semibold`, `font-bold`
- **Line heights**: Use `leading-tight`, `leading-normal`, `leading-relaxed`
- **NEVER** mix font families - use system fonts defined in tailwind.config.ts
- **FORBIDDEN**: Custom font-size values without design system approval

### Component Styling Rules

#### Class Organization - REQUIRED ORDER
1. Layout classes (flex, grid, position)
2. Spacing classes (padding, margin)
3. Sizing classes (width, height)
4. Typography classes
5. Color classes (background, text, border)
6. Effects (shadow, blur, opacity)
7. Transitions and animations
8. Responsive modifiers (md:, lg:)

Example:
```tsx
className="flex items-center justify-between p-4 w-full text-base text-foreground bg-surface rounded-lg shadow-sm transition-colors hover:bg-accent md:p-6"
```

#### Component Variants - USE CVA
- **ALWAYS** use `class-variance-authority` (cva) for component variants
- **NEVER** use conditional className strings
- Define all variants in a single `cva()` call
- Include `defaultVariants` for every component

#### State Styling - BEST PRACTICES
- **Hover states**: Use `hover:` prefix with subtle changes
- **Focus states**: MANDATORY `focus-visible:` with ring styles
- **Disabled states**: Use `disabled:opacity-50 disabled:pointer-events-none`
- **Active states**: Use `active:` for click feedback
- **NEVER** remove focus indicators for accessibility

### Accessibility - NON-NEGOTIABLE

#### ARIA Requirements
- **ALWAYS** include proper ARIA labels for interactive elements
- **MANDATORY** `aria-label` or `aria-labelledby` for icon-only buttons
- **REQUIRED** `role` attributes where semantic HTML isn't sufficient
- **Screen readers**: Add `sr-only` class for visually hidden but readable text

#### Keyboard Navigation
- **MANDATORY** keyboard support for all interactive elements
- **Tab order**: Logical flow with proper `tabIndex` when needed
- **Focus trapping**: Required for modals and dropdowns
- **Escape key**: Must close overlays/modals

#### Color Contrast
- **MINIMUM** WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
- **Test** all color combinations for sufficient contrast
- **NEVER** rely solely on color to convey information

### Performance Optimization

#### CSS Best Practices
- **ALWAYS** use Tailwind's built-in classes over custom CSS
- **PURGE** unused CSS in production (handled by Tailwind)
- **Avoid** complex selectors and deep nesting
- **Minimize** use of `@apply` directive

#### Animation Guidelines
- **PREFER** CSS transforms over position changes
- **USE** `will-change` sparingly and remove after animation
- **LIMIT** animations on mobile devices
- **MANDATORY** `prefers-reduced-motion` respect

### Dark Mode Support
- **ALWAYS** test components in both light and dark modes
- **USE** CSS variables that automatically adapt
- **NEVER** hardcode colors that break in dark mode
- **TEST** contrast ratios in both modes

### Responsive Design Requirements

#### Breakpoints - STRICT USAGE
- **Mobile**: Default (< 640px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)
- **Large Desktop**: `xl:` (≥ 1280px)
- **NEVER** use arbitrary breakpoint values

#### Mobile-First Approach
- **START** with mobile layout
- **PROGRESSIVELY** enhance for larger screens
- **TEST** on actual devices, not just browser DevTools
- **ENSURE** touch targets are minimum 44x44px

### Code Quality Standards

#### Import Organization
1. React and Next.js imports
2. External libraries
3. Internal components (use `@/` alias)
4. Types and interfaces
5. Utils and helpers
6. Styles (if any)

#### Component Structure
1. Type definitions
2. Component variants (cva)
3. Component definition with forwardRef
4. Display name assignment
5. Exports

#### Naming Conventions
- **Components**: PascalCase
- **Files**: kebab-case
- **CSS classes**: Use Tailwind utilities only
- **FORBIDDEN**: BEM or other CSS methodologies

### Testing Requirements
- **VISUAL** regression testing for UI changes
- **ACCESSIBILITY** testing with screen readers
- **RESPONSIVE** testing across all breakpoints
- **PERFORMANCE** testing with Lighthouse

### Documentation
- **COMMENT** complex styling logic
- **DOCUMENT** new design tokens in this file
- **MAINTAIN** Storybook for component library (if applicable)

## 🔴 VIOLATIONS WILL NOT BE TOLERATED 🔴

Breaking these guidelines will result in:
1. Code review rejection
2. Required refactoring before merge
3. Potential breaking of the production build

**REMEMBER**: Consistency > Creativity. Follow the established patterns without exception.

## Important Configuration

- **TypeScript**: Strict mode enabled, uses `@/*` path alias
- **Tailwind**: Custom color system using CSS variables, container configuration
- **Next.js**: Images unoptimized, ESLint/TypeScript errors ignored during build
- We will be making lots of UI chnmages section by section. Make surre to create the page for it and follow the global fonts and styling. Aftereach implementation use playwright mcp server to check the implemetation. Dev server is always running. No need to run it.