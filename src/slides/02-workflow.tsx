import { motion } from 'framer-motion'
import {
	Bot,
	Layers,
	Repeat,
	Workflow,
	Wrench,
} from 'lucide-react'

const whyWorkflows = [
	{
		icon: Repeat,
		title: 'Repeatable',
		description: 'Same quality every time, no forgotten steps',
		color: 'purple',
	},
	{
		icon: Layers,
		title: 'Composable',
		description: 'Build complex flows from simple commands',
		color: 'blue',
	},
	{
		icon: Bot,
		title: 'Autonomous',
		description: 'AI handles the boring parts, you focus on decisions',
		color: 'green',
	},
	{
		icon: Wrench,
		title: 'Customizable',
		description: 'Adapt to your project and preferences',
		color: 'amber',
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
}

export default function WorkflowSlide() {
	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 mb-4">
					<Workflow className="w-4 h-4" />
					<span className="text-sm font-medium">Core Concept</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					What is a <span className="text-gradient">Workflow</span>?
				</h2>
				<p className="text-muted-foreground text-lg">
					And why should you build one?
				</p>
			</motion.div>

			{/* Why workflows */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				<h3 className="text-center text-sm text-muted-foreground mb-4">
					Why build workflows?
				</h3>
				<div className="grid md:grid-cols-2 gap-4">
					{whyWorkflows.map((item, i) => {
						const colors = colorMap[item.color]
						const Icon = item.icon

						return (
							<motion.div
								key={item.title}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.5 + i * 0.1 }}
								className={`p-4 rounded-xl ${colors.bg} border ${colors.border}`}
							>
								<div className="flex items-center gap-3">
									<div
										className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}
									>
										<Icon className={`w-5 h-5 ${colors.text}`} />
									</div>
									<div>
										<div className="font-semibold">{item.title}</div>
										<p className="text-sm text-muted-foreground">
											{item.description}
										</p>
									</div>
								</div>
							</motion.div>
						)
					})}
				</div>
			</motion.div>

			{/* Key insight */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.9 }}
				className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30"
			>
				<p className="text-muted-foreground">
					A workflow is your <span className="text-purple-400 font-medium">personal CI/CD pipeline</span> for development tasks
				</p>
			</motion.div>
		</div>
	)
}
