# Design System

## Color Palette

### Background Colors
```css
--background: 222.2 84% 4.9%;      /* Near black */
--card: 222.2 84% 6.9%;            /* Slightly lighter */
--muted: 217.2 32.6% 17.5%;        /* Muted surfaces */
```

### Foreground Colors
```css
--foreground: 210 40% 98%;         /* Primary text */
--muted-foreground: 215 20.2% 65%; /* Secondary text */
```

### Accent Colors (Claude Branding)
```css
--primary: 262 83% 58%;            /* Purple - #7C3AED */
--primary-light: 270 80% 70%;      /* Light purple */
--accent-blue: 217 91% 60%;        /* Blue accent */
--gradient: linear-gradient(135deg, #7C3AED 0%, #3B82F6 100%);
```

### Semantic Colors
```css
--success: 142 76% 36%;            /* Green */
--warning: 38 92% 50%;             /* Amber */
--error: 0 84% 60%;                /* Red */
--info: 199 89% 48%;               /* Sky blue */
```

## Typography

### Font Stack
```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Font Sizes (Presentation Optimized)
```css
--text-xs: 0.875rem;     /* 14px - small labels */
--text-sm: 1rem;         /* 16px - body small */
--text-base: 1.125rem;   /* 18px - body */
--text-lg: 1.25rem;      /* 20px - large body */
--text-xl: 1.5rem;       /* 24px - small heading */
--text-2xl: 1.875rem;    /* 30px - heading */
--text-3xl: 2.25rem;     /* 36px - large heading */
--text-4xl: 3rem;        /* 48px - slide title */
--text-5xl: 3.75rem;     /* 60px - hero */
```

### Font Weights
- Regular (400): Body text
- Medium (500): Emphasis
- Semibold (600): Subheadings
- Bold (700): Headings

## Spacing

Using Tailwind's default scale:
- `space-1`: 4px
- `space-2`: 8px
- `space-4`: 16px
- `space-6`: 24px
- `space-8`: 32px
- `space-12`: 48px
- `space-16`: 64px

### Slide Layout
- Padding: 48px (space-12) on all sides
- Max content width: 1200px
- Centered horizontally

## Border Radius
```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;
```

## Shadows
```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
--shadow-glow: 0 0 20px rgba(124, 58, 237, 0.3);
```

## Animation Principles

### Duration
- **Fast**: 150ms - hover effects, small UI
- **Normal**: 300ms - transitions, reveals
- **Slow**: 500ms - slide transitions, large animations

### Easing
```css
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Animation Patterns
1. **Slide Transitions**: Fade + slight horizontal movement
2. **Card Reveals**: Staggered fade-up from bottom
3. **Hover Effects**: Scale (1.02) + shadow increase
4. **Workflow Steps**: Sequential highlight with glow

## Component Patterns

### Cards
- Background: `--card` color
- Border: 1px `--border` color
- Border radius: `--radius-lg`
- Padding: 24px
- Hover: Subtle border color change + shadow

### Buttons
- Primary: Gradient background, white text
- Secondary: Transparent, border, muted text
- Ghost: No background, hover shows muted bg

### Code Blocks
- Background: Darker than card
- Font: Monospace
- Line numbers: Muted color
- Syntax colors: VS Code Dark+ inspired
