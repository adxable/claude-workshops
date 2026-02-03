import { motion } from 'framer-motion'
import {
	BookOpen,
	Bot,
	Boxes,
	BrainCircuit,
	Lightbulb,
	MessageSquare,
	Rocket,
	Target,
	Users,
	Workflow,
} from 'lucide-react'

const tips = [
	{
		icon: Target,
		title: 'Start Small',
		description: 'Begin with single commands, then combine into workflows',
		color: 'purple',
	},
	{
		icon: MessageSquare,
		title: 'Be Specific',
		description: 'Clear prompts = better results. Describe what you want precisely',
		color: 'blue',
	},
	{
		icon: BrainCircuit,
		title: 'Iterate',
		description: 'Review outputs, refine prompts, build on what works',
		color: 'green',
	},
	{
		icon: Boxes,
		title: 'Build Skills',
		description: 'Package repeating tasks into reusable skills',
		color: 'amber',
	},
]

const resources = [
	{ name: 'Claude Code Docs', icon: BookOpen },
	{ name: 'Community Discord', icon: Users },
	{ name: 'Example Workflows', icon: Workflow },
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

export default function TipsLearningSlide() {
	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-400 mb-4">
					<Lightbulb className="w-4 h-4" />
					<span className="text-sm font-medium">Tips & Resources</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">Learn</span> & Grow
				</h2>
				<p className="text-muted-foreground text-lg">
					How to become productive with Claude workflows
				</p>
			</motion.div>

			{/* Tips grid */}
			<div className="grid md:grid-cols-2 gap-4">
				{tips.map((tip, i) => {
					const colors = colorMap[tip.color]
					const Icon = tip.icon

					return (
						<motion.div
							key={tip.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 + i * 0.1 }}
							className={`p-5 rounded-xl ${colors.bg} border ${colors.border}`}
						>
							<div className="flex items-start gap-3">
								<div
									className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0`}
								>
									<Icon className={`w-5 h-5 ${colors.text}`} />
								</div>
								<div>
									<div className="font-semibold mb-1">{tip.title}</div>
									<p className="text-sm text-muted-foreground">
										{tip.description}
									</p>
								</div>
							</div>
						</motion.div>
					)
				})}
			</div>

			{/* Solo development section */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="p-6 rounded-xl bg-card border border-border"
			>
				<div className="flex items-center gap-3 mb-4">
					<Bot className="w-6 h-6 text-purple-400" />
					<div>
						<div className="font-semibold">Solo Development with Claude</div>
						<p className="text-sm text-muted-foreground">
							Build full projects on your own
						</p>
					</div>
				</div>
				<div className="grid md:grid-cols-3 gap-3 text-sm">
					<div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
						<div className="font-medium text-purple-400 mb-1">
							Jira Integration
						</div>
						<p className="text-xs text-muted-foreground">
							Connect tasks directly to your workflow
						</p>
					</div>
					<div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
						<div className="font-medium text-blue-400 mb-1">
							Specs as Context
						</div>
						<p className="text-xs text-muted-foreground">
							Feed requirements directly to Claude
						</p>
					</div>
					<div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
						<div className="font-medium text-green-400 mb-1">
							Iterative Building
						</div>
						<p className="text-xs text-muted-foreground">
							Ship features continuously
						</p>
					</div>
				</div>
			</motion.div>

			{/* Resources */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
				className="flex flex-wrap items-center justify-center gap-4"
			>
				{resources.map((resource) => (
					<div
						key={resource.name}
						className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-sm"
					>
						<resource.icon className="w-4 h-4 text-muted-foreground" />
						<span>{resource.name}</span>
					</div>
				))}
			</motion.div>

			{/* CTA */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
					<Rocket className="w-4 h-4 text-purple-400" />
					<span>
						The best way to learn is to{' '}
						<span className="text-purple-400 font-medium">start building</span>
					</span>
				</div>
			</motion.div>
		</div>
	)
}
