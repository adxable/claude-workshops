import { CodeBlock } from '@/components/common/CodeBlock'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

const categoryColors = {
	dev: {
		bg: 'bg-blue-500/10',
		border: 'border-blue-500/30',
		badge: 'bg-blue-500/20 text-blue-400',
		hover: 'hover:border-blue-500/50',
	},
	verify: {
		bg: 'bg-green-500/10',
		border: 'border-green-500/30',
		badge: 'bg-green-500/20 text-green-400',
		hover: 'hover:border-green-500/50',
	},
	review: {
		bg: 'bg-amber-500/10',
		border: 'border-amber-500/30',
		badge: 'bg-amber-500/20 text-amber-400',
		hover: 'hover:border-amber-500/50',
	},
	utils: {
		bg: 'bg-purple-500/10',
		border: 'border-purple-500/30',
		badge: 'bg-purple-500/20 text-purple-400',
		hover: 'hover:border-purple-500/50',
	},
}

interface CommandCardProps {
	name: string
	category: 'dev' | 'verify' | 'review' | 'utils'
	description: string
	example: string
	tips?: string[]
	index?: number
	compact?: boolean
}

export function CommandCard({
	name,
	category,
	description,
	example,
	tips,
	index = 0,
	compact = false,
}: CommandCardProps) {
	const colors = categoryColors[category]

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: index * 0.1 }}
			whileHover={{ scale: 1.01 }}
			className={cn(
				'rounded-xl border transition-all',
				colors.bg,
				colors.border,
				colors.hover,
				compact ? 'p-4' : 'p-6',
			)}
		>
			{/* Header */}
			<div className="flex items-center gap-3 mb-3">
				<span
					className={cn(
						'px-2 py-1 rounded text-xs font-medium uppercase tracking-wide',
						colors.badge,
					)}
				>
					{category}
				</span>
				<div className="flex items-center gap-2">
					<Terminal className="w-4 h-4 text-muted-foreground" />
					<code
						className={cn(
							'font-mono font-semibold',
							compact ? 'text-base' : 'text-lg',
						)}
					>
						{name}
					</code>
				</div>
			</div>

			{/* Description */}
			<p
				className={cn(
					'text-muted-foreground mb-4',
					compact ? 'text-sm' : 'text-base',
				)}
			>
				{description}
			</p>

			{/* Example */}
			<CodeBlock code={example} language="bash" />

			{/* Tips */}
			{tips && tips.length > 0 && !compact && (
				<div className="mt-4 pt-4 border-t border-zinc-700/50">
					<h4 className="text-sm font-medium text-muted-foreground mb-2">
						Tips
					</h4>
					<ul className="space-y-1">
						{tips.map((tip) => (
							<li
								key={tip}
								className="text-sm text-zinc-400 flex items-start gap-2"
							>
								<span className="text-primary mt-1">•</span>
								{tip}
							</li>
						))}
					</ul>
				</div>
			)}
		</motion.div>
	)
}
