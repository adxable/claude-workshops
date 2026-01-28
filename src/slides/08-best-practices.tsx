import { motion } from 'framer-motion'
import {
	Eye,
	FileText,
	GitBranch,
	RefreshCw,
	Rocket,
	Shield,
	Sparkles,
	Zap,
} from 'lucide-react'

const tips = [
	{
		icon: Rocket,
		title: 'Start with /ship',
		description:
			'Let the autonomous pipeline handle the full cycle. Only use individual commands when you need more control.',
		color: 'purple',
	},
	{
		icon: Eye,
		title: 'Use --browser Flag',
		description:
			'Visual verification catches issues that type checking misses. Always use it for UI changes.',
		color: 'blue',
	},
	{
		icon: FileText,
		title: 'Review Plans First',
		description:
			'When using /plan + /implement, always review the generated plan before implementing.',
		color: 'green',
	},
	{
		icon: RefreshCw,
		title: 'Trust the Loops',
		description:
			'Fix-verify loops run up to 5 times automatically. Let them fix issues before intervening.',
		color: 'amber',
	},
	{
		icon: GitBranch,
		title: 'Clean Commits',
		description:
			'/commit generates conventional commit messages with proper scope. Let it analyze your changes.',
		color: 'orange',
	},
	{
		icon: Zap,
		title: 'Use /ralph for Complex Tasks',
		description:
			'For features with unknown scope or overnight development, /ralph loops until done.',
		color: 'rose',
	},
	{
		icon: Shield,
		title: 'No any Types',
		description:
			'/refactor automatically eliminates any types. Run it after implementing new features.',
		color: 'cyan',
	},
	{
		icon: Sparkles,
		title: 'Parallel Agents',
		description:
			'/review runs 3 agents in parallel. One command gives you type review, perf audit, and visual testing.',
		color: 'indigo',
	},
]

const colorMap: Record<string, string> = {
	purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
	blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
	green: 'bg-green-500/20 text-green-400 border-green-500/30',
	amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
	orange: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
	rose: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
	cyan: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
	indigo: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
}

export default function BestPracticesSlide() {
	return (
		<div className="space-y-6 max-w-6xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 mb-4">
					<Sparkles className="w-4 h-4" />
					<span className="text-sm font-medium">Tips & Tricks</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold">
					Best <span className="text-gradient">Practices</span>
				</h2>
			</motion.div>

			{/* Tips grid */}
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{tips.map((tip, index) => {
					const Icon = tip.icon
					return (
						<motion.div
							key={tip.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 + index * 0.05 }}
							className={`p-4 rounded-xl border ${colorMap[tip.color]}`}
						>
							<div className="flex items-start gap-3">
								<div className={`p-2 rounded-lg ${colorMap[tip.color]}`}>
									<Icon className="w-4 h-4" />
								</div>
								<div>
									<h3 className="font-semibold text-sm mb-1">{tip.title}</h3>
									<p className="text-xs text-muted-foreground">
										{tip.description}
									</p>
								</div>
							</div>
						</motion.div>
					)
				})}
			</div>

			{/* Quick reference */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="grid grid-cols-1 md:grid-cols-2 gap-4"
			>
				<div className="p-4 rounded-xl bg-card border border-border">
					<h4 className="font-semibold text-green-400 mb-2">DO</h4>
					<ul className="space-y-1 text-sm text-muted-foreground">
						<li>• Use /ship for most tasks</li>
						<li>• Add --browser for UI changes</li>
						<li>• Let fix-verify loops complete</li>
						<li>• Review generated plans</li>
					</ul>
				</div>
				<div className="p-4 rounded-xl bg-card border border-border">
					<h4 className="font-semibold text-red-400 mb-2">DON'T</h4>
					<ul className="space-y-1 text-sm text-muted-foreground">
						<li>• Interrupt the verification loop</li>
						<li>• Skip /refactor after features</li>
						<li>• Ignore browser test results</li>
						<li>• Use any types in TypeScript</li>
					</ul>
				</div>
			</motion.div>
		</div>
	)
}
