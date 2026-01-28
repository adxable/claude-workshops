import { motion } from 'framer-motion'
import {
	BarChart3,
	Clock,
	DollarSign,
	TrendingUp,
	Users,
	Zap,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../lib/utils'

interface Phase {
	name: string
	baseMinutes: number
	color: string
}

const traditionalPhases: Phase[] = [
	{ name: 'Planning', baseMinutes: 120, color: 'bg-slate-500' },
	{ name: 'Coding', baseMinutes: 240, color: 'bg-slate-400' },
	{ name: 'Code Review', baseMinutes: 60, color: 'bg-slate-500' },
	{ name: 'Testing', baseMinutes: 60, color: 'bg-slate-400' },
	{ name: 'PR Creation', baseMinutes: 30, color: 'bg-slate-500' },
]

const adxPhases: Phase[] = [
	{ name: '/plan', baseMinutes: 15, color: 'bg-purple-500' },
	{ name: '/implement', baseMinutes: 30, color: 'bg-blue-500' },
	{ name: '/review', baseMinutes: 10, color: 'bg-amber-500' },
	{ name: '/verify', baseMinutes: 5, color: 'bg-green-500' },
	{ name: '/commit + /pr', baseMinutes: 5, color: 'bg-rose-500' },
]

const formatTime = (minutes: number): string => {
	if (minutes < 60) return `${Math.round(minutes)}min`
	const hours = minutes / 60
	return hours % 1 === 0 ? `${hours}h` : `${hours.toFixed(1)}h`
}

export default function PerformanceSimulator() {
	const [complexity, setComplexity] = useState(3)
	const [teamSize, setTeamSize] = useState(2)

	// Calculate times
	const traditionalTotal = traditionalPhases.reduce(
		(acc, phase) => acc + phase.baseMinutes * complexity * (teamSize * 0.8),
		0,
	)

	const adxTotal =
		adxPhases.reduce((acc, phase) => acc + phase.baseMinutes, 0) *
			complexity *
			0.3 +
		60 // 1h constant overhead

	const timeSavedMinutes = traditionalTotal - adxTotal
	const timeSavedHours = timeSavedMinutes / 60
	const costSaved = timeSavedHours * 100
	const percentageSaved = Math.round((timeSavedMinutes / traditionalTotal) * 100)

	const maxTime = Math.max(traditionalTotal, adxTotal)

	return (
		<div className="space-y-6">
			{/* Header */}
			<motion.div
				className="flex items-center justify-between"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className="flex items-center gap-4">
					<div className="p-2.5 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30">
						<TrendingUp className="w-6 h-6 text-green-400" />
					</div>
					<div>
						<h2 className="text-xl font-bold text-white">
							Performance Simulator
						</h2>
						<p className="text-sm text-muted-foreground">
							Compare traditional development vs ADX workflow
						</p>
					</div>
				</div>
			</motion.div>

			{/* Comparison Grid */}
			<motion.div
				className="grid md:grid-cols-2 gap-6"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
			>
				{/* Traditional Development */}
				<div className="p-5 rounded-xl bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-slate-700/50">
					<div className="flex items-center gap-2 mb-4">
						<Clock className="w-5 h-5 text-slate-400" />
						<h3 className="font-semibold text-white">Traditional Development</h3>
					</div>
					<div className="space-y-3">
						{traditionalPhases.map((phase) => {
							const phaseTime = phase.baseMinutes * complexity * (teamSize * 0.8)
							const width = (phaseTime / maxTime) * 100
							return (
								<div key={phase.name}>
									<div className="flex justify-between text-sm mb-1">
										<span className="text-muted-foreground">{phase.name}</span>
										<span className="text-slate-300">{formatTime(phaseTime)}</span>
									</div>
									<div className="h-2 bg-slate-800 rounded-full overflow-hidden">
										<motion.div
											className={cn('h-full rounded-full', phase.color)}
											initial={{ width: 0 }}
											animate={{ width: `${width}%` }}
											transition={{ duration: 0.5, ease: 'easeOut' }}
										/>
									</div>
								</div>
							)
						})}
					</div>
					<div className="mt-4 pt-4 border-t border-slate-700">
						<div className="flex justify-between items-center">
							<span className="text-sm text-muted-foreground">Total Time</span>
							<motion.span
								className="text-xl font-bold text-slate-300"
								key={traditionalTotal}
								initial={{ scale: 1.2, color: '#ef4444' }}
								animate={{ scale: 1, color: '#cbd5e1' }}
							>
								{formatTime(traditionalTotal)}
							</motion.span>
						</div>
					</div>
				</div>

				{/* ADX Workflow */}
				<div className="p-5 rounded-xl bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30">
					<div className="flex items-center gap-2 mb-4">
						<Zap className="w-5 h-5 text-purple-400" />
						<h3 className="font-semibold text-white">ADX /ship Workflow</h3>
					</div>
					<div className="space-y-3">
						{adxPhases.map((phase) => {
							const phaseTime = phase.baseMinutes * complexity * 0.3 + 12 // distributed overhead
							const width = (phaseTime / maxTime) * 100
							return (
								<div key={phase.name}>
									<div className="flex justify-between text-sm mb-1">
										<span className="text-purple-300 font-mono">{phase.name}</span>
										<span className="text-purple-200">{formatTime(phaseTime)}</span>
									</div>
									<div className="h-2 bg-purple-900/50 rounded-full overflow-hidden">
										<motion.div
											className={cn('h-full rounded-full', phase.color)}
											initial={{ width: 0 }}
											animate={{ width: `${width}%` }}
											transition={{ duration: 0.5, ease: 'easeOut' }}
										/>
									</div>
								</div>
							)
						})}
					</div>
					<div className="mt-4 pt-4 border-t border-purple-500/30">
						<div className="flex justify-between items-center">
							<span className="text-sm text-muted-foreground">Total Time</span>
							<motion.span
								className="text-xl font-bold text-purple-300"
								key={adxTotal}
								initial={{ scale: 1.2, color: '#22c55e' }}
								animate={{ scale: 1, color: '#d8b4fe' }}
							>
								{formatTime(adxTotal)}
							</motion.span>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Sliders */}
			<motion.div
				className="p-5 rounded-xl bg-gradient-to-br from-zinc-900/50 to-zinc-900 border border-white/10"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className="grid md:grid-cols-2 gap-6">
					{/* Complexity Slider */}
					<div>
						<div className="flex items-center justify-between mb-3">
							<div className="flex items-center gap-2">
								<BarChart3 className="w-4 h-4 text-purple-400" />
								<label className="text-sm font-medium text-white">
									Project Complexity
								</label>
							</div>
							<span className="px-2 py-1 rounded bg-purple-500/20 text-purple-400 text-sm font-mono">
								{complexity}/5
							</span>
						</div>
						<input
							type="range"
							min="1"
							max="5"
							value={complexity}
							onChange={(e) => setComplexity(Number(e.target.value))}
							className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer
								[&::-webkit-slider-thumb]:appearance-none
								[&::-webkit-slider-thumb]:w-5
								[&::-webkit-slider-thumb]:h-5
								[&::-webkit-slider-thumb]:rounded-full
								[&::-webkit-slider-thumb]:bg-purple-500
								[&::-webkit-slider-thumb]:cursor-pointer
								[&::-webkit-slider-thumb]:shadow-lg
								[&::-webkit-slider-thumb]:shadow-purple-500/50"
						/>
						<div className="flex justify-between mt-1 text-xs text-muted-foreground">
							<span>Simple</span>
							<span>Complex</span>
						</div>
					</div>

					{/* Team Size Slider */}
					<div>
						<div className="flex items-center justify-between mb-3">
							<div className="flex items-center gap-2">
								<Users className="w-4 h-4 text-blue-400" />
								<label className="text-sm font-medium text-white">
									Team Size
								</label>
							</div>
							<span className="px-2 py-1 rounded bg-blue-500/20 text-blue-400 text-sm font-mono">
								{teamSize}
							</span>
						</div>
						<input
							type="range"
							min="1"
							max="5"
							value={teamSize}
							onChange={(e) => setTeamSize(Number(e.target.value))}
							className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer
								[&::-webkit-slider-thumb]:appearance-none
								[&::-webkit-slider-thumb]:w-5
								[&::-webkit-slider-thumb]:h-5
								[&::-webkit-slider-thumb]:rounded-full
								[&::-webkit-slider-thumb]:bg-blue-500
								[&::-webkit-slider-thumb]:cursor-pointer
								[&::-webkit-slider-thumb]:shadow-lg
								[&::-webkit-slider-thumb]:shadow-blue-500/50"
						/>
						<div className="flex justify-between mt-1 text-xs text-muted-foreground">
							<span>Solo</span>
							<span>Large Team</span>
						</div>
					</div>
				</div>
			</motion.div>

			{/* Metrics */}
			<motion.div
				className="grid grid-cols-3 gap-4"
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
			>
				{/* Time Saved */}
				<div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30">
					<div className="flex items-center gap-2 mb-2">
						<Clock className="w-4 h-4 text-green-400" />
						<span className="text-sm text-muted-foreground">Time Saved</span>
					</div>
					<motion.div
						className="text-2xl font-bold text-green-400"
						key={timeSavedHours}
						initial={{ scale: 1.1 }}
						animate={{ scale: 1 }}
					>
						{timeSavedHours.toFixed(1)}h
					</motion.div>
				</div>

				{/* Cost Saved */}
				<div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
					<div className="flex items-center gap-2 mb-2">
						<DollarSign className="w-4 h-4 text-blue-400" />
						<span className="text-sm text-muted-foreground">Cost Saved</span>
					</div>
					<motion.div
						className="text-2xl font-bold text-blue-400"
						key={costSaved}
						initial={{ scale: 1.1 }}
						animate={{ scale: 1 }}
					>
						${costSaved.toFixed(0)}
					</motion.div>
				</div>

				{/* Improvement */}
				<div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30">
					<div className="flex items-center gap-2 mb-2">
						<TrendingUp className="w-4 h-4 text-purple-400" />
						<span className="text-sm text-muted-foreground">Improvement</span>
					</div>
					<motion.div
						className="text-2xl font-bold text-purple-400"
						key={percentageSaved}
						initial={{ scale: 1.1 }}
						animate={{ scale: 1 }}
					>
						{percentageSaved}%
					</motion.div>
				</div>
			</motion.div>

			{/* Footer Note */}
			<motion.p
				className="text-center text-xs text-muted-foreground"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.4 }}
			>
				Based on $100/hour rate. Traditional development scales with team coordination overhead.
			</motion.p>
		</div>
	)
}
