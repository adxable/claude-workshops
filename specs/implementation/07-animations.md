# Step 7: Animations

## Goal
Add Framer Motion animations for slide transitions, component reveals, and micro-interactions.

## Files to Create/Modify
- `src/components/layout/SlideLayout.tsx` (update)
- `src/components/common/AnimatedList.tsx` (new)
- Various slide components (updates)

## Step-by-Step Instructions

### 1. Slide Transition Animation
Update SlideLayout to animate slide changes:

```tsx
import { AnimatePresence, motion } from 'framer-motion';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

export function SlideLayout({ children, slideId }: Props) {
  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={slideId}
        custom={direction}
        variants={slideVariants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

### 2. Staggered List Animation
Create reusable AnimatedList component:

```tsx
// src/components/common/AnimatedList.tsx
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export function AnimatedList({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {React.Children.map(children, child => (
        <motion.div variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
```

### 3. Card Hover Effects
Add hover animations to cards:

```tsx
<motion.div
  whileHover={{
    scale: 1.02,
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
  }}
  whileTap={{ scale: 0.98 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
  {/* Card content */}
</motion.div>
```

### 4. Text Reveal Animation
For headings and important text:

```tsx
const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

<motion.h1
  variants={textVariants}
  initial="hidden"
  animate="visible"
>
  Heading Text
</motion.h1>
```

### 5. Progress Bar Animation
Animate the progress bar on slide change:

```tsx
<motion.div
  className="h-1 bg-purple-500"
  initial={{ width: 0 }}
  animate={{ width: `${(currentSlide / totalSlides) * 100}%` }}
  transition={{ duration: 0.3 }}
/>
```

### 6. Workflow Diagram Animations
- Sequential step highlighting
- Pulsing active step
- Flowing arrow animation

```tsx
// Pulse animation for active step
<motion.div
  animate={{
    boxShadow: [
      '0 0 0 0 rgba(124, 58, 237, 0.4)',
      '0 0 0 20px rgba(124, 58, 237, 0)',
    ],
  }}
  transition={{ repeat: Infinity, duration: 1.5 }}
/>
```

### 7. Code Block Typing Effect (Optional)
For demo slides, show code appearing as if typed:

```tsx
const [displayedCode, setDisplayedCode] = useState('');

useEffect(() => {
  let i = 0;
  const interval = setInterval(() => {
    setDisplayedCode(code.slice(0, i));
    i++;
    if (i > code.length) clearInterval(interval);
  }, 30);
  return () => clearInterval(interval);
}, [code]);
```

## Animation Guidelines

1. **Duration**: Keep animations short (200-400ms)
2. **Easing**: Use `easeInOut` or `spring` for natural feel
3. **Purpose**: Every animation should serve a purpose
4. **Performance**: Use `transform` and `opacity` for 60fps
5. **Accessibility**: Respect `prefers-reduced-motion`

```tsx
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;
```

## Verification
1. Slide transitions are smooth
2. Cards animate on hover
3. Lists stagger in nicely
4. Progress bar animates
5. No janky or stuttering animations
6. Reduced motion is respected

## Next Step
Proceed to Step 8: Polish & Deploy
