import { motion } from 'framer-motion'
import { ArrowRight, GitCommit, GitPullRequest } from 'lucide-react'
import { CodeBlock } from '../components/common/CodeBlock'
import { gitCommands } from '../data/commands'

export default function GitCommandsSlide() {
	return (
		<div className="space-y-8 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/20 text-amber-400 mb-4">
					<GitPullRequest className="w-4 h-4" />
					<span className="text-sm font-medium">Ship It</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">Git</span> Commands
				</h2>
				<p className="text-muted-foreground">
					Automated commits and pull requests with smart descriptions
				</p>
			</motion.div>

			{/* Commands */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{gitCommands.map((cmd, index) => (
					<motion.div
						key={cmd.name}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.2 + index * 0.15 }}
						className="p-6 rounded-xl bg-card border border-border hover:border-amber-500/50 transition-colors"
					>
						<div className="flex items-center gap-3 mb-4">
							<div className="p-2 rounded-lg bg-amber-500/20">
								{cmd.name === '/commit' ? (
									<GitCommit className="w-5 h-5 text-amber-400" />
								) : (
									<GitPullRequest className="w-5 h-5 text-amber-400" />
								)}
							</div>
							<code className="text-xl font-mono font-semibold text-amber-400">
								{cmd.name}
							</code>
						</div>

						<p className="text-muted-foreground text-sm mb-4">
							{cmd.description}
						</p>

						<CodeBlock code={cmd.example} language="bash" />

						<ul className="mt-4 space-y-1">
							{cmd.tips.map((tip) => (
								<li
									key={tip}
									className="text-xs text-muted-foreground flex items-start gap-2"
								>
									<span className="text-amber-400 mt-0.5">•</span>
									{tip}
								</li>
							))}
						</ul>
					</motion.div>
				))}
			</div>

			{/* Commit format */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
				className="p-5 rounded-xl bg-card border border-border"
			>
				<h4 className="font-semibold mb-3">
					Commit Format (Conventional Commits)
				</h4>
				<CodeBlock
					code={`feat: add user authentication

Implements JWT-based auth with login/logout flows.
Adds protected route wrapper and auth context.

Co-Authored-By: Claude <noreply@anthropic.com>`}
					language="text"
				/>
			</motion.div>

			{/* Commit types */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6 }}
				className="flex flex-wrap justify-center gap-3"
			>
				{['feat', 'fix', 'refactor', 'chore', 'docs', 'test'].map((type) => (
					<span
						key={type}
						className="px-3 py-1.5 rounded-lg bg-card border border-border font-mono text-sm"
					>
						<span className="text-amber-400">{type}</span>
						<span className="text-muted-foreground">:</span>
					</span>
				))}
			</motion.div>

			{/* Flow */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.7 }}
				className="flex items-center justify-center gap-3 text-sm text-muted-foreground"
			>
				<span>Changes ready</span>
				<ArrowRight className="w-4 h-4" />
				<span className="font-mono text-amber-400">/commit</span>
				<ArrowRight className="w-4 h-4" />
				<span className="font-mono text-amber-400">/pr</span>
				<ArrowRight className="w-4 h-4" />
				<span>Merged!</span>
			</motion.div>
		</div>
	)
}
