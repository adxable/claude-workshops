import { motion } from 'framer-motion'
import { CheckCircle, Code, Globe, Loader2, Play } from 'lucide-react'

const steps = [
	{ name: 'Create cart store', file: 'src/stores/cart.ts', status: 'done' },
	{
		name: 'Build CartItem component',
		file: 'src/components/CartItem.tsx',
		status: 'done',
	},
	{
		name: 'Add Cart to header',
		file: 'src/components/Header.tsx',
		status: 'current',
	},
	{
		name: 'Implement checkout flow',
		file: 'src/pages/Checkout.tsx',
		status: 'pending',
	},
]

export default function ImplementCommandSlide() {
	return (
		<div className="space-y-6 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 mb-4">
					<Code className="w-4 h-4" />
					<span className="text-sm font-medium">Phase 2</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">/implement</span>
				</h2>
				<p className="text-muted-foreground text-lg">
					Execute the plan, step by step
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
					<span className="text-blue-400">/implement</span>{' '}
					<span className="text-muted-foreground">
						.claude/plans/plan-shopping-cart.md
					</span>
				</code>
			</motion.div>

			<div className="grid md:grid-cols-2 gap-6">
				{/* Steps visualization */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
					className="space-y-4"
				>
					<h3 className="font-medium flex items-center gap-2">
						<Play className="w-5 h-5 text-blue-400" />
						Execution Progress
					</h3>

					<div className="space-y-2">
						{steps.map((step, i) => (
							<motion.div
								key={step.name}
								initial={{ opacity: 0, x: -10 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.4 + i * 0.1 }}
								className={`flex items-center gap-3 p-3 rounded-lg border ${
									step.status === 'done'
										? 'bg-green-500/10 border-green-500/30'
										: step.status === 'current'
											? 'bg-blue-500/10 border-blue-500/30'
											: 'bg-card border-border'
								}`}
							>
								{step.status === 'done' ? (
									<CheckCircle className="w-5 h-5 text-green-400" />
								) : step.status === 'current' ? (
									<Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
								) : (
									<div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
								)}
								<div className="flex-1">
									<div className="text-sm font-medium">{step.name}</div>
									<code className="text-xs text-muted-foreground">
										{step.file}
									</code>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Features */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.4 }}
					className="space-y-4"
				>
					<h3 className="font-medium flex items-center gap-2">
						<Globe className="w-5 h-5 text-blue-400" />
						Key Features
					</h3>

					<div className="space-y-3">
						<div className="p-4 rounded-lg bg-card border border-border">
							<div className="font-medium mb-2">Sequential Execution</div>
							<p className="text-sm text-muted-foreground">
								Follows the plan step by step, ensuring each piece builds on the
								last
							</p>
						</div>

						<div className="p-4 rounded-lg bg-card border border-border">
							<div className="font-medium mb-2">Auto Type Check</div>
							<p className="text-sm text-muted-foreground">
								Runs <code className="text-green-400">tsc</code> after each file
								change to catch errors early
							</p>
						</div>

						<div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
							<div className="font-medium mb-2 flex items-center gap-2">
								<Globe className="w-4 h-4 text-blue-400" />
								Web Researcher
							</div>
							<p className="text-sm text-muted-foreground">
								If stuck, spawns{' '}
								<code className="text-blue-400">web-researcher</code> agent to
								find solutions online
							</p>
						</div>
					</div>
				</motion.div>
			</div>

			{/* Footer tip */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.7 }}
				className="text-center text-sm text-muted-foreground"
			>
				Implementation respects your stack config from{' '}
				<code className="text-indigo-400">/setup</code>
			</motion.div>
		</div>
	)
}
