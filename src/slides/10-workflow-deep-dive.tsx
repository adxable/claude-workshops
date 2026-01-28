import { AnimatePresence, motion } from 'framer-motion'
import {
	CheckCircle,
	ChevronDown,
	ChevronUp,
	Code,
	Eye,
	FileText,
	GitCommit,
	GitPullRequest,
	Lightbulb,
	Terminal,
	Wrench,
	Zap,
} from 'lucide-react'
import { useState } from 'react'
import { colorMap, workflowSteps } from '../data/workflow-steps'

const iconMap = {
	Lightbulb,
	Code,
	Wrench,
	CheckCircle,
	Eye,
	GitCommit,
	GitPullRequest,
}

export default function WorkflowDeepDiveSlide() {
	const [expandedStep, setExpandedStep] = useState<string | null>('plan')

	return (
		<div className="space-y-6 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 mb-4">
					<Zap className="w-4 h-4" />
					<span className="text-sm font-medium">Deep Dive</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					The <span className="text-gradient">7-Phase</span> Pipeline
				</h2>
				<p className="text-muted-foreground">
					Click each phase to understand what happens behind the scenes
				</p>
			</motion.div>

			{/* Workflow steps accordion */}
			<div className="space-y-3">
				{workflowSteps.map((step, index) => {
					const Icon = iconMap[step.icon as keyof typeof iconMap]
					const colors = colorMap[step.color as keyof typeof colorMap]
					const isExpanded = expandedStep === step.id

					return (
						<motion.div
							key={step.id}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: index * 0.05 }}
						>
							<motion.button
								onClick={() => setExpandedStep(isExpanded ? null : step.id)}
								className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${colors.bg} ${colors.border} hover:scale-[1.01]`}
								whileTap={{ scale: 0.99 }}
							>
								<div
									className={`flex items-center justify-center w-10 h-10 rounded-lg ${colors.bg} border ${colors.border}`}
								>
									<Icon className={`w-5 h-5 ${colors.text}`} />
								</div>
								<div className="flex-1 text-left">
									<div className="flex items-center gap-2">
										<span className="text-xs text-muted-foreground">
											Phase {index + 1}
										</span>
										<code className={`text-sm font-mono ${colors.text}`}>
											{step.command}
										</code>
									</div>
									<p className="text-sm text-foreground">{step.description}</p>
								</div>
								{step.agent && (
									<span
										className={`px-2 py-1 rounded text-xs font-mono ${colors.bg} ${colors.text} border ${colors.border}`}
									>
										{step.agent.split(',')[0]}
									</span>
								)}
								{isExpanded ? (
									<ChevronUp className="w-5 h-5 text-muted-foreground" />
								) : (
									<ChevronDown className="w-5 h-5 text-muted-foreground" />
								)}
							</motion.button>

							<AnimatePresence>
								{isExpanded && (
									<motion.div
										initial={{ opacity: 0, height: 0 }}
										animate={{ opacity: 1, height: 'auto' }}
										exit={{ opacity: 0, height: 0 }}
										className="overflow-hidden"
									>
										<div
											className={`mt-2 p-4 rounded-xl border ${colors.bg} ${colors.border} ml-14`}
										>
											{step.details && (
												<p className="text-muted-foreground mb-3">
													{step.details}
												</p>
											)}
											{step.output && (
												<div className="flex items-start gap-2">
													<Terminal className="w-4 h-4 text-muted-foreground mt-0.5" />
													<div>
														<span className="text-xs text-muted-foreground">
															Output:
														</span>
														<p className="text-sm font-mono text-foreground">
															{step.output}
														</p>
													</div>
												</div>
											)}
										</div>
									</motion.div>
								)}
							</AnimatePresence>
						</motion.div>
					)
				})}
			</div>

			{/* Footer */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
				className="flex items-center justify-center gap-4 pt-4"
			>
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<FileText className="w-4 h-4" />
					<span>
						All outputs saved in{' '}
						<code className="text-purple-400">.claude/</code>
					</span>
				</div>
			</motion.div>
		</div>
	)
}
