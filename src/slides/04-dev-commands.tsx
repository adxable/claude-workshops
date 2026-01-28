import { motion } from 'framer-motion'
import { Code, Lightbulb, Terminal, Wrench } from 'lucide-react'
import { CodeBlock } from '../components/common/CodeBlock'
import { devCommands } from '../data/commands'

const iconMap = {
	'/plan': Lightbulb,
	'/implement': Code,
	'/refactor': Wrench,
}

export default function DevCommandsSlide() {
	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 mb-4">
					<Code className="w-4 h-4" />
					<span className="text-sm font-medium">Controlled Mode</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">Development</span> Commands
				</h2>
				<p className="text-muted-foreground">
					Step-by-step control for when you want to review each phase
				</p>
			</motion.div>

			{/* Commands */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{devCommands.map((cmd, index) => {
					const Icon = iconMap[cmd.name as keyof typeof iconMap] || Terminal
					return (
						<motion.div
							key={cmd.name}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 + index * 0.1 }}
							className="p-5 rounded-xl bg-card border border-border hover:border-blue-500/50 transition-colors"
						>
							<div className="flex items-center gap-3 mb-3">
								<div className="p-2 rounded-lg bg-blue-500/20">
									<Icon className="w-5 h-5 text-blue-400" />
								</div>
								<code className="text-lg font-mono font-semibold text-blue-400">
									{cmd.name}
								</code>
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
										<span className="text-blue-400 mt-0.5">•</span>
										{tip}
									</li>
								))}
							</ul>
						</motion.div>
					)
				})}
			</div>

			{/* Workflow hint */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30"
			>
				<h4 className="font-semibold text-blue-400 mb-2">Typical Flow</h4>
				<div className="flex items-center gap-2 font-mono text-sm">
					<span className="px-2 py-1 rounded bg-card">/plan</span>
					<span className="text-muted-foreground">→</span>
					<span className="text-muted-foreground italic">review plan</span>
					<span className="text-muted-foreground">→</span>
					<span className="px-2 py-1 rounded bg-card">/implement</span>
					<span className="text-muted-foreground">→</span>
					<span className="px-2 py-1 rounded bg-card">/refactor</span>
				</div>
			</motion.div>
		</div>
	)
}
