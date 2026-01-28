import { motion } from 'framer-motion'
import {
	ArrowRight,
	Check,
	FileJson,
	Package,
	Settings,
	Sparkles,
} from 'lucide-react'

const detectedStack = [
	{ name: 'State', value: 'zustand', color: 'text-purple-400' },
	{
		name: 'Server State',
		value: '@tanstack/react-query',
		color: 'text-blue-400',
	},
	{ name: 'Forms', value: 'react-hook-form + zod', color: 'text-cyan-400' },
	{ name: 'Styling', value: 'tailwindcss + cva', color: 'text-green-400' },
	{ name: 'UI', value: '@radix-ui (shadcn)', color: 'text-amber-400' },
]

const configFiles = [
	{ name: 'frontend-guidelines.json', desc: 'Stack-specific patterns' },
	{ name: 'code-quality.json', desc: 'Quality rules & thresholds' },
	{ name: 'project-structure.json', desc: 'File organization' },
]

export default function SetupCommandSlide() {
	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/20 text-indigo-400 mb-4">
					<Settings className="w-4 h-4" />
					<span className="text-sm font-medium">Phase 0 - One Time</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">/setup</span>
				</h2>
				<p className="text-muted-foreground text-lg">
					Configure once, get smart assistance forever
				</p>
			</motion.div>

			{/* Command example */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="flex justify-center"
			>
				<code className="px-6 py-3 rounded-xl bg-card border border-border font-mono text-lg">
					<span className="text-indigo-400">/setup</span>{' '}
					<span className="text-muted-foreground">quick</span>
				</code>
			</motion.div>

			{/* Flow visualization */}
			<div className="grid md:grid-cols-3 gap-6">
				{/* Step 1: Detect */}
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.3 }}
					className="p-5 rounded-xl bg-card border border-border"
				>
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-10 rounded-lg bg-indigo-500/20 border border-indigo-500/50 flex items-center justify-center">
							<Package className="w-5 h-5 text-indigo-400" />
						</div>
						<div>
							<div className="text-xs text-muted-foreground">Step 1</div>
							<div className="font-medium">Detect Stack</div>
						</div>
					</div>
					<div className="space-y-2">
						{detectedStack.map((item, i) => (
							<motion.div
								key={item.name}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.4 + i * 0.1 }}
								className="flex justify-between text-sm"
							>
								<span className="text-muted-foreground">{item.name}</span>
								<span className={item.color}>{item.value}</span>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Arrow */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.6 }}
					className="hidden md:flex items-center justify-center"
				>
					<ArrowRight className="w-8 h-8 text-muted-foreground" />
				</motion.div>

				{/* Step 2: Configure */}
				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.5 }}
					className="p-5 rounded-xl bg-card border border-border"
				>
					<div className="flex items-center gap-3 mb-4">
						<div className="w-10 h-10 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center justify-center">
							<FileJson className="w-5 h-5 text-green-400" />
						</div>
						<div>
							<div className="text-xs text-muted-foreground">Step 2</div>
							<div className="font-medium">Create Config</div>
						</div>
					</div>
					<div className="space-y-2">
						{configFiles.map((file, i) => (
							<motion.div
								key={file.name}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.6 + i * 0.1 }}
								className="flex items-start gap-2 text-sm"
							>
								<Check className="w-4 h-4 text-green-400 mt-0.5" />
								<div>
									<code className="text-green-400">{file.name}</code>
									<p className="text-xs text-muted-foreground">{file.desc}</p>
								</div>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>

			{/* Benefits */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.8 }}
				className="p-5 rounded-xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/30"
			>
				<div className="flex items-center gap-2 mb-3">
					<Sparkles className="w-5 h-5 text-indigo-400" />
					<span className="font-medium">After Setup</span>
				</div>
				<div className="grid md:grid-cols-3 gap-4 text-sm">
					<div className="flex items-center gap-2">
						<Check className="w-4 h-4 text-green-400" />
						<span>
							Zustand: <code className="text-purple-400">useShallow</code>{' '}
							enforced
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Check className="w-4 h-4 text-green-400" />
						<span>
							TanStack: <code className="text-blue-400">queryOptions()</code>{' '}
							pattern
						</span>
					</div>
					<div className="flex items-center gap-2">
						<Check className="w-4 h-4 text-green-400" />
						<span>
							Tailwind: <code className="text-cyan-400">cn()</code> helper used
						</span>
					</div>
				</div>
			</motion.div>
		</div>
	)
}
