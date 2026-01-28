import { motion } from 'framer-motion'
import { GraduationCap, Presentation, Sparkles, Zap } from 'lucide-react'
import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '../../lib/utils'

const tabs = [
	{
		to: '/dashboard/learn',
		label: 'Learn ADX',
		icon: GraduationCap,
		description: 'Agentic Development',
	},
	{
		to: '/dashboard/presentation',
		label: 'Presentation',
		icon: Presentation,
		description: 'Workshop Slides',
	},
]

function ContentLoader() {
	return (
		<div className="flex items-center justify-center min-h-[400px]">
			<div className="flex items-center gap-3">
				<div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
				<div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
				<div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
			</div>
		</div>
	)
}

export default function DashboardLayout() {
	return (
		<div className="min-h-screen bg-background overflow-hidden">
			{/* Animated background gradient */}
			<div className="fixed inset-0 pointer-events-none">
				<div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-background to-blue-900/20" />
				<motion.div
					className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
					animate={{
						scale: [1, 1.2, 1],
						opacity: [0.3, 0.5, 0.3],
					}}
					transition={{
						duration: 8,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>
				<motion.div
					className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
					animate={{
						scale: [1.2, 1, 1.2],
						opacity: [0.5, 0.3, 0.5],
					}}
					transition={{
						duration: 8,
						repeat: Number.POSITIVE_INFINITY,
						ease: 'easeInOut',
					}}
				/>
			</div>

			{/* Header */}
			<header className="relative z-10 border-b border-white/10 backdrop-blur-xl bg-background/50">
				<div className="max-w-7xl mx-auto px-6 py-4">
					<div className="flex items-center justify-between">
						<motion.div
							className="flex items-center gap-3"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5 }}
						>
							<div className="relative">
								<motion.div
									className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center"
									animate={{
										boxShadow: [
											'0 0 20px rgba(124, 58, 237, 0.5)',
											'0 0 40px rgba(124, 58, 237, 0.8)',
											'0 0 20px rgba(124, 58, 237, 0.5)',
										],
									}}
									transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
								>
									<Zap className="w-5 h-5 text-white" />
								</motion.div>
								<motion.div
									className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-background"
									animate={{ scale: [1, 1.2, 1] }}
									transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
								/>
							</div>
							<div>
								<h1 className="text-xl font-bold text-gradient">
									ADX Workshop
								</h1>
								<p className="text-xs text-muted-foreground">
									Claude Code Agentic Development
								</p>
							</div>
						</motion.div>

						{/* Live indicator */}
						<motion.div
							className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ delay: 0.3 }}
						>
							<motion.div
								className="w-2 h-2 bg-green-400 rounded-full"
								animate={{ opacity: [1, 0.5, 1] }}
								transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
							/>
							<span className="text-sm text-green-400 font-medium">Live</span>
							<Sparkles className="w-4 h-4 text-green-400" />
						</motion.div>
					</div>

					{/* Tab Navigation */}
					<nav className="flex gap-2 mt-4">
						{tabs.map((tab, index) => {
							const Icon = tab.icon

							return (
								<NavLink
									key={tab.to}
									to={tab.to}
									className={({ isActive }) =>
										cn(
											'relative flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-300',
											'border backdrop-blur-sm',
											isActive
												? 'bg-purple-500/20 border-purple-500/50 text-white'
												: 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10 hover:border-white/20',
										)
									}
								>
									{({ isActive }) => (
										<motion.div
											className="flex items-center gap-3"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: 0.2 + index * 0.1 }}
										>
											{isActive && (
												<motion.div
													className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20"
													layoutId="activeTab"
													transition={{
														type: 'spring',
														bounce: 0.2,
														duration: 0.6,
													}}
												/>
											)}
											<Icon
												className={cn(
													'w-5 h-5 relative z-10',
													isActive && 'text-purple-400',
												)}
											/>
											<div className="relative z-10 text-left">
												<div className="font-medium">{tab.label}</div>
												<div className="text-xs opacity-70">
													{tab.description}
												</div>
											</div>
										</motion.div>
									)}
								</NavLink>
							)
						})}
					</nav>
				</div>
			</header>

			{/* Main Content - Outlet renders child routes */}
			<main className="relative z-10 max-w-7xl mx-auto px-6 py-6 overflow-x-hidden">
				<Suspense fallback={<ContentLoader />}>
					<Outlet />
				</Suspense>
			</main>
		</div>
	)
}
