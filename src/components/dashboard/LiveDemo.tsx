import { motion } from 'framer-motion'
import {
	CheckCircle2,
	Clock,
	Copy,
	Play,
	Rocket,
	Sparkles,
	Terminal,
} from 'lucide-react'
import { useState } from 'react'

const DEMO_PROMPT = `Create a new "Performance Simulator" component for the Learn section that compares traditional development time vs ADX workflow.

## Requirements

### Location
- Create new file: src/components/learn/PerformanceSimulator.tsx
- Add to Learn section as a new tab called "ROI" between "Agents" and "Quiz"

### UI Design
Two-column layout comparing "Traditional Development" vs "ADX /ship":

Left column (Traditional):
- Show phases: Planning (2h), Coding (4h), Review (1h), Testing (1h), PR (30min)
- Total time bar with animation

Right column (ADX):
- Show phases: /plan (15min), /implement (30min), /review (10min), /verify (5min), /commit+pr (5min)
- Total time bar with animation

### Interactive Controls
Add two sliders at the bottom:
1. Project Complexity (1-5 scale) - multiplies time estimates
2. Team Size (1-5) - affects traditional dev more than ADX

### Metrics Display
Show calculated results:
- Time Saved (hours and percentage)
- Cost Saved (assume $100/hour rate)
- Animated counters when values change

### Styling
- Use existing Tailwind classes and color scheme (purple/blue gradients)
- Use Framer Motion for animations (already installed)
- Match the style of other Learn section components
- Use lucide-react icons

### Technical Notes
- Use useState for slider values
- Calculate metrics based on slider inputs
- Traditional time = baseTime * complexity * (teamSize * 0.8)
- ADX time = baseTime * complexity * 0.3 + 1 (constant overhead)

After creating the component, update:
1. src/components/dashboard/LearnADX.tsx - add "ROI" tab
2. src/App.tsx - add route for /dashboard/learn/roi
3. src/components/learn/index.ts - export the new component`

const EXPECTED_TIME = '30-40 minutes'

const WORKFLOW_STEPS = [
	{ phase: 'Plan', command: '/plan', time: '~5 min' },
	{ phase: 'Implement', command: '/implement', time: '~15 min' },
	{ phase: 'Verify', command: '/verify', time: '~3 min' },
	{ phase: 'Review', command: '/review', time: '~5 min' },
	{ phase: 'Commit & PR', command: '/commit && /pr', time: '~2 min' },
]

export default function LiveDemo() {
	const [copied, setCopied] = useState(false)

	const copyPrompt = async () => {
		await navigator.clipboard.writeText(DEMO_PROMPT)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<div className="space-y-6">
			{/* Header */}
			<motion.div
				className="flex items-center justify-between"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className="flex items-center gap-4">
					<div className="p-2.5 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30">
						<Rocket className="w-6 h-6 text-amber-400" />
					</div>
					<div>
						<h2 className="text-xl font-bold text-white">Live Demo Task</h2>
						<p className="text-sm text-muted-foreground">
							Execute this prompt to build a feature in real-time
						</p>
					</div>
				</div>

				<div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30">
					<Clock className="w-4 h-4 text-amber-400" />
					<span className="text-sm text-amber-400 font-medium">
						~{EXPECTED_TIME}
					</span>
				</div>
			</motion.div>

			{/* Feature Description */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/20"
			>
				<div className="flex items-center gap-2 mb-3">
					<Sparkles className="w-5 h-5 text-purple-400" />
					<h3 className="text-lg font-semibold text-white">
						Feature: Performance Simulator
					</h3>
				</div>
				<p className="text-muted-foreground mb-4">
					An interactive comparison tool showing time and cost savings between
					traditional development and the ADX /ship workflow. Users can adjust
					complexity and team size to see real-time ROI calculations.
				</p>
				<div className="grid grid-cols-3 gap-4 text-center">
					<div className="p-3 rounded-lg bg-white/5 border border-white/10">
						<div className="text-2xl font-bold text-purple-400">1</div>
						<div className="text-xs text-muted-foreground">New Component</div>
					</div>
					<div className="p-3 rounded-lg bg-white/5 border border-white/10">
						<div className="text-2xl font-bold text-blue-400">3</div>
						<div className="text-xs text-muted-foreground">Files Modified</div>
					</div>
					<div className="p-3 rounded-lg bg-white/5 border border-white/10">
						<div className="text-2xl font-bold text-green-400">~150</div>
						<div className="text-xs text-muted-foreground">Lines of Code</div>
					</div>
				</div>
			</motion.div>

			{/* Prompt Box */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="relative"
			>
				<div className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-2">
						<Terminal className="w-4 h-4 text-muted-foreground" />
						<span className="text-sm font-medium text-muted-foreground">
							Prompt for Claude Code
						</span>
					</div>
					<motion.button
						onClick={copyPrompt}
						className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/50 text-purple-400 hover:bg-purple-500/30 transition-colors"
						whileHover={{ scale: 1.02 }}
						whileTap={{ scale: 0.98 }}
						type="button"
					>
						{copied ? (
							<>
								<CheckCircle2 className="w-4 h-4" />
								<span className="text-sm">Copied!</span>
							</>
						) : (
							<>
								<Copy className="w-4 h-4" />
								<span className="text-sm">Copy Prompt</span>
							</>
						)}
					</motion.button>
				</div>
				<div className="p-4 rounded-xl bg-zinc-900 border border-white/10 font-mono text-sm text-muted-foreground max-h-[300px] overflow-y-auto whitespace-pre-wrap">
					{DEMO_PROMPT}
				</div>
			</motion.div>

			{/* Expected Workflow */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="p-6 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-900/50 border border-white/10"
			>
				<div className="flex items-center gap-2 mb-4">
					<Play className="w-5 h-5 text-green-400" />
					<h3 className="text-lg font-semibold text-white">
						Expected Workflow Execution
					</h3>
				</div>
				<div className="space-y-3">
					{WORKFLOW_STEPS.map((step, index) => (
						<div key={step.phase} className="flex items-center gap-4">
							<div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-mono text-muted-foreground">
								{index + 1}
							</div>
							<div className="flex-1">
								<div className="flex items-center gap-2">
									<span className="font-medium text-white">{step.phase}</span>
									<code className="px-2 py-0.5 rounded bg-white/5 text-xs text-purple-400">
										{step.command}
									</code>
								</div>
							</div>
							<span className="text-sm text-muted-foreground">{step.time}</span>
						</div>
					))}
				</div>
				<div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
					<span className="text-sm text-muted-foreground">Total estimated</span>
					<span className="text-lg font-bold text-green-400">
						{EXPECTED_TIME}
					</span>
				</div>
			</motion.div>

			{/* Instructions */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4 }}
				className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 via-transparent to-blue-500/10 border border-white/10"
			>
				<h4 className="text-sm font-semibold text-white mb-2">
					How to run this demo:
				</h4>
				<ol className="space-y-1 text-sm text-muted-foreground">
					<li>1. Copy the prompt above</li>
					<li>
						2. Open terminal in project directory and run{' '}
						<code className="text-purple-400">claude</code>
					</li>
					<li>3. Paste the prompt and watch the ADX workflow execute</li>
					<li>4. Review the PR when complete</li>
				</ol>
			</motion.div>
		</div>
	)
}
