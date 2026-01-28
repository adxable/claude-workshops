import { AnimatePresence, motion } from 'framer-motion'
import {
	CheckCircle,
	ChevronRight,
	Code,
	Eye,
	GitCommit,
	GitPullRequest,
	Lightbulb,
	Rocket,
	Settings,
	Wrench,
} from 'lucide-react'
import { useState } from 'react'
import { colorMap, workflowSteps } from '../data/workflow-steps'

const iconMap = {
	Settings,
	Lightbulb,
	Code,
	Wrench,
	CheckCircle,
	Eye,
	GitCommit,
	GitPullRequest,
}

export default function WorkflowSlide() {
	const [activeStep, setActiveStep] = useState<string | null>(null)

	return (
		<div className="space-y-8 max-w-6xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 mb-4">
					<Rocket className="w-4 h-4" />
					<span className="text-sm font-medium">/ship Pipeline</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					The <span className="text-gradient">7-Phase</span> Workflow
				</h2>
				<p className="text-muted-foreground">
					One command runs the entire development cycle
				</p>
			</motion.div>

			{/* Ship command */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="flex justify-center"
			>
				<code className="px-6 py-3 rounded-xl bg-card border border-border font-mono text-lg">
					<span className="text-purple-400">/ship</span>{' '}
					<span className="text-muted-foreground">"add user auth"</span>{' '}
					<span className="text-green-400">--browser</span>
				</code>
			</motion.div>

			{/* Pipeline visualization */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
				className="flex flex-wrap justify-center items-center gap-2 md:gap-3"
			>
				{workflowSteps.map((step, index) => {
					const Icon = iconMap[step.icon as keyof typeof iconMap]
					const colors = colorMap[step.color as keyof typeof colorMap]
					const isActive = activeStep === step.id

					return (
						<motion.div
							key={step.id}
							className="flex items-center"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4 + index * 0.1 }}
						>
							<motion.button
								onClick={() => setActiveStep(isActive ? null : step.id)}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={`
									relative flex flex-col items-center p-3 md:p-4 rounded-xl border transition-all cursor-pointer
									${colors.bg} ${colors.border}
									${isActive ? 'ring-2 ring-offset-2 ring-offset-background ' + colors.border : ''}
								`}
							>
								<div className="absolute -top-2 -left-2 w-5 h-5 rounded-full bg-card border border-border flex items-center justify-center text-xs font-bold">
									{index + 1}
								</div>
								<Icon className={`w-5 h-5 md:w-6 md:h-6 ${colors.text}`} />
								<span className="text-xs md:text-sm font-medium mt-1">
									{step.title}
								</span>
							</motion.button>
							{index < workflowSteps.length - 1 && (
								<ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
							)}
						</motion.div>
					)
				})}
			</motion.div>

			{/* Details panel */}
			<AnimatePresence mode="wait">
				{activeStep && (
					<motion.div
						initial={{ opacity: 0, y: 20, height: 0 }}
						animate={{ opacity: 1, y: 0, height: 'auto' }}
						exit={{ opacity: 0, y: 20, height: 0 }}
						className="overflow-hidden"
					>
						{workflowSteps
							.filter((s) => s.id === activeStep)
							.map((step) => {
								const colors = colorMap[step.color as keyof typeof colorMap]
								return (
									<div
										key={step.id}
										className={`p-6 rounded-xl border ${colors.bg} ${colors.border}`}
									>
										<div className="flex items-center gap-3 mb-3">
											<span className={`text-2xl font-bold ${colors.text}`}>
												{step.command}
											</span>
										</div>
										<p className="text-muted-foreground mb-3">
											{step.description}
										</p>
										{step.agent && (
											<div className="flex items-center gap-2">
												<span className="text-xs text-muted-foreground">
													Agent:
												</span>
												<span
													className={`px-2 py-1 rounded text-xs font-mono ${colors.bg} ${colors.text}`}
												>
													{step.agent}
												</span>
											</div>
										)}
									</div>
								)
							})}
					</motion.div>
				)}
			</AnimatePresence>

			{/* Hint */}
			<motion.p
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.2 }}
				className="text-center text-sm text-muted-foreground"
			>
				Click on any phase to see details
			</motion.p>
		</div>
	)
}
