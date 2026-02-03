import { motion } from 'framer-motion'
import {
	Box,
	Chrome,
	Cog,
	Download,
	ExternalLink,
	Puzzle,
	Settings,
	Sparkles,
	Terminal,
} from 'lucide-react'

const features = [
	{
		icon: Chrome,
		title: 'Chrome Extension',
		description: 'Browser testing & visual verification',
		color: 'blue',
	},
	{
		icon: Terminal,
		title: 'CLI Commands',
		description: 'All workflow commands ready to use',
		color: 'green',
	},
	{
		icon: Puzzle,
		title: 'Custom Skills',
		description: 'Extend with your own skills',
		color: 'purple',
	},
	{
		icon: Cog,
		title: 'Project Setup',
		description: 'Configure stack via /setup',
		color: 'amber',
	},
]

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
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
	purple: {
		bg: 'bg-purple-500/20',
		border: 'border-purple-500/50',
		text: 'text-purple-400',
	},
	amber: {
		bg: 'bg-amber-500/20',
		border: 'border-amber-500/50',
		text: 'text-amber-400',
	},
}

export default function ADXToolkitSlide() {
	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 mb-4">
					<Box className="w-4 h-4" />
					<span className="text-sm font-medium">Toolkit</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">ADX</span> Toolkit
				</h2>
				<p className="text-muted-foreground text-lg">
					Everything you need to build your own workflows
				</p>
			</motion.div>

			{/* Features grid */}
			<div className="grid md:grid-cols-2 gap-4">
				{features.map((feature, i) => {
					const colors = colorMap[feature.color]
					const Icon = feature.icon

					return (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 + i * 0.1 }}
							className={`p-5 rounded-xl ${colors.bg} border ${colors.border}`}
						>
							<div className="flex items-center gap-3">
								<div
									className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center`}
								>
									<Icon className={`w-5 h-5 ${colors.text}`} />
								</div>
								<div>
									<div className="font-semibold">{feature.title}</div>
									<p className="text-sm text-muted-foreground">
										{feature.description}
									</p>
								</div>
							</div>
						</motion.div>
					)
				})}
			</div>

			{/* Setup command highlight */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="p-6 rounded-xl bg-card border border-border"
			>
				<div className="flex items-center gap-3 mb-4">
					<Settings className="w-6 h-6 text-indigo-400" />
					<div>
						<code className="text-lg font-mono text-indigo-400">/setup</code>
						<p className="text-sm text-muted-foreground">
							Configure your project stack
						</p>
					</div>
				</div>
				<div className="grid md:grid-cols-3 gap-3 text-sm">
					{['Framework detection', 'Stack configuration', 'Custom templates'].map(
						(item) => (
							<div
								key={item}
								className="p-2 rounded bg-indigo-500/10 border border-indigo-500/30 text-center text-indigo-400"
							>
								{item}
							</div>
						),
					)}
				</div>
			</motion.div>

			{/* CTA */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.8 }}
				className="flex flex-col md:flex-row items-center justify-center gap-4"
			>
				<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/50 text-purple-400">
					<Download className="w-4 h-4" />
					<span className="text-sm font-medium">Available on GitHub</span>
					<ExternalLink className="w-3 h-3" />
				</div>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<Sparkles className="w-4 h-4 text-amber-400" />
					<span>Start building your own workflows today</span>
				</div>
			</motion.div>
		</div>
	)
}
