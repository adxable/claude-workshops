import { motion } from 'framer-motion'
import { BookOpen, Github, MessageCircle, Terminal } from 'lucide-react'

const commands = [
	{ cmd: '/ship', desc: 'Full autonomous pipeline' },
	{ cmd: '/ralph', desc: 'Loop until done' },
	{ cmd: '/plan', desc: 'Research and plan' },
	{ cmd: '/implement', desc: 'Execute plan' },
	{ cmd: '/refactor', desc: 'Clean code' },
	{ cmd: '/verify', desc: 'Check quality' },
	{ cmd: '/review', desc: 'Code review + browser' },
	{ cmd: '/commit', desc: 'Smart commits' },
	{ cmd: '/pr', desc: 'Create PR' },
]

export default function QASlide() {
	return (
		<div className="space-y-8 max-w-4xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 mb-4">
					<MessageCircle className="w-4 h-4" />
					<span className="text-sm font-medium">Q&A</span>
				</div>
				<h2 className="text-4xl md:text-6xl font-bold mb-4">
					<span className="text-gradient">Questions?</span>
				</h2>
				<p className="text-xl text-muted-foreground">
					Let's discuss! Feel free to ask anything about ADX Toolkit
				</p>
			</motion.div>

			{/* Thank you card */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-center"
			>
				<h3 className="text-2xl font-bold mb-2">Thank You!</h3>
				<p className="text-muted-foreground">
					Start using ADX Toolkit today and accelerate your development
					workflow!
				</p>
			</motion.div>

			{/* Quick reference */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="p-4 rounded-xl bg-card border border-border"
			>
				<div className="flex items-center gap-2 mb-3">
					<Terminal className="w-4 h-4 text-purple-400" />
					<h4 className="font-semibold">Quick Reference</h4>
				</div>
				<div className="grid grid-cols-3 gap-2">
					{commands.map((item) => (
						<div key={item.cmd} className="flex items-center gap-2 text-sm">
							<code className="text-purple-400 font-mono">{item.cmd}</code>
							<span className="text-muted-foreground text-xs">{item.desc}</span>
						</div>
					))}
				</div>
			</motion.div>

			{/* Resources */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
			>
				<h4 className="text-center font-semibold mb-4">Resources</h4>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<a
						href="https://github.com/adxable/adx-toolkit"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-purple-500/50 transition-colors"
					>
						<div className="p-3 rounded-lg bg-purple-500/20">
							<Github className="w-5 h-5 text-purple-400" />
						</div>
						<div>
							<div className="font-semibold">GitHub</div>
							<div className="text-sm text-muted-foreground">
								Source code and examples
							</div>
						</div>
					</a>
					<a
						href="https://docs.anthropic.com/en/docs/claude-code"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-blue-500/50 transition-colors"
					>
						<div className="p-3 rounded-lg bg-blue-500/20">
							<BookOpen className="w-5 h-5 text-blue-400" />
						</div>
						<div>
							<div className="font-semibold">Claude Code Docs</div>
							<div className="text-sm text-muted-foreground">
								Official documentation
							</div>
						</div>
					</a>
				</div>
			</motion.div>

			{/* Key takeaways */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.5 }}
			>
				<h4 className="text-center font-semibold mb-4">Key Takeaways</h4>
				<div className="flex flex-wrap justify-center gap-3">
					{[
						'One command ships features',
						'9 agents work in parallel',
						'Auto-fix verification loops',
						'Browser testing included',
					].map((takeaway) => (
						<span
							key={takeaway}
							className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 text-sm"
						>
							{takeaway}
						</span>
					))}
				</div>
			</motion.div>
		</div>
	)
}
