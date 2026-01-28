import { motion } from 'framer-motion'
import {
	Brain,
	CheckSquare,
	FileText,
	FolderTree,
	Lightbulb,
	Search,
} from 'lucide-react'

const planOutput = `# Plan: Add Shopping Cart

**Type:** Feature
**Created:** 2026-01-20

## Goal
Add shopping cart with add/remove items

## Files to Create/Modify
| File | Action | Purpose |
|------|--------|---------|
| src/stores/cart.ts | Create | Zustand store |
| src/components/Cart.tsx | Create | Cart UI |
| src/hooks/useCart.ts | Create | Cart hook |

## Implementation Steps
1. Create cart store with Zustand
2. Build CartItem component
3. Add to product pages
4. Implement checkout flow`

export default function PlanCommandSlide() {
	return (
		<div className="space-y-6 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 mb-4">
					<Lightbulb className="w-4 h-4" />
					<span className="text-sm font-medium">Phase 1</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">/plan</span>
				</h2>
				<p className="text-muted-foreground text-lg">
					Research first, implement later
				</p>
			</motion.div>

			{/* Command */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="flex justify-center"
			>
				<code className="px-6 py-3 rounded-xl bg-card border border-border font-mono text-lg">
					<span className="text-purple-400">/plan</span>{' '}
					<span className="text-muted-foreground">
						add shopping cart with checkout
					</span>
				</code>
			</motion.div>

			<div className="grid md:grid-cols-2 gap-6">
				{/* What happens */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
					className="space-y-4"
				>
					<h3 className="font-medium flex items-center gap-2">
						<Brain className="w-5 h-5 text-purple-400" />
						What Happens
					</h3>

					<div className="space-y-3">
						{[
							{
								icon: Search,
								text: 'Explorer agent scans codebase',
								color: 'text-purple-400',
							},
							{
								icon: FolderTree,
								text: 'Finds similar patterns & files',
								color: 'text-blue-400',
							},
							{
								icon: FileText,
								text: 'Creates detailed plan in .claude/plans/',
								color: 'text-green-400',
							},
							{
								icon: CheckSquare,
								text: 'Lists files, steps, verification',
								color: 'text-amber-400',
							},
						].map((item, i) => (
							<motion.div
								key={item.text}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.4 + i * 0.1 }}
								className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border"
							>
								<item.icon className={`w-5 h-5 ${item.color}`} />
								<span className="text-sm">{item.text}</span>
							</motion.div>
						))}
					</div>

					<div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
						<div className="text-xs text-muted-foreground mb-1">Agent Used</div>
						<div className="flex items-center gap-2">
							<span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-xs font-mono">
								explorer
							</span>
							<span className="text-xs text-muted-foreground">
								(Haiku - fast & cheap)
							</span>
						</div>
					</div>
				</motion.div>

				{/* Output example */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.4 }}
				>
					<h3 className="font-medium flex items-center gap-2 mb-4">
						<FileText className="w-5 h-5 text-green-400" />
						Output: plan-shopping-cart.md
					</h3>
					<div className="p-4 rounded-xl bg-card border border-border overflow-auto max-h-80">
						<pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
							{planOutput}
						</pre>
					</div>
				</motion.div>
			</div>

			{/* Tip */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.7 }}
				className="text-center text-sm text-muted-foreground"
			>
				Review the plan before running{' '}
				<code className="text-blue-400">/implement</code>
			</motion.div>
		</div>
	)
}
