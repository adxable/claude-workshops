import { motion } from 'framer-motion'
import {
	Bot,
	CheckCircle2,
	GitPullRequest,
	Rocket,
	Shield,
	Zap,
} from 'lucide-react'

const features = [
	{
		icon: Rocket,
		title: '/ship',
		description: 'Full autonomous pipeline in one command',
		color: 'purple',
	},
	{
		icon: Bot,
		title: '12+ Agents',
		description: 'Specialized AI agents working in parallel',
		color: 'blue',
	},
	{
		icon: Shield,
		title: 'Self-Validating',
		description: 'Agents verify their own work with hooks',
		color: 'green',
	},
	{
		icon: GitPullRequest,
		title: 'PR Ready',
		description: 'From idea to pull request, fully automated',
		color: 'amber',
	},
]

const colorMap = {
	purple: 'bg-purple-500/20 text-purple-400',
	blue: 'bg-blue-500/20 text-blue-400',
	green: 'bg-green-500/20 text-green-400',
	amber: 'bg-amber-500/20 text-amber-400',
}

const learningPoints = [
	'What is Claude Code and agentic development',
	'The 8-phase ADX workflow (Setup → PR)',
	'Self-validating agents with hooks',
	'Specialized agents for every task',
]

export default function IntroSlide() {
	return (
		<div className="flex flex-col items-center justify-center space-y-8 text-center">
			{/* Logo/Icon */}
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className="relative"
			>
				<div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
					<Rocket className="w-10 h-10 text-white" />
				</div>
				<motion.div
					className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
					animate={{ scale: [1, 1.1, 1] }}
					transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
				>
					<Zap className="w-3 h-3 text-white" />
				</motion.div>
			</motion.div>

			{/* Title */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="space-y-4"
			>
				<h1 className="text-5xl md:text-7xl font-bold">
					<span className="text-gradient">ADX</span> Workshop
				</h1>
				<p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
					Claude Code Agentic Development Toolkit
				</p>
			</motion.div>

			{/* Divider */}
			<motion.div
				initial={{ scaleX: 0 }}
				animate={{ scaleX: 1 }}
				transition={{ delay: 0.4, duration: 0.5 }}
				className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
			/>

			{/* Feature highlights */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
				className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl"
			>
				{features.map((feature, index) => {
					const Icon = feature.icon
					return (
						<motion.div
							key={feature.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6 + index * 0.1 }}
							className="flex flex-col items-center gap-2 p-4"
						>
							<div
								className={`p-3 rounded-xl ${colorMap[feature.color as keyof typeof colorMap]}`}
							>
								<Icon className="w-6 h-6" />
							</div>
							<span className="font-semibold">{feature.title}</span>
							<span className="text-xs text-muted-foreground">
								{feature.description}
							</span>
						</motion.div>
					)
				})}
			</motion.div>

			{/* What you'll learn */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.9 }}
				className="p-4 rounded-xl bg-white/5 border border-white/10 max-w-2xl"
			>
				<h3 className="text-sm font-semibold text-purple-400 mb-3">
					What you'll learn today:
				</h3>
				<div className="grid grid-cols-2 gap-2 text-left">
					{learningPoints.map((point) => (
						<div key={point} className="flex items-center gap-2 text-sm">
							<CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
							<span className="text-muted-foreground">{point}</span>
						</div>
					))}
				</div>
			</motion.div>

			{/* Tagline */}
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.1 }}
				className="text-muted-foreground"
			>
				Use arrow keys or click Next to navigate
			</motion.p>
		</div>
	)
}
