# Step 4: UI Components

## Goal
Build reusable UI components: CodeBlock, TipCard, and CommandCard.

## Files to Create/Modify
- `src/components/common/CodeBlock.tsx`
- `src/components/common/TipCard.tsx`
- `src/components/workflow/CommandCard.tsx`
- Install syntax highlighting library

## Step-by-Step Instructions

### 1. Install Syntax Highlighting
```bash
pnpm add shiki
# or alternatively
pnpm add highlight.js
```

### 2. Create CodeBlock Component
Create `src/components/common/CodeBlock.tsx`:

Features:
- Syntax highlighting for multiple languages
- Dark theme matching app
- Copy to clipboard button
- Optional line numbers
- Optional filename header

```typescript
interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}
```

Example implementation:
```tsx
export function CodeBlock({ code, language = 'typescript', filename }: CodeBlockProps) {
  return (
    <div className="rounded-lg bg-zinc-900 overflow-hidden">
      {filename && (
        <div className="px-4 py-2 bg-zinc-800 text-zinc-400 text-sm font-mono">
          {filename}
        </div>
      )}
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono">{code}</code>
      </pre>
    </div>
  );
}
```

### 3. Create TipCard Component
Create `src/components/common/TipCard.tsx`:

Features:
- Icon based on category
- Title and description
- Subtle animation on hover
- Optional expandable content

```typescript
interface TipCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  category: 'prompting' | 'context' | 'workflow' | 'debugging';
}
```

Design:
```tsx
export function TipCard({ icon: Icon, title, description }: TipCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="p-6 rounded-xl bg-zinc-900/50 border border-zinc-800"
    >
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-lg bg-purple-500/20">
          <Icon className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-zinc-400 mt-1">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}
```

### 4. Create CommandCard Component
Create `src/components/workflow/CommandCard.tsx`:

Features:
- Command name with syntax highlighting
- Description
- Example usage in CodeBlock
- Tips list
- Hover effect with glow

```typescript
interface CommandCardProps {
  name: string;
  category: 'dev' | 'verify' | 'review' | 'utils';
  description: string;
  example: string;
  tips?: string[];
}
```

Design:
```tsx
export function CommandCard({ name, category, description, example }: CommandCardProps) {
  const categoryColors = {
    dev: 'text-blue-400 bg-blue-500/20',
    verify: 'text-green-400 bg-green-500/20',
    review: 'text-amber-400 bg-amber-500/20',
    utils: 'text-purple-400 bg-purple-500/20',
  };

  return (
    <div className="p-6 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-2 py-1 rounded text-xs font-mono ${categoryColors[category]}`}>
          {category}
        </span>
        <code className="text-xl font-mono font-semibold">{name}</code>
      </div>
      <p className="text-zinc-400 mb-4">{description}</p>
      <CodeBlock code={example} language="bash" />
    </div>
  );
}
```

## Verification
1. Import and render each component in a test slide
2. CodeBlock displays syntax-highlighted code
3. TipCard shows icon, title, description correctly
4. CommandCard displays all information with proper styling
5. Hover effects work smoothly

## Next Step
Proceed to Step 5: Workflow Diagram
