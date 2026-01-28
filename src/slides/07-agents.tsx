import { motion } from 'framer-motion'
import {
	Accessibility,
	Bot,
	Eye,
	FileText,
	Gauge,
	GitBranch,
	Globe,
	Monitor,
	Search,
	Wrench,
} from 'lucide-react'
import { agents } from '../data/workflow-steps'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
	explorer: Search,
	'web-researcher': Globe,
	refactorer: Wrench,
	'code-reviewer': Eye,
	'performance-auditor': Gauge,
	'browser-tester': Monitor,
	'git-automator': GitBranch,
	'accessibility-tester': Accessibility,
	'docs-generator': FileText,
}

const modelColors = {
	haiku: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
	sonnet: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
	opus: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
}

export default function AgentsSlide() {
	return (
		<div className="space-y-6 max-w-6xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 mb-4">
					<Bot className="w-4 h-4" />
					<span className="text-sm font-medium">Agent Architecture</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">9 Specialized</span> Agents
				</h2>
				<p className="text-muted-foreground">
					Each agent has a specific role, model, and set of capabilities
				</p>
			</motion.div>

			{/* Model legend */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="flex justify-center gap-4"
			>
				{(['haiku', 'sonnet', 'opus'] as const).map((model) => (
					<div
						key={model}
						className={`px-3 py-1 rounded-full border text-xs font-medium ${modelColors[model]}`}
					>
						{model === 'haiku' && '⚡ Haiku (fast)'}
						{model === 'sonnet' && '🎵 Sonnet (balanced)'}
						{model === 'opus' && '🎭 Opus (powerful)'}
					</div>
				))}
			</motion.div>

			{/* Agents grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				{agents.map((agent, index) => {
					const Icon = iconMap[agent.id] || Bot
					return (
						<motion.div
							key={agent.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.3 + index * 0.05 }}
							className="p-4 rounded-xl bg-card border border-border hover:border-purple-500/30 transition-colors"
						>
							<div className="flex items-start gap-3">
								<div className="p-2 rounded-lg bg-muted">
									<Icon className="w-4 h-4 text-foreground" />
								</div>
								<div className="flex-1 min-w-0">
									<div className="flex items-center gap-2 mb-1">
										<h3 className="font-semibold text-sm truncate">
											{agent.name}
										</h3>
										<span
											className={`px-1.5 py-0.5 rounded text-[10px] font-medium border ${modelColors[agent.model]}`}
										>
											{agent.model}
										</span>
									</div>
									<p className="text-xs text-muted-foreground mb-2">
										{agent.description}
									</p>
									<div className="flex flex-wrap gap-1">
										{agent.capabilities.map((cap) => (
											<span
												key={cap}
												className="px-1.5 py-0.5 rounded bg-muted text-[10px] text-muted-foreground"
											>
												{cap}
											</span>
										))}
									</div>
								</div>
							</div>
						</motion.div>
					)
				})}
			</div>

			{/* Parallel execution note */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.8 }}
				className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30"
			>
				<h4 className="font-semibold text-amber-400 mb-2">
					Parallel Execution in /review
				</h4>
				<p className="text-sm text-muted-foreground">
					During code review,{' '}
					<span className="text-foreground">code-reviewer</span>,{' '}
					<span className="text-foreground">performance-auditor</span>, and{' '}
					<span className="text-foreground">accessibility-tester</span> run{' '}
					<span className="text-amber-400 font-semibold">simultaneously</span>{' '}
					for faster feedback.
				</p>
			</motion.div>
		</div>
	)
}
