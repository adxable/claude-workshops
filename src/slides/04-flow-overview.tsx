import { motion } from 'framer-motion'
import {
	ArrowRight,
	CheckCircle,
	Code,
	Eye,
	GitCommit,
	GitPullRequest,
	Lightbulb,
	Rocket,
} from 'lucide-react'

const phases = [
	{
		id: 'plan',
		title: 'Plan',
		command: '/plan',
		icon: Lightbulb,
		color: 'purple',
		description: 'Research & create plan',
	},
	{
		id: 'implement',
		title: 'Implement',
		command: '/implement',
		icon: Code,
		color: 'blue',
		description: 'Execute plan step by step',
	},
	{
		id: 'verify',
		title: 'Verify',
		command: '/verify',
		icon: CheckCircle,
		color: 'green',
		description: 'TypeScript + Lint + Build',
	},
	{
		id: 'review',
		title: 'Review',
		command: '/review',
		icon: Eye,
		color: 'amber',
		description: 'Code & visual review',
	},
	{
		id: 'commit',
		title: 'Commit',
		command: '/commit',
		icon: GitCommit,
		color: 'orange',
		description: 'Smart commit message',
	},
	{
		id: 'pr',
		title: 'PR',
		command: '/pr',
		icon: GitPullRequest,
		color: 'rose',
		description: 'Create pull request',
	},
]

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
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
	orange: {
		bg: 'bg-orange-500/20',
		border: 'border-orange-500/50',
		text: 'text-orange-400',
	},
	rose: {
		bg: 'bg-rose-500/20',
		border: 'border-rose-500/50',
		text: 'text-rose-400',
	},
}

export default function FlowOverviewSlide() {
	return (
		<div className="space-y-8 max-w-6xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-rose-500/20 text-purple-400 mb-4">
					<Rocket className="w-4 h-4" />
					<span className="text-sm font-medium">The Pipeline</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">6-Phase</span> Workflow
				</h2>
				<p className="text-muted-foreground">
					From idea to pull request, fully automated
				</p>
			</motion.div>

			{/* Pipeline visualization */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="flex flex-wrap justify-center items-center gap-2 md:gap-3"
			>
				{phases.map((phase, index) => {
					const Icon = phase.icon
					const colors = colorMap[phase.color]

					return (
						<motion.div
							key={phase.id}
							className="flex items-center"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 + index * 0.1 }}
						>
							<div
								className={`relative flex flex-col items-center p-3 md:p-4 rounded-xl border ${colors.bg} ${colors.border}`}
							>
								<div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold">
									{index + 1}
								</div>
								<Icon className={`w-5 h-5 md:w-6 md:h-6 ${colors.text}`} />
								<span className="text-xs md:text-sm font-medium mt-1">
									{phase.title}
								</span>
							</div>
							{index < phases.length - 1 && (
								<ArrowRight className="w-4 h-4 text-muted-foreground mx-1" />
							)}
						</motion.div>
					)
				})}
			</motion.div>

			{/* Phase details */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.8 }}
				className="grid grid-cols-2 md:grid-cols-3 gap-3"
			>
				{phases.map((phase, i) => {
					const colors = colorMap[phase.color]
					const Icon = phase.icon

					return (
						<motion.div
							key={phase.id}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.9 + i * 0.05 }}
							className={`p-3 rounded-lg border ${colors.bg} ${colors.border}`}
						>
							<div className="flex items-center gap-2 mb-1">
								<Icon className={`w-4 h-4 ${colors.text}`} />
								<code className={`text-sm font-mono ${colors.text}`}>
									{phase.command}
								</code>
							</div>
							<p className="text-xs text-muted-foreground">
								{phase.description}
							</p>
						</motion.div>
					)
				})}
			</motion.div>

			{/* Footer */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.2 }}
				className="text-center"
			>
				<p className="text-sm text-muted-foreground">
					Let's dive into each phase with a{' '}
					<span className="text-purple-400 font-medium">live demo</span>
				</p>
			</motion.div>
		</div>
	)
}
