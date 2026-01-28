import { motion } from 'framer-motion'
import { ArrowRight, Bot, Rocket, Terminal } from 'lucide-react'
import { CodeBlock } from '../components/common/CodeBlock'
import { coreCommands } from '../data/commands'

export default function CoreCommandsSlide() {
	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 mb-4">
					<Rocket className="w-4 h-4" />
					<span className="text-sm font-medium">Autonomous Mode</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">Core</span> Commands
				</h2>
				<p className="text-muted-foreground">
					Fire and forget - let agents handle the entire workflow
				</p>
			</motion.div>

			{/* Commands */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{coreCommands.map((cmd, index) => (
					<motion.div
						key={cmd.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 + index * 0.15 }}
						className="p-6 rounded-xl bg-card border border-border hover:border-purple-500/50 transition-colors"
					>
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 rounded-lg bg-purple-500/20">
								{index === 0 ? (
									<Rocket className="w-5 h-5 text-purple-400" />
								) : (
									<Bot className="w-5 h-5 text-purple-400" />
								)}
							</div>
							<div>
								<code className="text-xl font-mono font-semibold text-purple-400">
									{cmd.name}
								</code>
								{cmd.flags && (
									<div className="flex gap-1 mt-1">
										{cmd.flags.map((flag) => (
											<span
												key={flag}
												className="px-1.5 py-0.5 rounded text-xs font-mono bg-green-500/20 text-green-400"
											>
												{flag}
											</span>
										))}
									</div>
								)}
							</div>
						</div>

						<p className="text-muted-foreground text-sm mb-4">
							{cmd.description}
						</p>

						<CodeBlock code={cmd.example} language="bash" />

						<div className="mt-4 space-y-1">
							{cmd.tips.map((tip) => (
								<div
									key={tip}
									className="flex items-center gap-2 text-xs text-muted-foreground"
								>
									<ArrowRight className="w-3 h-3 text-purple-400" />
									<span>{tip}</span>
								</div>
							))}
						</div>
					</motion.div>
				))}
			</div>

			{/* Comparison */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="p-4 rounded-xl bg-card/50 border border-border"
			>
				<div className="flex items-center justify-center gap-8 text-sm">
					<div className="flex items-center gap-2">
						<Terminal className="w-4 h-4 text-purple-400" />
						<span className="text-muted-foreground">
							<span className="font-semibold text-foreground">/ship</span> =
							Single pass, predictable
						</span>
					</div>
					<div className="w-px h-6 bg-border" />
					<div className="flex items-center gap-2">
						<Bot className="w-4 h-4 text-purple-400" />
						<span className="text-muted-foreground">
							<span className="font-semibold text-foreground">/ralph</span> =
							Loop until done, overnight dev
						</span>
					</div>
				</div>
			</motion.div>
		</div>
	)
}
