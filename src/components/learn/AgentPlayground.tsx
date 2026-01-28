import { AnimatePresence, motion } from 'framer-motion'
import {
	Accessibility,
	ChevronRight,
	Code2,
	Cpu,
	FileText,
	Gauge,
	GitBranch,
	Globe,
	Monitor,
	Search,
	Wrench,
	Zap,
} from 'lucide-react'
import { useState } from 'react'
import { agentUseCases } from '../../data/learning-content'
import { agents } from '../../data/workflow-steps'
import { cn } from '../../lib/utils'

const iconMap: Record<string, React.ElementType> = {
	explorer: Search,
	'web-researcher': Globe,
	refactorer: Wrench,
	'code-reviewer': Code2,
	'performance-auditor': Gauge,
	'browser-tester': Monitor,
	'git-automator': GitBranch,
	'accessibility-tester': Accessibility,
	'docs-generator': FileText,
}

const modelInfo = {
	haiku: {
		label: 'Haiku',
		description: 'Fast & efficient',
		color: 'text-emerald-400',
		bg: 'bg-emerald-500/10',
		border: 'border-emerald-500/30',
	},
	sonnet: {
		label: 'Sonnet',
		description: 'Balanced',
		color: 'text-blue-400',
		bg: 'bg-blue-500/10',
		border: 'border-blue-500/30',
	},
	opus: {
		label: 'Opus',
		description: 'Most capable',
		color: 'text-purple-400',
		bg: 'bg-purple-500/10',
		border: 'border-purple-500/30',
	},
}

export default function AgentPlayground() {
	const [selectedAgent, setSelectedAgent] = useState<string | null>(null)
	const [filterModel, setFilterModel] = useState<string | null>(null)

	const filteredAgents = filterModel
		? agents.filter((a) => a.model === filterModel)
		: agents

	const selected = agents.find((a) => a.id === selectedAgent)
	const useCases = selectedAgent ? agentUseCases[selectedAgent] || [] : []

	return (
		<div className="space-y-4">
			{/* Model filter */}
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">Filter by model:</span>
				<div className="flex gap-2">
					<button
						onClick={() => setFilterModel(null)}
						className={cn(
							'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
							!filterModel
								? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
								: 'bg-card border border-border text-muted-foreground hover:text-foreground',
						)}
					>
						All
					</button>
					{Object.entries(modelInfo).map(([model, info]) => (
						<button
							key={model}
							onClick={() =>
								setFilterModel(filterModel === model ? null : model)
							}
							className={cn(
								'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5',
								filterModel === model
									? `${info.bg} ${info.color} border ${info.border}`
									: 'bg-card border border-border text-muted-foreground hover:text-foreground',
							)}
						>
							<Zap className="w-3 h-3" />
							{info.label}
						</button>
					))}
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-4">
				{/* Agent grid */}
				<div className="grid grid-cols-3 gap-2">
					{filteredAgents.map((agent) => {
						const Icon = iconMap[agent.id] || Cpu
						const model = modelInfo[agent.model]
						const isSelected = selectedAgent === agent.id

						return (
							<motion.button
								key={agent.id}
								onClick={() => setSelectedAgent(isSelected ? null : agent.id)}
								className={cn(
									'p-3 rounded-xl border text-center transition-all',
									isSelected
										? `${model.bg} ${model.border} ring-2 ring-offset-2 ring-offset-background ${model.border}`
										: 'bg-card border-border hover:border-muted-foreground/50',
								)}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								<div
									className={cn(
										'w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center',
										model.bg,
										'border',
										model.border,
									)}
								>
									<Icon className={cn('w-5 h-5', model.color)} />
								</div>
								<div className="text-xs font-medium truncate">{agent.name}</div>
								<div className={cn('text-xs mt-1', model.color)}>
									{agent.model}
								</div>
							</motion.button>
						)
					})}
				</div>

				{/* Agent details */}
				<AnimatePresence mode="wait">
					{selected ? (
						<motion.div
							key={selected.id}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							className="p-5 rounded-xl bg-card border border-border"
						>
							<div className="flex items-start gap-4 mb-4">
								<div
									className={cn(
										'w-14 h-14 rounded-xl flex items-center justify-center',
										modelInfo[selected.model].bg,
										'border',
										modelInfo[selected.model].border,
									)}
								>
									{(() => {
										const Icon = iconMap[selected.id] || Cpu
										return (
											<Icon
												className={cn(
													'w-7 h-7',
													modelInfo[selected.model].color,
												)}
											/>
										)
									})()}
								</div>
								<div className="flex-1">
									<h3 className="text-xl font-bold">{selected.name}</h3>
									<div className="flex items-center gap-2 mt-1">
										<span
											className={cn(
												'px-2 py-0.5 rounded text-xs font-mono',
												modelInfo[selected.model].bg,
												modelInfo[selected.model].color,
											)}
										>
											{selected.model}
										</span>
										<span className="text-xs text-muted-foreground">
											{modelInfo[selected.model].description}
										</span>
									</div>
								</div>
							</div>

							<p className="text-muted-foreground mb-4">
								{selected.description}
							</p>

							{/* Capabilities */}
							<div className="mb-4">
								<h4 className="text-sm font-medium mb-2">Capabilities</h4>
								<div className="flex flex-wrap gap-2">
									{selected.capabilities.map((cap) => (
										<span
											key={cap}
											className={cn(
												'px-2 py-1 rounded text-xs',
												modelInfo[selected.model].bg,
												modelInfo[selected.model].color,
												'border',
												modelInfo[selected.model].border,
											)}
										>
											{cap}
										</span>
									))}
								</div>
							</div>

							{/* Use cases */}
							{useCases.length > 0 && (
								<div>
									<h4 className="text-sm font-medium mb-2">When to use</h4>
									<ul className="space-y-1">
										{useCases.map((useCase, i) => (
											<li
												key={i}
												className="text-sm text-muted-foreground flex items-start gap-2"
											>
												<ChevronRight
													className={cn(
														'w-4 h-4 mt-0.5 shrink-0',
														modelInfo[selected.model].color,
													)}
												/>
												{useCase}
											</li>
										))}
									</ul>
								</div>
							)}
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="p-8 rounded-xl bg-card border border-border flex flex-col items-center justify-center text-center"
						>
							<Cpu className="w-12 h-12 text-muted-foreground mb-4" />
							<p className="text-muted-foreground">
								Select an agent to see details
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
