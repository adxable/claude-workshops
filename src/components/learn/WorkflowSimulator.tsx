import { AnimatePresence, motion } from 'framer-motion'
import {
	CheckCircle,
	ChevronLeft,
	ChevronRight,
	Code,
	Eye,
	GitCommit,
	GitPullRequest,
	Lightbulb,
	RotateCcw,
	Settings,
	Sparkles,
	Wrench,
} from 'lucide-react'
import { useState } from 'react'
import { workflowTips } from '../../data/learning-content'
import { colorMap, workflowSteps } from '../../data/workflow-steps'
import { cn } from '../../lib/utils'

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

export default function WorkflowSimulator() {
	const [currentPhase, setCurrentPhase] = useState(0)
	const [isAnimating, setIsAnimating] = useState(false)

	const step = workflowSteps[currentPhase]
	const Icon = iconMap[step.icon as keyof typeof iconMap]
	const colors = colorMap[step.color as keyof typeof colorMap]
	const tips = workflowTips.find((t) => t.phase === step.id)?.tips || []

	const goNext = () => {
		if (currentPhase < workflowSteps.length - 1) {
			setIsAnimating(true)
			setTimeout(() => {
				setCurrentPhase((prev) => prev + 1)
				setIsAnimating(false)
			}, 300)
		}
	}

	const goPrev = () => {
		if (currentPhase > 0) {
			setIsAnimating(true)
			setTimeout(() => {
				setCurrentPhase((prev) => prev - 1)
				setIsAnimating(false)
			}, 300)
		}
	}

	const reset = () => {
		setIsAnimating(true)
		setTimeout(() => {
			setCurrentPhase(0)
			setIsAnimating(false)
		}, 300)
	}

	return (
		<div className="space-y-6">
			{/* Progress bar */}
			<div className="flex items-center gap-1">
				{workflowSteps.map((s, i) => {
					const StepIcon = iconMap[s.icon as keyof typeof iconMap]
					const stepColors = colorMap[s.color as keyof typeof colorMap]
					const isActive = i === currentPhase
					const isPast = i < currentPhase

					return (
						<div key={s.id} className="flex items-center flex-1">
							<motion.button
								onClick={() => {
									setIsAnimating(true)
									setTimeout(() => {
										setCurrentPhase(i)
										setIsAnimating(false)
									}, 300)
								}}
								className={cn(
									'w-8 h-8 rounded-full flex items-center justify-center transition-all',
									isActive
										? `${stepColors.bg} border-2 ${stepColors.border}`
										: isPast
											? 'bg-green-500/20 border-2 border-green-500/50'
											: 'bg-card border border-border',
								)}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.95 }}
							>
								{isPast ? (
									<CheckCircle className="w-4 h-4 text-green-400" />
								) : (
									<StepIcon
										className={cn(
											'w-4 h-4',
											isActive ? stepColors.text : 'text-muted-foreground',
										)}
									/>
								)}
							</motion.button>
							{i < workflowSteps.length - 1 && (
								<div
									className={cn(
										'flex-1 h-0.5 mx-1',
										isPast ? 'bg-green-500/50' : 'bg-border',
									)}
								/>
							)}
						</div>
					)
				})}
			</div>

			{/* Current phase display */}
			<AnimatePresence mode="wait">
				<motion.div
					key={step.id}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -20 }}
					className={cn('p-6 rounded-xl border', colors.bg, colors.border)}
				>
					<div className="flex items-start gap-4">
						<div
							className={cn(
								'w-14 h-14 rounded-xl flex items-center justify-center',
								colors.bg,
								'border',
								colors.border,
							)}
						>
							<Icon className={cn('w-7 h-7', colors.text)} />
						</div>
						<div className="flex-1">
							<div className="flex items-center gap-2 mb-1">
								<span className="text-xs text-muted-foreground">
									Phase {currentPhase + 1} of {workflowSteps.length}
								</span>
							</div>
							<h3 className="text-xl font-bold mb-1">{step.title}</h3>
							<code className={cn('text-lg font-mono', colors.text)}>
								{step.command}
							</code>
							<p className="text-muted-foreground mt-2">{step.description}</p>

							{step.details && (
								<p className="text-sm text-muted-foreground mt-3 p-3 rounded-lg bg-black/20">
									{step.details}
								</p>
							)}

							{step.agent && (
								<div className="flex items-center gap-2 mt-3">
									<span className="text-xs text-muted-foreground">Agent:</span>
									<span
										className={cn(
											'px-2 py-1 rounded text-xs font-mono',
											colors.bg,
											colors.text,
											'border',
											colors.border,
										)}
									>
										{step.agent}
									</span>
								</div>
							)}

							{step.output && (
								<div className="mt-3 p-3 rounded-lg bg-black/20 border border-border">
									<span className="text-xs text-muted-foreground block mb-1">
										Output:
									</span>
									<code className="text-xs text-green-400">{step.output}</code>
								</div>
							)}
						</div>
					</div>

					{/* Tips */}
					{tips.length > 0 && (
						<div className="mt-4 pt-4 border-t border-border/50">
							<div className="flex items-center gap-2 mb-2">
								<Sparkles className="w-4 h-4 text-amber-400" />
								<span className="text-sm font-medium">Tips</span>
							</div>
							<ul className="space-y-1">
								{tips.map((tip, i) => (
									<li
										key={i}
										className="text-sm text-muted-foreground flex items-start gap-2"
									>
										<ChevronRight className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
										{tip}
									</li>
								))}
							</ul>
						</div>
					)}
				</motion.div>
			</AnimatePresence>

			{/* Navigation */}
			<div className="flex items-center justify-between">
				<motion.button
					onClick={reset}
					className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground transition-colors"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<RotateCcw className="w-4 h-4" />
					Reset
				</motion.button>

				<div className="flex items-center gap-2">
					<motion.button
						onClick={goPrev}
						disabled={currentPhase === 0 || isAnimating}
						className={cn(
							'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
							currentPhase === 0
								? 'bg-card border-border text-muted-foreground opacity-50 cursor-not-allowed'
								: 'bg-card border-border text-foreground hover:bg-card/80',
						)}
						whileHover={currentPhase > 0 ? { scale: 1.02 } : {}}
						whileTap={currentPhase > 0 ? { scale: 0.98 } : {}}
					>
						<ChevronLeft className="w-4 h-4" />
						Previous
					</motion.button>

					<motion.button
						onClick={goNext}
						disabled={currentPhase === workflowSteps.length - 1 || isAnimating}
						className={cn(
							'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
							currentPhase === workflowSteps.length - 1
								? 'bg-card border-border text-muted-foreground opacity-50 cursor-not-allowed'
								: 'bg-purple-500/20 border-purple-500/50 text-purple-400 hover:bg-purple-500/30',
						)}
						whileHover={
							currentPhase < workflowSteps.length - 1 ? { scale: 1.02 } : {}
						}
						whileTap={
							currentPhase < workflowSteps.length - 1 ? { scale: 0.98 } : {}
						}
					>
						Next
						<ChevronRight className="w-4 h-4" />
					</motion.button>
				</div>
			</div>
		</div>
	)
}
