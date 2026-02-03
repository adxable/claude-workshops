import { motion } from 'framer-motion'
import {
	Bot,
	ChevronRight,
	Cpu,
	GraduationCap,
	Sparkles,
	Terminal,
	Workflow,
} from 'lucide-react'
import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '../../lib/utils'

type TabConfig = {
	to: string
	label: string
	icon: React.ElementType
	description: string
}

const tabs: TabConfig[] = [
	{
		to: '/dashboard/learn/intro',
		label: 'Intro',
		icon: Bot,
		description: 'What is Claude Code & agentic development',
	},
	{
		to: '/dashboard/learn/workflow',
		label: 'Workflow',
		icon: Workflow,
		description: 'Step through the 6-phase pipeline',
	},
	{
		to: '/dashboard/learn/commands',
		label: 'Commands',
		icon: Terminal,
		description: 'Explore all available commands',
	},
	{
		to: '/dashboard/learn/agents',
		label: 'Agents',
		icon: Cpu,
		description: 'Learn about specialized agents',
	},
]

function ContentLoader() {
	return (
		<div className="flex items-center justify-center min-h-[200px]">
			<div className="flex items-center gap-3">
				<div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
				<div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
				<div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
			</div>
		</div>
	)
}

export default function LearnADX() {
	return (
		<div className="space-y-6">
			{/* Header */}
			<motion.div
				className="flex items-center justify-between"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className="flex items-center gap-4">
					<div className="p-2.5 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
						<GraduationCap className="w-6 h-6 text-purple-400" />
					</div>
					<div>
						<h2 className="text-xl font-bold text-white">
							Claude Code Agentic Development
						</h2>
						<p className="text-sm text-muted-foreground">
							Learn to build with AI-powered autonomous agents
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<Sparkles className="w-4 h-4 text-amber-400" />
					<span className="text-sm text-muted-foreground">
						Claude Code Workshop
					</span>
				</div>
			</motion.div>

			{/* Tab navigation */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="flex gap-2 p-1 rounded-xl bg-card border border-border"
			>
				{tabs.map((tab) => {
					const Icon = tab.icon

					return (
						<NavLink
							key={tab.to}
							to={tab.to}
							className={({ isActive }) =>
								cn(
									'flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all',
									isActive
										? 'bg-purple-500/20 border border-purple-500/50 text-purple-400'
										: 'text-muted-foreground hover:text-foreground hover:bg-white/5',
								)
							}
						>
							<Icon className="w-4 h-4" />
							<span className="font-medium">{tab.label}</span>
						</NavLink>
					)
				})}
			</motion.div>

			{/* Tab content - renders child routes */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
				className="p-6 rounded-2xl bg-gradient-to-br from-zinc-900/50 via-zinc-900 to-zinc-900/50 border border-white/10"
			>
				<Suspense fallback={<ContentLoader />}>
					<Outlet />
				</Suspense>
			</motion.div>

			{/* Quick tips */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 via-zinc-900 to-blue-500/10 border border-white/10"
			>
				<div className="flex items-center justify-center gap-6 text-sm flex-wrap">
					<div className="flex items-center gap-2 text-muted-foreground">
						<ChevronRight className="w-4 h-4 text-purple-400" />
						<span>
							Start with <code className="text-purple-400">/plan</code> to research your codebase
						</span>
					</div>
					<span className="text-muted-foreground/50">|</span>
					<div className="flex items-center gap-2 text-muted-foreground">
						<ChevronRight className="w-4 h-4 text-blue-400" />
						<span>
							Use <code className="text-blue-400">/ship</code> for full
							automation
						</span>
					</div>
					<span className="text-muted-foreground/50">|</span>
					<div className="flex items-center gap-2 text-muted-foreground">
						<ChevronRight className="w-4 h-4 text-green-400" />
						<span>
							<code className="text-green-400">12 agents</code> work together
							in the workflow
						</span>
					</div>
				</div>
			</motion.div>
		</div>
	)
}
