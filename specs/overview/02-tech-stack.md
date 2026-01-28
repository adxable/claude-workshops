# Tech Stack

## Core Technologies

### React 19.2 + Vite
- **Why React**: Industry standard, component-based architecture, excellent ecosystem
- **Why Vite**: Fast development server, instant HMR, optimized production builds

### TypeScript
- Type safety catches errors early
- Better IDE support and autocomplete
- Self-documenting code

### pnpm
- Faster than npm/yarn
- Efficient disk space usage
- Strict dependency resolution

## UI & Styling

### shadcn/ui
- **Why**: High-quality, accessible components built on Radix UI
- **Benefit**: Copy/paste components we own, not a black-box dependency
- **Theme**: Easily customizable for our dark theme

### Tailwind CSS
- **Why**: Utility-first CSS for rapid development
- **Benefit**: Consistent spacing, colors, and responsive design
- **Dark Mode**: Built-in dark mode support via class strategy

### Lucide React
- Beautiful, consistent icon set
- Tree-shakeable for small bundle size
- Drop-in replacement for react-icons

## Animation

### Framer Motion
- **Why**: Declarative animations for React
- **Use Cases**:
  - Slide transitions
  - Workflow diagram animations
  - Card hover effects
  - Staggered list reveals

## Code Quality

### Biome
- **Why**: Fast all-in-one linter and formatter
- **Benefit**: Replaces ESLint + Prettier with single tool
- **Performance**: Written in Rust, extremely fast

## Routing

### React Router v7
- Standard routing solution for React
- Supports slide-based navigation pattern
- Programmatic navigation for keyboard controls

## Code Display

### Shiki or highlight.js
- Syntax highlighting for code blocks
- Support for multiple languages
- Theme consistency with dark mode
