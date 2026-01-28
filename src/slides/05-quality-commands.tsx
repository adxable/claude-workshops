import { motion } from 'framer-motion'
import { CheckCircle, Eye, Monitor, RefreshCw } from 'lucide-react'
import { CodeBlock } from '../components/common/CodeBlock'
import { qualityCommands } from '../data/commands'

export default function QualityCommandsSlide() {
	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 mb-4">
					<CheckCircle className="w-4 h-4" />
					<span className="text-sm font-medium">Quality Assurance</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">Quality</span> Commands
				</h2>
				<p className="text-muted-foreground">
					Automated verification with fix-verify loops
				</p>
			</motion.div>

			{/* Commands */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{qualityCommands.map((cmd, index) => (
					<motion.div
						key={cmd.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 + index * 0.15 }}
						className="p-6 rounded-xl bg-card border border-border hover:border-green-500/50 transition-colors"
					>
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 rounded-lg bg-green-500/20">
								{cmd.name === '/verify' ? (
									<CheckCircle className="w-5 h-5 text-green-400" />
								) : (
									<Eye className="w-5 h-5 text-green-400" />
								)}
							</div>
							<div>
								<code className="text-xl font-mono font-semibold text-green-400">
									{cmd.name}
								</code>
								{cmd.flags && (
									<div className="flex gap-1 mt-1">
										{cmd.flags.map((flag) => (
											<span
												key={flag}
												className="px-1.5 py-0.5 rounded text-xs font-mono bg-amber-500/20 text-amber-400"
											>
												{flag}
											</span>
										))}
									</div>
								)}
							</div>
						</div>

						<p className="text-muted-foreground text-sm mb-4">
							{cmd.description}
						</p>

						<CodeBlock code={cmd.example} language="bash" />

						<ul className="mt-4 space-y-1">
							{cmd.tips.map((tip) => (
								<li
									key={tip}
									className="text-xs text-muted-foreground flex items-start gap-2"
								>
									<span className="text-green-400 mt-0.5">•</span>
									{tip}
								</li>
							))}
						</ul>
					</motion.div>
				))}
			</div>

			{/* Features */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
				className="grid grid-cols-1 md:grid-cols-2 gap-4"
			>
				<div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
					<div className="flex items-center gap-2 mb-2">
						<RefreshCw className="w-4 h-4 text-green-400" />
						<h4 className="font-semibold text-green-400">Fix-Verify Loop</h4>
					</div>
					<p className="text-sm text-muted-foreground">
						Automatically fixes issues and re-runs checks until all pass (max 5
						iterations)
					</p>
				</div>
				<div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
					<div className="flex items-center gap-2 mb-2">
						<Monitor className="w-4 h-4 text-amber-400" />
						<h4 className="font-semibold text-amber-400">Browser Testing</h4>
					</div>
					<p className="text-sm text-muted-foreground">
						Visual verification with Chrome extension - tests UI, interactions,
						and responsive design
					</p>
				</div>
			</motion.div>

			{/* Review agents */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="p-4 rounded-xl bg-card/50 border border-border"
			>
				<h4 className="font-semibold mb-3">
					/review runs 3 agents in parallel:
				</h4>
				<div className="flex flex-wrap gap-3">
					{[
						{ name: 'code-reviewer', desc: 'Types & patterns' },
						{ name: 'performance-auditor', desc: 'Bundle & re-renders' },
						{ name: 'browser-tester', desc: 'Visual verification' },
					].map((agent) => (
						<div
							key={agent.name}
							className="px-3 py-2 rounded-lg bg-card border border-border"
						>
							<span className="font-mono text-sm text-green-400">
								{agent.name}
							</span>
							<span className="text-xs text-muted-foreground ml-2">
								{agent.desc}
							</span>
						</div>
					))}
				</div>
			</motion.div>
		</div>
	)
}
