import { colorMap, workflowSteps } from '@/data/workflow-steps'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'framer-motion'
import {
	ArrowRight,
	CheckCircle,
	Code,
	Eye,
	GitCommit,
	GitPullRequest,
	Lightbulb,
	type LucideIcon,
	Wrench,
} from 'lucide-react'
import { useState } from 'react'

const iconMap: Record<string, LucideIcon> = {
	Lightbulb,
	Code,
	Wrench,
	CheckCircle,
	Eye,
	GitCommit,
	GitPullRequest,
}

export function WorkflowDiagram() {
	const [activeStep, setActiveStep] = useState<string | null>(null)

	return (
		<div className="w-full max-w-5xl mx-auto">
			{/* Diagram */}
			<div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-2">
				{workflowSteps.map((step, index) => {
					const Icon = iconMap[step.icon]
					const colors = colorMap[step.color]
					const isActive = activeStep === step.id

					return (
						<div key={step.id} className="flex items-center">
							{/* Step */}
							<motion.button
								type="button"
								onClick={() => setActiveStep(isActive ? null : step.id)}
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className={cn(
									'relative flex flex-col items-center p-6 rounded-2xl border-2 transition-all cursor-pointer',
									'w-36 md:w-40',
									colors.bg,
									isActive
										? `${colors.border} border-opacity-100 shadow-lg ${colors.glow}`
										: 'border-transparent hover:border-opacity-50',
									isActive && 'ring-2 ring-offset-2 ring-offset-background',
									isActive && step.color === 'purple' && 'ring-purple-500',
									isActive && step.color === 'blue' && 'ring-blue-500',
									isActive && step.color === 'cyan' && 'ring-cyan-500',
									isActive && step.color === 'green' && 'ring-green-500',
									isActive && step.color === 'amber' && 'ring-amber-500',
									isActive && step.color === 'orange' && 'ring-orange-500',
									isActive && step.color === 'rose' && 'ring-rose-500',
								)}
							>
								{/* Step number */}
								<span
									className={cn(
										'absolute -top-3 -left-3 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold',
										colors.bg,
										colors.text,
										'border',
										colors.border,
									)}
								>
									{index + 1}
								</span>

								{/* Icon */}
								<div
									className={cn(
										'w-14 h-14 rounded-xl flex items-center justify-center mb-3',
										colors.bg,
									)}
								>
									<Icon className={cn('w-7 h-7', colors.text)} />
								</div>

								{/* Title */}
								<h3
									className={cn(
										'font-semibold text-lg',
										isActive ? colors.text : 'text-foreground',
									)}
								>
									{step.title}
								</h3>

								{/* Brief description */}
								<p className="text-xs text-muted-foreground text-center mt-1 line-clamp-2">
									{step.description}
								</p>

								{/* Active indicator */}
								{isActive && (
									<motion.div
										layoutId="active-indicator"
										className={cn(
											'absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full',
											step.color === 'purple' && 'bg-purple-500',
											step.color === 'blue' && 'bg-blue-500',
											step.color === 'cyan' && 'bg-cyan-500',
											step.color === 'green' && 'bg-green-500',
											step.color === 'amber' && 'bg-amber-500',
											step.color === 'orange' && 'bg-orange-500',
											step.color === 'rose' && 'bg-rose-500',
										)}
									/>
								)}
							</motion.button>

							{/* Arrow */}
							{index < workflowSteps.length - 1 && (
								<div className="hidden md:flex items-center px-2">
									<ArrowRight className="w-6 h-6 text-muted-foreground/50" />
								</div>
							)}
						</div>
					)
				})}
			</div>

			{/* Cycle indicator */}
			<div className="hidden md:flex justify-center mt-4">
				<div className="flex items-center gap-2 text-sm text-muted-foreground">
					<span>Continuous cycle</span>
					<div className="w-20 h-px bg-gradient-to-r from-purple-500 via-green-500 to-purple-500" />
				</div>
			</div>

			{/* Expanded details */}
			<AnimatePresence mode="wait">
				{activeStep && (
					<motion.div
						initial={{ opacity: 0, y: 20, height: 0 }}
						animate={{ opacity: 1, y: 0, height: 'auto' }}
						exit={{ opacity: 0, y: 20, height: 0 }}
						transition={{ duration: 0.3 }}
						className="mt-8"
					>
						{workflowSteps
							.filter((s) => s.id === activeStep)
							.map((step) => {
								const colors = colorMap[step.color]
								return (
									<div
										key={step.id}
										className={cn(
											'p-6 rounded-xl border',
											colors.bg,
											colors.border,
										)}
									>
										<h4
											className={cn('font-semibold text-lg mb-2', colors.text)}
										>
											{step.title} Phase
										</h4>
										<p className="text-muted-foreground mb-4">
											{step.description}
										</p>

										<div className="flex flex-wrap gap-2">
											<span
												className={cn(
													'px-3 py-1.5 rounded-lg font-mono text-sm',
													colors.bg,
													colors.text,
													'border',
													colors.border,
												)}
											>
												{step.command}
											</span>
											{step.agent && (
												<span className="px-3 py-1.5 rounded-lg text-sm bg-muted text-muted-foreground">
													Agent: {step.agent}
												</span>
											)}
										</div>
									</div>
								)
							})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
