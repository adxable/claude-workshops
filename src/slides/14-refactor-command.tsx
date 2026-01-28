import { motion } from 'framer-motion'
import {
	AlertTriangle,
	CheckCircle,
	Code2,
	Scissors,
	Trash2,
	Wrench,
} from 'lucide-react'

const beforeCode = `// Before: Technical debt
const data: any = fetchData()
const items: any[] = data.items

function processItems(items: any) {
  // 200+ lines of code...
  // Mixed responsibilities
  // Unused variables
  let unused = "delete me"
}`

const afterCode = `// After: Clean code
interface Item { id: string; name: string }

const data = await fetchData<DataResponse>()
const items: Item[] = data.items

function processItems(items: Item[]): ProcessedItem[] {
  // Split into focused functions
  return items.map(transformItem)
}`

export default function RefactorCommandSlide() {
	return (
		<div className="space-y-6 max-w-5xl mx-auto">
			{/* Header */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="text-center"
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-400 mb-4">
					<Wrench className="w-4 h-4" />
					<span className="text-sm font-medium">Phase 3</span>
				</div>
				<h2 className="text-4xl md:text-5xl font-bold mb-2">
					<span className="text-gradient">/refactor</span>
				</h2>
				<p className="text-muted-foreground text-lg">
					Clean up technical debt automatically
				</p>
			</motion.div>

			{/* Command */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
				className="flex justify-center"
			>
				<code className="px-6 py-3 rounded-xl bg-card border border-border font-mono text-lg">
					<span className="text-cyan-400">/refactor</span>{' '}
					<span className="text-muted-foreground">src/features/cart/</span>
				</code>
			</motion.div>

			{/* What it fixes */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="grid grid-cols-3 gap-4"
			>
				{[
					{
						icon: AlertTriangle,
						label: 'Remove any types',
						color: 'text-red-400',
						bg: 'bg-red-500/10',
						border: 'border-red-500/30',
					},
					{
						icon: Scissors,
						label: 'Split large files',
						color: 'text-amber-400',
						bg: 'bg-amber-500/10',
						border: 'border-amber-500/30',
					},
					{
						icon: Trash2,
						label: 'Delete dead code',
						color: 'text-orange-400',
						bg: 'bg-orange-500/10',
						border: 'border-orange-500/30',
					},
				].map((item, i) => (
					<motion.div
						key={item.label}
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4 + i * 0.1 }}
						className={`p-4 rounded-xl ${item.bg} border ${item.border} text-center`}
					>
						<item.icon className={`w-6 h-6 ${item.color} mx-auto mb-2`} />
						<span className="text-sm font-medium">{item.label}</span>
					</motion.div>
				))}
			</motion.div>

			{/* Before/After */}
			<div className="grid md:grid-cols-2 gap-4">
				<motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.5 }}
				>
					<div className="flex items-center gap-2 mb-2">
						<AlertTriangle className="w-4 h-4 text-red-400" />
						<span className="text-sm font-medium">Before</span>
					</div>
					<div className="p-4 rounded-xl bg-red-500/5 border border-red-500/30 overflow-auto">
						<pre className="text-xs font-mono text-muted-foreground">
							{beforeCode}
						</pre>
					</div>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ delay: 0.6 }}
				>
					<div className="flex items-center gap-2 mb-2">
						<CheckCircle className="w-4 h-4 text-green-400" />
						<span className="text-sm font-medium">After</span>
					</div>
					<div className="p-4 rounded-xl bg-green-500/5 border border-green-500/30 overflow-auto">
						<pre className="text-xs font-mono text-muted-foreground">
							{afterCode}
						</pre>
					</div>
				</motion.div>
			</div>

			{/* Agent info */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.7 }}
				className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30"
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Code2 className="w-5 h-5 text-cyan-400" />
						<span className="font-medium">Refactorer Agent</span>
						<span className="px-2 py-1 rounded bg-cyan-500/20 text-cyan-400 text-xs font-mono">
							Opus
						</span>
					</div>
					<span className="text-sm text-muted-foreground">
						Deep understanding of code quality patterns
					</span>
				</div>
			</motion.div>
		</div>
	)
}
