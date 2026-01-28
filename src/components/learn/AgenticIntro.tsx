import { motion } from 'framer-motion'
import {
	ArrowRight,
	Bot,
	Brain,
	CheckCircle2,
	Code2,
	Cpu,
	FileCode,
	GitBranch,
	Layers,
	MessageSquare,
	Repeat,
	Shield,
	Sparkles,
	Terminal,
	Wrench,
	Zap,
} from 'lucide-react'

const fadeInUp = {
	initial: { opacity: 0, y: 20 },
	animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
	animate: {
		transition: {
			staggerChildren: 0.1,
		},
	},
}

export default function AgenticIntro() {
	return (
		<motion.div
			className="space-y-8"
			variants={staggerContainer}
			initial="initial"
			animate="animate"
		>
			{/* Hero Section */}
			<motion.div variants={fadeInUp} className="text-center space-y-4">
				<div className="flex justify-center">
					<motion.div
						className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30"
						animate={{
							boxShadow: [
								'0 0 20px rgba(124, 58, 237, 0.3)',
								'0 0 40px rgba(124, 58, 237, 0.5)',
								'0 0 20px rgba(124, 58, 237, 0.3)',
							],
						}}
						transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
					>
						<Bot className="w-12 h-12 text-purple-400" />
					</motion.div>
				</div>
				<h1 className="text-3xl font-bold text-white">
					Welcome to Agentic Development
				</h1>
				<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
					Claude Code transforms how you build software by using AI agents that
					can plan, implement, verify, and ship code autonomously.
				</p>
			</motion.div>

			{/* What is Claude Code */}
			<motion.div
				variants={fadeInUp}
				className="p-6 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-white/10"
			>
				<div className="flex items-center gap-3 mb-4">
					<Terminal className="w-6 h-6 text-purple-400" />
					<h2 className="text-xl font-semibold text-white">
						What is Claude Code?
					</h2>
				</div>
				<p className="text-muted-foreground mb-4">
					Claude Code is Anthropic's official CLI for Claude that brings
					AI-powered coding directly to your terminal. It's not just a chatbot -
					it's a full development environment where Claude can:
				</p>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
					{[
						{ icon: FileCode, label: 'Read & write files' },
						{ icon: Terminal, label: 'Run commands' },
						{ icon: GitBranch, label: 'Manage git' },
						{ icon: Brain, label: 'Plan & reason' },
					].map(({ icon: Icon, label }) => (
						<div
							key={label}
							className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10"
						>
							<Icon className="w-5 h-5 text-blue-400" />
							<span className="text-sm text-white">{label}</span>
						</div>
					))}
				</div>
			</motion.div>

			{/* What is Agentic Development */}
			<motion.div
				variants={fadeInUp}
				className="p-6 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-white/10"
			>
				<div className="flex items-center gap-3 mb-4">
					<Cpu className="w-6 h-6 text-blue-400" />
					<h2 className="text-xl font-semibold text-white">
						What is Agentic Development?
					</h2>
				</div>
				<p className="text-muted-foreground mb-4">
					Agentic development is a paradigm shift where AI agents autonomously
					perform complex, multi-step tasks. Instead of just suggesting code,
					agents can:
				</p>
				<div className="space-y-3">
					{[
						'Break down complex tasks into smaller steps',
						'Execute plans and adapt based on results',
						'Validate their own work using hooks',
						'Iterate until the task is complete',
					].map((item) => (
						<div key={item} className="flex items-center gap-3">
							<CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
							<span className="text-white">{item}</span>
						</div>
					))}
				</div>
			</motion.div>

			{/* The Core 4 Model */}
			<motion.div
				variants={fadeInUp}
				className="p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20"
			>
				<div className="flex items-center gap-3 mb-4">
					<Layers className="w-6 h-6 text-purple-400" />
					<h2 className="text-xl font-semibold text-white">
						The Core 4 Model
					</h2>
				</div>
				<p className="text-muted-foreground mb-6">
					Everything in agentic engineering reduces to four fundamental
					building blocks:
				</p>
				<div className="grid grid-cols-2 gap-4">
					{[
						{
							icon: MessageSquare,
							title: 'Prompts',
							description: 'Instructions that guide agent behavior',
							color: 'text-purple-400',
							bg: 'bg-purple-500/10',
						},
						{
							icon: Wrench,
							title: 'Tools',
							description: 'Actions agents can take (read, write, bash)',
							color: 'text-blue-400',
							bg: 'bg-blue-500/10',
						},
						{
							icon: Brain,
							title: 'Context Model',
							description: 'Information the agent has access to',
							color: 'text-green-400',
							bg: 'bg-green-500/10',
						},
						{
							icon: Bot,
							title: 'Agents',
							description: 'Autonomous executors with specific roles',
							color: 'text-amber-400',
							bg: 'bg-amber-500/10',
						},
					].map(({ icon: Icon, title, description, color, bg }) => (
						<motion.div
							key={title}
							className={`p-4 rounded-xl ${bg} border border-white/10`}
							whileHover={{ scale: 1.02 }}
							transition={{ type: 'spring', stiffness: 300 }}
						>
							<Icon className={`w-8 h-8 ${color} mb-2`} />
							<h3 className="font-semibold text-white">{title}</h3>
							<p className="text-sm text-muted-foreground">{description}</p>
						</motion.div>
					))}
				</div>
				<p className="text-sm text-muted-foreground mt-4 text-center italic">
					"Custom commands, skills, and subagents all collapse into these four
					primitives."
				</p>
			</motion.div>

			{/* Self-Validating Agents */}
			<motion.div
				variants={fadeInUp}
				className="p-6 rounded-xl bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/20"
			>
				<div className="flex items-center gap-3 mb-4">
					<Shield className="w-6 h-6 text-green-400" />
					<h2 className="text-xl font-semibold text-white">
						Self-Validating Agents with Hooks
					</h2>
				</div>
				<p className="text-muted-foreground mb-4">
					The key to reliable agentic development: agents that validate their
					own work. Hooks run at specific points in the agent lifecycle:
				</p>
				<div className="flex items-center justify-center gap-4 mb-4">
					<div className="text-center">
						<div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-2">
							<Code2 className="w-6 h-6 text-blue-400" />
						</div>
						<span className="text-xs text-muted-foreground">pre-tool-use</span>
					</div>
					<ArrowRight className="w-4 h-4 text-muted-foreground" />
					<div className="text-center">
						<div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-2">
							<Zap className="w-6 h-6 text-purple-400" />
						</div>
						<span className="text-xs text-muted-foreground">Tool Action</span>
					</div>
					<ArrowRight className="w-4 h-4 text-muted-foreground" />
					<div className="text-center">
						<div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-2">
							<CheckCircle2 className="w-6 h-6 text-green-400" />
						</div>
						<span className="text-xs text-muted-foreground">post-tool-use</span>
					</div>
					<ArrowRight className="w-4 h-4 text-muted-foreground" />
					<div className="text-center">
						<div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center mx-auto mb-2">
							<Repeat className="w-6 h-6 text-amber-400" />
						</div>
						<span className="text-xs text-muted-foreground">on-stop</span>
					</div>
				</div>
				<div className="p-4 rounded-lg bg-black/30 border border-white/10 font-mono text-sm">
					<div className="text-muted-foreground"># Hook configuration example</div>
					<div className="text-purple-400">hooks:</div>
					<div className="text-blue-400 ml-2">post-tool-use:</div>
					<div className="text-green-400 ml-4">
						write: "uv run validators/validate.py {'{file_path}'}"
					</div>
				</div>
				<p className="text-sm text-muted-foreground mt-4 text-center">
					<Sparkles className="w-4 h-4 text-amber-400 inline mr-1" />
					"Validation increases trust, and trust saves the most precious
					engineering resource: time."
				</p>
			</motion.div>

			{/* ADX Plugin Overview */}
			<motion.div
				variants={fadeInUp}
				className="p-6 rounded-xl bg-gradient-to-br from-amber-900/20 to-orange-900/20 border border-amber-500/20"
			>
				<div className="flex items-center gap-3 mb-4">
					<Sparkles className="w-6 h-6 text-amber-400" />
					<h2 className="text-xl font-semibold text-white">
						ADX Toolkit: Your Agentic Workflow
					</h2>
				</div>
				<p className="text-muted-foreground mb-4">
					The ADX Toolkit is a Claude Code plugin that implements a complete
					8-phase development workflow. It provides:
				</p>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-3">
					{[
						{ label: 'Custom Commands', count: '8+' },
						{ label: 'Specialized Agents', count: '12+' },
						{ label: 'Workflow Phases', count: '8' },
						{ label: 'Built-in Hooks', count: 'Yes' },
					].map(({ label, count }) => (
						<div
							key={label}
							className="text-center p-3 rounded-lg bg-white/5 border border-white/10"
						>
							<div className="text-2xl font-bold text-amber-400">{count}</div>
							<div className="text-xs text-muted-foreground">{label}</div>
						</div>
					))}
				</div>
				<div className="mt-4 p-4 rounded-lg bg-black/30 border border-white/10">
					<div className="text-sm text-muted-foreground mb-2">
						The 8-phase workflow:
					</div>
					<div className="flex flex-wrap gap-2">
						{[
							'Setup',
							'Plan',
							'Implement',
							'Refactor',
							'Verify',
							'Review',
							'Commit',
							'PR',
						].map((phase, i) => (
							<div
								key={phase}
								className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 text-sm"
							>
								<span className="text-amber-400 font-mono text-xs">
									{i + 1}.
								</span>
								<span className="text-white">{phase}</span>
							</div>
						))}
					</div>
				</div>
			</motion.div>

			{/* Call to Action */}
			<motion.div
				variants={fadeInUp}
				className="text-center p-6 rounded-xl bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 border border-white/10"
			>
				<h3 className="text-lg font-semibold text-white mb-2">
					Ready to explore the workflow?
				</h3>
				<p className="text-muted-foreground mb-4">
					Navigate through the tabs above to learn each phase in detail.
				</p>
				<div className="flex justify-center gap-4 text-sm">
					<div className="flex items-center gap-2 text-purple-400">
						<ArrowRight className="w-4 h-4" />
						<span>Workflow: See the 8 phases</span>
					</div>
					<div className="flex items-center gap-2 text-blue-400">
						<ArrowRight className="w-4 h-4" />
						<span>Commands: All slash commands</span>
					</div>
					<div className="flex items-center gap-2 text-green-400">
						<ArrowRight className="w-4 h-4" />
						<span>Agents: Specialized workers</span>
					</div>
				</div>
			</motion.div>
		</motion.div>
	)
}
