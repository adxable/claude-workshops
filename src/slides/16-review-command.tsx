import { motion } from 'framer-motion'
import {
	CheckCircle,
	Code2,
	Eye,
	FileText,
	Gauge,
	Users,
} from 'lucide-react'

const agents = [
	{
		name: 'Code Reviewer',
		model: 'Opus',
		icon: Code2,
		color: 'text-green-400',
		bg: 'bg-green-500/10',
		border: 'border-green-500/30',
		checks: ['Type safety', 'Pattern compliance', 'Error handling'],
	},
	{
		name: 'Performance Auditor',
		model: 'Opus',
		icon: Gauge,
		color: 'text-amber-400',
		bg: 'bg-amber-500/10',
		border: 'border-amber-500/30',
		checks: ['Bundle size', 'Re-renders', 'Lazy loading'],
	},
]

export default function ReviewCommandSlide() {
	return (
		<div className="space-y-6 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 mb-4">
					<Eye className="w-4 h-4" />
					<span className="text-sm font-medium">Phase 4</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">/review</span>
				</h2>
				<p className="text-muted-foreground text-lg">
					Code-specific review agents
				</p>
			</motion.div>

			{/* Command */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="flex justify-center"
			>
				<code className="px-6 py-3 rounded-xl bg-card border border-border font-mono text-lg">
					<span className="text-amber-400">/review</span>
				</code>
			</motion.div>

			{/* Parallel agents */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
				className="flex items-center justify-center gap-2 mb-2"
			>
				<Users className="w-5 h-5 text-amber-400" />
				<span className="text-sm text-muted-foreground">
					Running in parallel
				</span>
			</motion.div>

			<div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
				{agents.map((agent, i) => (
					<motion.div
						key={agent.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 + i * 0.1 }}
						className={`p-5 rounded-xl ${agent.bg} border ${agent.border}`}
					>
						<div className="flex items-center gap-3 mb-4">
							<div
								className={`w-10 h-10 rounded-lg ${agent.bg} border ${agent.border} flex items-center justify-center`}
							>
								<agent.icon className={`w-5 h-5 ${agent.color}`} />
							</div>
							<div>
								<div className="font-medium">{agent.name}</div>
								<span className={`text-xs ${agent.color}`}>{agent.model}</span>
							</div>
						</div>
						<div className="space-y-2">
							{agent.checks.map((check) => (
								<div key={check} className="flex items-center gap-2 text-sm">
									<CheckCircle className={`w-4 h-4 ${agent.color}`} />
									<span className="text-muted-foreground">{check}</span>
								</div>
							))}
						</div>
					</motion.div>
				))}
			</div>

			{/* Output */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.7 }}
				className="p-5 rounded-xl bg-card border border-border"
			>
				<div className="flex items-center gap-3 mb-3">
					<FileText className="w-5 h-5 text-amber-400" />
					<span className="font-medium">Output</span>
				</div>
				<code className="text-sm text-muted-foreground">
					.claude/reviews/review-2026-01-20.md
				</code>
				<div className="mt-3 grid grid-cols-2 gap-4 text-center text-sm">
					<div className="p-2 rounded bg-green-500/10 border border-green-500/30">
						<div className="text-green-400 font-medium">Code</div>
						<div className="text-xs text-muted-foreground">12 findings</div>
					</div>
					<div className="p-2 rounded bg-amber-500/10 border border-amber-500/30">
						<div className="text-amber-400 font-medium">Performance</div>
						<div className="text-xs text-muted-foreground">3 suggestions</div>
					</div>
				</div>
			</motion.div>
		</div>
	)
}
