import { motion } from 'framer-motion'
import {
	Check,
	CheckCircle,
	FileCode,
	Hammer,
	Loader2,
	Monitor,
	Package,
	RefreshCw,
	X,
} from 'lucide-react'
import { useEffect, useState } from 'react'

const checks = [
	{ name: 'TypeScript', command: 'tsc --noEmit', icon: FileCode },
	{ name: 'Linter', command: 'biome lint', icon: Hammer },
	{ name: 'Build', command: 'vite build', icon: Package },
	{ name: 'Browser', command: 'visual check', icon: Monitor },
]

export default function VerifyCommandSlide() {
	const [iteration, setIteration] = useState(1)
	const [checkStates, setCheckStates] = useState([
		'loading',
		'pending',
		'pending',
		'pending',
	])

	useEffect(() => {
		const timer1 = setTimeout(
			() => setCheckStates(['pass', 'loading', 'pending', 'pending']),
			1000,
		)
		const timer2 = setTimeout(
			() => setCheckStates(['pass', 'fail', 'pending', 'pending']),
			2000,
		)
		const timer3 = setTimeout(() => {
			setIteration(2)
			setCheckStates(['loading', 'pending', 'pending', 'pending'])
		}, 3000)
		const timer4 = setTimeout(
			() => setCheckStates(['pass', 'loading', 'pending', 'pending']),
			4000,
		)
		const timer5 = setTimeout(
			() => setCheckStates(['pass', 'pass', 'loading', 'pending']),
			5000,
		)
		const timer6 = setTimeout(
			() => setCheckStates(['pass', 'pass', 'pass', 'loading']),
			6000,
		)
		const timer7 = setTimeout(
			() => setCheckStates(['pass', 'pass', 'pass', 'pass']),
			7000,
		)

		return () => {
			clearTimeout(timer1)
			clearTimeout(timer2)
			clearTimeout(timer3)
			clearTimeout(timer4)
			clearTimeout(timer5)
			clearTimeout(timer6)
			clearTimeout(timer7)
		}
	}, [])

	return (
		<div className="space-y-6 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 text-green-400 mb-4">
					<CheckCircle className="w-4 h-4" />
					<span className="text-sm font-medium">Phase 3</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">/verify</span>
				</h2>
				<p className="text-muted-foreground text-lg">
					Loop until everything passes
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
					<span className="text-green-400">/verify</span>{' '}
					<span className="text-muted-foreground">/dashboard</span>
				</code>
			</motion.div>

			{/* Verification loop visualization */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="max-w-md mx-auto"
			>
				<div className="p-6 rounded-xl bg-card border border-border">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2">
							<RefreshCw
								className={`w-5 h-5 text-green-400 ${iteration < 2 || checkStates.includes('loading') ? 'animate-spin' : ''}`}
							/>
							<span className="font-medium">Verification Loop</span>
						</div>
						<span className="text-sm text-muted-foreground">
							Iteration {iteration}/5
						</span>
					</div>

					<div className="space-y-3">
						{checks.map((check, i) => {
							const state = checkStates[i]
							const Icon = check.icon

							return (
								<div
									key={check.name}
									className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
										state === 'pass'
											? 'bg-green-500/10 border-green-500/30'
											: state === 'fail'
												? 'bg-red-500/10 border-red-500/30'
												: state === 'loading'
													? 'bg-blue-500/10 border-blue-500/30'
													: 'bg-card border-border'
									}`}
								>
									<Icon
										className={`w-5 h-5 ${
											state === 'pass'
												? 'text-green-400'
												: state === 'fail'
													? 'text-red-400'
													: state === 'loading'
														? 'text-blue-400'
														: 'text-muted-foreground'
										}`}
									/>
									<div className="flex-1">
										<div className="text-sm font-medium">{check.name}</div>
										<code className="text-xs text-muted-foreground">
											{check.command}
										</code>
									</div>
									{state === 'pass' && (
										<Check className="w-5 h-5 text-green-400" />
									)}
									{state === 'fail' && <X className="w-5 h-5 text-red-400" />}
									{state === 'loading' && (
										<Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
									)}
								</div>
							)
						})}
					</div>

					{checkStates.every((s) => s === 'pass') && (
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							className="mt-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-center"
						>
							<CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-1" />
							<span className="text-green-400 font-medium">
								All checks passed!
							</span>
						</motion.div>
					)}
				</div>
			</motion.div>

			{/* Features */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
				className="grid grid-cols-3 gap-4 text-center text-sm"
			>
				<div className="p-3 rounded-lg bg-card border border-border">
					<div className="font-medium mb-1">Max 5 Iterations</div>
					<span className="text-muted-foreground">Prevents infinite loops</span>
				</div>
				<div className="p-3 rounded-lg bg-card border border-border">
					<div className="font-medium mb-1">Auto-Fix</div>
					<span className="text-muted-foreground">
						Attempts to fix failures
					</span>
				</div>
				<div className="p-3 rounded-lg bg-card border border-border">
					<div className="font-medium mb-1">Browser Check</div>
					<span className="text-muted-foreground">Visual verification</span>
				</div>
			</motion.div>
		</div>
	)
}
