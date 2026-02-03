import { motion } from 'framer-motion'
import {
	Bot,
	Boxes,
	Cog,
	Terminal,
	Workflow,
	Zap,
} from 'lucide-react'

const concepts = [
	{
		id: 'workflow',
		name: 'Workflow',
		icon: Workflow,
		color: 'purple',
		description: 'End-to-end automation pipeline',
		details: 'A sequence of commands that work together to complete a task from start to finish',
		example: '/ship = plan + implement + verify + review + commit + pr',
	},
	{
		id: 'command',
		name: 'Command',
		icon: Terminal,
		color: 'blue',
		description: 'Single action or phase',
		details: 'Slash commands that trigger specific functionality in Claude Code',
		example: '/plan, /implement, /verify, /review',
	},
	{
		id: 'agent',
		name: 'Agent',
		icon: Bot,
		color: 'green',
		description: 'Specialized AI worker',
		details: 'Autonomous AI that performs specific tasks with defined capabilities',
		example: 'explorer, web-researcher, code-reviewer',
	},
	{
		id: 'hook',
		name: 'Hook',
		icon: Zap,
		color: 'amber',
		description: 'Event-triggered automation',
		details: 'Scripts that run automatically before/after commands or on specific events',
		example: 'Pre-commit: run linter, Post-implement: type check',
	},
	{
		id: 'skill',
		name: 'Skill',
		icon: Boxes,
		color: 'rose',
		description: 'Reusable capability',
		details: 'Packaged functionality that extends Claude with new abilities',
		example: 'Browser testing, Jira integration, Custom templates',
	},
]

const colorMap = {
	purple: {
		bg: 'bg-purple-500/20',
		border: 'border-purple-500/50',
		text: 'text-purple-400',
	},
	blue: {
		bg: 'bg-blue-500/20',
		border: 'border-blue-500/50',
		text: 'text-blue-400',
	},
	green: {
		bg: 'bg-green-500/20',
		border: 'border-green-500/50',
		text: 'text-green-400',
	},
	amber: {
		bg: 'bg-amber-500/20',
		border: 'border-amber-500/50',
		text: 'text-amber-400',
	},
	rose: {
		bg: 'bg-rose-500/20',
		border: 'border-rose-500/50',
		text: 'text-rose-400',
	},
}

export default function ClaudeConceptsSlide() {
	return (
		<div className="space-y-6 max-w-6xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 mb-4">
					<Cog className="w-4 h-4" />
					<span className="text-sm font-medium">Building Blocks</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">Claude</span> Concepts
				</h2>
				<p className="text-muted-foreground">
					The core building blocks for automation
				</p>
			</motion.div>

			{/* Concepts grid */}
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				{concepts.map((concept, i) => {
					const colors = colorMap[concept.color as keyof typeof colorMap]
					const Icon = concept.icon

					return (
						<motion.div
							key={concept.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 + i * 0.1 }}
							className={`p-5 rounded-xl ${colors.bg} border ${colors.border}`}
						>
							<div className="flex items-center gap-3 mb-3">
								<div
									className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}
								>
									<Icon className={`w-5 h-5 ${colors.text}`} />
								</div>
								<div>
									<div className="font-semibold">{concept.name}</div>
									<div className={`text-xs ${colors.text}`}>
										{concept.description}
									</div>
								</div>
							</div>
							<p className="text-sm text-muted-foreground mb-3">
								{concept.details}
							</p>
							<code className={`text-xs ${colors.text} block`}>
								{concept.example}
							</code>
						</motion.div>
					)
				})}
			</div>

			{/* Connection hint */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
				className="text-center text-sm text-muted-foreground"
			>
				Workflows combine commands, agents, hooks and skills into powerful pipelines
			</motion.div>
		</div>
	)
}
