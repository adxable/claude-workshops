# Step 1: Project Setup

## Goal
Initialize a new Vite + React + TypeScript project with pnpm, configure Tailwind CSS, and set up Biome for code quality.

## Files to Create/Modify
- `package.json`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.node.json`
- `tailwind.config.js`
- `postcss.config.js`
- `biome.json`
- `src/index.css`
- `src/main.tsx`
- `src/App.tsx`
- `index.html`

## Step-by-Step Instructions

### 1. Create Vite Project
```bash
pnpm create vite@latest . --template react-ts
```

### 2. Install Core Dependencies
```bash
pnpm install
```

### 3. Install Tailwind CSS
```bash
pnpm add -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 4. Install Additional Dependencies
```bash
pnpm add react-router-dom framer-motion lucide-react
pnpm add -D @types/node
```

### 5. Install and Configure Biome
```bash
pnpm add -D @biomejs/biome
```

### 6. Configure Tailwind
Update `tailwind.config.js`:
```javascript
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Custom colors will be added
      },
    },
  },
  plugins: [],
}
```

### 7. Add Tailwind to CSS
Update `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 8. Configure Biome
Create `biome.json`:
```json
{
  "$schema": "https://biomejs.dev/schemas/1.9.4/schema.json",
  "organizeImports": { "enabled": true },
  "linter": {
    "enabled": true,
    "rules": { "recommended": true }
  },
  "formatter": {
    "enabled": true,
    "indentStyle": "tab"
  }
}
```

### 9. Add Scripts to package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "biome lint ./src",
    "format": "biome format --write ./src",
    "check": "biome check --write ./src"
  }
}
```

## Verification
1. Run `pnpm dev` - should start dev server
2. Run `pnpm build` - should build successfully
3. Run `pnpm lint` - should pass with no errors
4. Browser shows React + Vite starter page

## Next Step
Proceed to Step 2: Base Layout
