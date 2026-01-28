import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import {
	Bug,
	FileText,
	GitBranch,
	type LucideIcon,
	MessageSquare,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
	MessageSquare,
	FileText,
	GitBranch,
	Bug,
}

const categoryColors = {
	prompting: {
		bg: 'bg-purple-500/10',
		border: 'border-purple-500/30',
		icon: 'bg-purple-500/20 text-purple-400',
	},
	context: {
		bg: 'bg-blue-500/10',
		border: 'border-blue-500/30',
		icon: 'bg-blue-500/20 text-blue-400',
	},
	workflow: {
		bg: 'bg-green-500/10',
		border: 'border-green-500/30',
		icon: 'bg-green-500/20 text-green-400',
	},
	debugging: {
		bg: 'bg-amber-500/10',
		border: 'border-amber-500/30',
		icon: 'bg-amber-500/20 text-amber-400',
	},
}

interface TipCardProps {
	icon: string
	title: string
	description: string
	category: 'prompting' | 'context' | 'workflow' | 'debugging'
	index?: number
}

export function TipCard({
	icon,
	title,
	description,
	category,
	index = 0,
}: TipCardProps) {
	const Icon = iconMap[icon] || MessageSquare
	const colors = categoryColors[category]

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: index * 0.1 }}
			whileHover={{ scale: 1.02, y: -2 }}
			className={cn(
				'p-6 rounded-xl border transition-colors',
				colors.bg,
				colors.border,
				'hover:border-opacity-50',
			)}
		>
			<div className="flex items-start gap-4">
				<div className={cn('p-2.5 rounded-lg', colors.icon)}>
					<Icon className="w-5 h-5" />
				</div>
				<div className="flex-1 min-w-0">
					<h3 className="font-semibold text-lg text-foreground mb-1">
						{title}
					</h3>
					<p className="text-muted-foreground text-sm leading-relaxed">
						{description}
					</p>
				</div>
			</div>
		</motion.div>
	)
}
