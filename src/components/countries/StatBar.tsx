import { motion } from 'framer-motion'

interface StatBarProps {
	label: string
	value: number
	maxValue: number
	formattedValue: string
	color?: string
}

export function StatBar({
	label,
	value,
	maxValue,
	formattedValue,
	color = 'bg-emerald-500',
}: StatBarProps) {
	const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0

	return (
		<div className="space-y-2">
			<div className="flex justify-between items-baseline">
				<span className="text-sm text-muted-foreground">{label}</span>
				<span className="text-sm font-medium text-white">{formattedValue}</span>
			</div>
			<div className="h-3 bg-white/10 rounded-full overflow-hidden">
				<motion.div
					initial={{ width: 0 }}
					animate={{ width: `${percentage}%` }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					className={`h-full ${color} rounded-full`}
				/>
			</div>
		</div>
	)
}

interface ComparisonStatBarProps {
	label: string
	values: { code: string; value: number; name: string }[]
	formatter: (value: number) => string
	colors?: string[]
}

export function ComparisonStatBar({
	label,
	values,
	formatter,
	colors = ['bg-emerald-500', 'bg-blue-500', 'bg-purple-500'],
}: ComparisonStatBarProps) {
	const maxValue = Math.max(...values.map((v) => v.value), 1)

	return (
		<div className="space-y-3">
			<h4 className="text-sm font-medium text-white">{label}</h4>
			{values.map((item, index) => {
				const percentage = (item.value / maxValue) * 100
				return (
					<div key={item.code} className="space-y-1">
						<div className="flex justify-between items-baseline text-xs">
							<span className="text-muted-foreground">{item.name}</span>
							<span className="text-white">{formatter(item.value)}</span>
						</div>
						<div className="h-2 bg-white/10 rounded-full overflow-hidden">
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: `${percentage}%` }}
								transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
								className={`h-full ${colors[index % colors.length]} rounded-full`}
							/>
						</div>
					</div>
				)
			})}
		</div>
	)
}
