import { motion } from 'framer-motion'
import {
	ArrowRight,
	Bot,
	FileText,
	GitCommit,
	GitPullRequest,
	Link,
} from 'lucide-react'

const commitExample = `feat(cart): add shopping cart with checkout

- Created Zustand store for cart state
- Built CartItem and CartList components
- Implemented checkout flow with validation
- Added cart badge to header

Co-Authored-By: Claude <noreply@anthropic.com>`

const prDescription = `## Summary
- Add shopping cart functionality
- Implement checkout with Stripe
- Cart persists across sessions

## Test Plan
- [x] Add items to cart
- [x] Remove items from cart
- [x] Complete checkout flow
- [x] Verify persistence`

export default function GitWorkflowSlide() {
	return (
		<div className="space-y-6 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-rose-500/20 text-orange-400 mb-4">
					<GitCommit className="w-4 h-4" />
					<span className="text-sm font-medium">Phase 6 & 7</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">/commit</span> &{' '}
					<span className="text-gradient">/pr</span>
				</h2>
				<p className="text-muted-foreground text-lg">
					Ship your work with proper documentation
				</p>
			</motion.div>

			{/* Two commands */}
			<div className="grid md:grid-cols-2 gap-6">
				{/* Commit */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.2 }}
					className="space-y-4"
				>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/50 flex items-center justify-center">
							<GitCommit className="w-5 h-5 text-orange-400" />
						</div>
						<div>
							<code className="text-lg font-mono text-orange-400">/commit</code>
							<p className="text-sm text-muted-foreground">
								Smart commit messages
							</p>
						</div>
					</div>

					<div className="p-4 rounded-xl bg-card border border-border">
						<div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
							<Bot className="w-4 h-4" />
							<span>Auto-generated message:</span>
						</div>
						<pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
							{commitExample}
						</pre>
					</div>

					<div className="flex flex-wrap gap-2">
						{['Conventional format', 'Descriptive body', 'Co-Authored-By'].map(
							(tag) => (
								<span
									key={tag}
									className="px-2 py-1 rounded bg-orange-500/10 border border-orange-500/30 text-xs text-orange-400"
								>
									{tag}
								</span>
							),
						)}
					</div>
				</motion.div>

				{/* PR */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
					className="space-y-4"
				>
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-lg bg-rose-500/20 border border-rose-500/50 flex items-center justify-center">
							<GitPullRequest className="w-5 h-5 text-rose-400" />
						</div>
						<div>
							<code className="text-lg font-mono text-rose-400">/pr</code>
							<p className="text-sm text-muted-foreground">
								Create PR with description
							</p>
						</div>
					</div>

					<div className="p-4 rounded-xl bg-card border border-border">
						<div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
							<FileText className="w-4 h-4" />
							<span>Auto-generated PR:</span>
						</div>
						<pre className="text-xs font-mono text-muted-foreground whitespace-pre-wrap">
							{prDescription}
						</pre>
					</div>

					<div className="flex flex-wrap gap-2">
						{['Summary section', 'Test plan', 'Auto-push', 'Returns link'].map(
							(tag) => (
								<span
									key={tag}
									className="px-2 py-1 rounded bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400"
								>
									{tag}
								</span>
							),
						)}
					</div>
				</motion.div>
			</div>

			{/* Flow */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
				className="flex items-center justify-center gap-4 p-4 rounded-xl bg-card border border-border"
			>
				<div className="flex items-center gap-2">
					<GitCommit className="w-5 h-5 text-orange-400" />
					<span className="text-sm">Stage & Commit</span>
				</div>
				<ArrowRight className="w-4 h-4 text-muted-foreground" />
				<div className="flex items-center gap-2">
					<GitPullRequest className="w-5 h-5 text-rose-400" />
					<span className="text-sm">Push & Create PR</span>
				</div>
				<ArrowRight className="w-4 h-4 text-muted-foreground" />
				<div className="flex items-center gap-2">
					<Link className="w-5 h-5 text-green-400" />
					<span className="text-sm text-green-400">PR Link returned</span>
				</div>
			</motion.div>
		</div>
	)
}
