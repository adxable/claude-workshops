import { motion } from 'framer-motion'
import {
	Code2,
	Cpu,
	Gauge,
	GitBranch,
	Globe,
	Lightbulb,
	Monitor,
	Play,
	Search,
	Shield,
	Sparkles,
	Wrench,
	Zap,
} from 'lucide-react'
import { useState } from 'react'
import { agents } from '../data/workflow-steps'

const iconMap: Record<string, React.ElementType> = {
	explorer: Search,
	planner: Lightbulb,
	implementer: Play,
	verifier: Zap,
	'code-reviewer': Code2,
	'browser-tester': Monitor,
	'git-automator': GitBranch,
	'web-researcher': Globe,
	'performance-auditor': Gauge,
	'security-auditor': Shield,
	'pattern-researcher': Sparkles,
	refactorer: Wrench,
}

const modelColors = {
	haiku: {
		bg: 'bg-emerald-500/20',
		text: 'text-emerald-400',
		border: 'border-emerald-500/50',
		label: 'Fast & Cheap',
	},
	sonnet: {
		bg: 'bg-blue-500/20',
		text: 'text-blue-400',
		border: 'border-blue-500/50',
		label: 'Balanced',
	},
	opus: {
		bg: 'bg-purple-500/20',
		text: 'text-purple-400',
		border: 'border-purple-500/50',
		label: 'Most Capable',
	},
}

export default function AgentsShowcaseSlide() {
	const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

	return (
		<div className="space-y-6 max-w-6xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 mb-4">
					<Cpu className="w-4 h-4" />
					<span className="text-sm font-medium">12 Specialized Agents</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					The <span className="text-gradient">Agent</span> Army
				</h2>
				<p className="text-muted-foreground">
					Each agent is optimized for specific tasks
				</p>
			</motion.div>

			{/* Model legend */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="flex justify-center gap-4"
			>
				{Object.entries(modelColors).map(([model, colors]) => (
					<div
						key={model}
						className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${colors.bg} border ${colors.border}`}
					>
						<Zap className={`w-3 h-3 ${colors.text}`} />
						<span className={`text-xs font-medium ${colors.text}`}>
							{model}
						</span>
						<span className="text-xs text-muted-foreground">
							- {colors.label}
						</span>
					</div>
				))}
			</motion.div>

			{/* Agent grid */}
			<div className="grid grid-cols-3 md:grid-cols-4 gap-3">
				{agents.map((agent, i) => {
					const Icon = iconMap[agent.id] || Cpu
					const colors = modelColors[agent.model]
					const isSelected = selectedAgent === agent.id

					return (
						<motion.button
							key={agent.id}
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.3 + i * 0.05 }}
							onClick={() => setSelectedAgent(isSelected ? null : agent.id)}
							className={`p-4 rounded-xl border transition-all text-left ${colors.bg} ${colors.border} ${
								isSelected
									? 'ring-2 ring-offset-2 ring-offset-background ' +
										colors.border
									: ''
							} hover:scale-[1.02]`}
						>
							<div className="flex items-start justify-between mb-2">
								<div
									className={`w-8 h-8 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}
								>
									<Icon className={`w-4 h-4 ${colors.text}`} />
								</div>
								<span
									className={`px-2 py-0.5 rounded text-xs font-mono ${colors.bg} ${colors.text}`}
								>
									{agent.model}
								</span>
							</div>
							<div className="font-medium text-sm mb-1">{agent.name}</div>
							<p className="text-xs text-muted-foreground line-clamp-2">
								{agent.description}
							</p>

							{isSelected && (
								<motion.div
									initial={{ opacity: 0, height: 0 }}
									animate={{ opacity: 1, height: 'auto' }}
									className="mt-3 pt-3 border-t border-border/50"
								>
									<div className="text-xs text-muted-foreground mb-2">
										Capabilities:
									</div>
									<div className="flex flex-wrap gap-1">
										{agent.capabilities.map((cap) => (
											<span
												key={cap}
												className={`px-2 py-0.5 rounded text-xs ${colors.bg} ${colors.text}`}
											>
												{cap}
											</span>
										))}
									</div>
								</motion.div>
							)}
						</motion.button>
					)
				})}
			</div>

			{/* Footer */}
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
				className="text-center text-sm text-muted-foreground"
			>
				Click any agent to see capabilities
			</motion.p>
		</div>
	)
}
