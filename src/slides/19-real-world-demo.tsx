import { motion } from 'framer-motion'
import {
	CheckCircle,
	Code,
	ExternalLink,
	Eye,
	GitCommit,
	GitPullRequest,
	Lightbulb,
	Loader2,
	Play,
	Rocket,
	Settings,
	Wrench,
} from 'lucide-react'
import { useEffect, useState } from 'react'

const demoSteps = [
	{ id: 'setup', icon: Settings, label: '/setup', duration: 2000 },
	{ id: 'plan', icon: Lightbulb, label: '/plan', duration: 3000 },
	{ id: 'implement', icon: Code, label: '/implement', duration: 4000 },
	{ id: 'refactor', icon: Wrench, label: '/refactor', duration: 2000 },
	{ id: 'verify', icon: CheckCircle, label: '/verify', duration: 2000 },
	{ id: 'review', icon: Eye, label: '/review', duration: 3000 },
	{ id: 'commit', icon: GitCommit, label: '/commit', duration: 1500 },
	{ id: 'pr', icon: GitPullRequest, label: '/pr', duration: 1500 },
]

export default function RealWorldDemoSlide() {
	const [isRunning, setIsRunning] = useState(false)
	const [currentStep, setCurrentStep] = useState(-1)
	const [completedSteps, setCompletedSteps] = useState<number[]>([])

	useEffect(() => {
		if (!isRunning) return

		let stepIndex = 0
		const runStep = () => {
			if (stepIndex >= demoSteps.length) {
				setIsRunning(false)
				return
			}

			setCurrentStep(stepIndex)

			setTimeout(() => {
				setCompletedSteps((prev) => [...prev, stepIndex])
				stepIndex++
				runStep()
			}, demoSteps[stepIndex].duration)
		}

		runStep()
	}, [isRunning])

	const startDemo = () => {
		setIsRunning(true)
		setCurrentStep(-1)
		setCompletedSteps([])
	}

	return (
		<div className="space-y-6 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-rose-500/20 text-purple-400 mb-4">
					<Rocket className="w-4 h-4" />
					<span className="text-sm font-medium">Full Pipeline Demo</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">/ship</span> in Action
				</h2>
				<p className="text-muted-foreground text-lg">
					Watch the entire pipeline execute
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
					<span className="text-purple-400">/ship</span>{' '}
					<span className="text-muted-foreground">"add shopping cart"</span>{' '}
					<span className="text-green-400">--browser</span>
				</code>
			</motion.div>

			{/* Pipeline visualization */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
				className="p-6 rounded-xl bg-card border border-border"
			>
				<div className="flex items-center justify-between mb-6">
					<span className="font-medium">Pipeline Progress</span>
					{!isRunning && completedSteps.length === 0 && (
						<button
							onClick={startDemo}
							className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/50 text-purple-400 hover:bg-purple-500/30 transition-colors"
						>
							<Play className="w-4 h-4" />
							<span>Run Demo</span>
						</button>
					)}
					{completedSteps.length === demoSteps.length && (
						<div className="flex items-center gap-2 text-green-400">
							<CheckCircle className="w-5 h-5" />
							<span>Complete!</span>
						</div>
					)}
				</div>

				<div className="grid grid-cols-4 gap-3">
					{demoSteps.map((step, i) => {
						const isComplete = completedSteps.includes(i)
						const isCurrent = currentStep === i
						const Icon = step.icon

						return (
							<motion.div
								key={step.id}
								initial={{ opacity: 0.5 }}
								animate={{
									opacity: isComplete || isCurrent ? 1 : 0.5,
									scale: isCurrent ? 1.05 : 1,
								}}
								className={`p-3 rounded-lg border text-center transition-all ${
									isComplete
										? 'bg-green-500/10 border-green-500/50'
										: isCurrent
											? 'bg-purple-500/10 border-purple-500/50'
											: 'bg-card border-border'
								}`}
							>
								<div className="flex justify-center mb-2">
									{isCurrent ? (
										<Loader2 className="w-6 h-6 text-purple-400 animate-spin" />
									) : isComplete ? (
										<CheckCircle className="w-6 h-6 text-green-400" />
									) : (
										<Icon className="w-6 h-6 text-muted-foreground" />
									)}
								</div>
								<code
									className={`text-xs font-mono ${
										isComplete
											? 'text-green-400'
											: isCurrent
												? 'text-purple-400'
												: 'text-muted-foreground'
									}`}
								>
									{step.label}
								</code>
							</motion.div>
						)
					})}
				</div>

				{/* Progress bar */}
				<div className="mt-6 h-2 bg-card rounded-full overflow-hidden border border-border">
					<motion.div
						className="h-full bg-gradient-to-r from-purple-500 to-rose-500"
						initial={{ width: '0%' }}
						animate={{
							width: `${(completedSteps.length / demoSteps.length) * 100}%`,
						}}
						transition={{ duration: 0.3 }}
					/>
				</div>
			</motion.div>

			{/* Result */}
			{completedSteps.length === demoSteps.length && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					className="p-5 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30"
				>
					<div className="flex items-center justify-between">
						<div>
							<div className="font-medium text-green-400 mb-1">
								PR Created Successfully!
							</div>
							<code className="text-sm text-muted-foreground">
								github.com/your-repo/pull/42
							</code>
						</div>
						<div className="flex items-center gap-2 text-green-400">
							<ExternalLink className="w-5 h-5" />
							<span className="text-sm">View PR</span>
						</div>
					</div>
				</motion.div>
			)}

			{/* Stats */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
				className="grid grid-cols-4 gap-4 text-center text-sm"
			>
				<div className="p-3 rounded-lg bg-card border border-border">
					<div className="text-2xl font-bold text-purple-400">8</div>
					<div className="text-muted-foreground">Phases</div>
				</div>
				<div className="p-3 rounded-lg bg-card border border-border">
					<div className="text-2xl font-bold text-blue-400">9</div>
					<div className="text-muted-foreground">Agents</div>
				</div>
				<div className="p-3 rounded-lg bg-card border border-border">
					<div className="text-2xl font-bold text-green-400">1</div>
					<div className="text-muted-foreground">Command</div>
				</div>
				<div className="p-3 rounded-lg bg-card border border-border">
					<div className="text-2xl font-bold text-amber-400">0</div>
					<div className="text-muted-foreground">Manual Steps</div>
				</div>
			</motion.div>
		</div>
	)
}
