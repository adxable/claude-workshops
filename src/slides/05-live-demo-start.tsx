import { motion } from 'framer-motion'
import {
	ArrowRight,
	CheckSquare,
	ListTodo,
	Play,
	Target,
	Terminal,
} from 'lucide-react'

const demoSteps = [
	{
		step: 1,
		title: 'Select a task',
		description: 'Choose what we want to implement',
		icon: Target,
	},
	{
		step: 2,
		title: 'Run /plan',
		description: 'Let Claude research and create a plan',
		icon: ListTodo,
	},
	{
		step: 3,
		title: 'Review the plan',
		description: 'Check what Claude proposes',
		icon: CheckSquare,
	},
]

export default function LiveDemoStartSlide() {
	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 text-green-400 mb-4">
					<Play className="w-4 h-4" />
					<span className="text-sm font-medium">Live Demo</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					Let's <span className="text-gradient">Build</span> Something
				</h2>
				<p className="text-muted-foreground text-lg">
					From idea to implementation plan
				</p>
			</motion.div>

			{/* Demo steps */}
			<div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
				{demoSteps.map((item, i) => (
					<motion.div
						key={item.step}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3 + i * 0.15 }}
						className="flex items-center gap-4"
					>
						<div className="flex flex-col items-center p-6 rounded-xl bg-card border border-border min-w-[180px]">
							<div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center mb-3">
								<item.icon className="w-6 h-6 text-purple-400" />
							</div>
							<div className="text-xs text-muted-foreground mb-1">
								Step {item.step}
							</div>
							<div className="font-semibold text-center">{item.title}</div>
							<p className="text-xs text-muted-foreground text-center mt-1">
								{item.description}
							</p>
						</div>
						{i < demoSteps.length - 1 && (
							<ArrowRight className="w-5 h-5 text-muted-foreground hidden md:block" />
						)}
					</motion.div>
				))}
			</div>

			{/* Terminal preview */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.8 }}
				className="max-w-2xl mx-auto"
			>
				<div className="rounded-xl bg-card border border-border overflow-hidden">
					<div className="flex items-center gap-2 px-4 py-2 bg-muted/50 border-b border-border">
						<Terminal className="w-4 h-4 text-muted-foreground" />
						<span className="text-sm text-muted-foreground">Terminal</span>
					</div>
					<div className="p-4 font-mono text-sm">
						<div className="flex items-center gap-2">
							<span className="text-green-400">$</span>
							<span className="text-purple-400">claude</span>
						</div>
						<div className="mt-2 text-muted-foreground">
							<span className="text-blue-400">&gt;</span> /plan{' '}
							<span className="text-amber-400">
								"add feature X to the project"
							</span>
						</div>
						<div className="mt-2 flex items-center gap-2">
							<motion.div
								animate={{ opacity: [1, 0.5, 1] }}
								transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
								className="w-2 h-4 bg-purple-400"
							/>
						</div>
					</div>
				</div>
			</motion.div>

			{/* CTA */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
				className="text-center"
			>
				<p className="text-muted-foreground">
					Watch the terminal on the right{' '}
					<ArrowRight className="w-4 h-4 inline" />
				</p>
			</motion.div>
		</div>
	)
}
