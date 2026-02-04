import { Globe } from 'lucide-react'

const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

interface RegionFilterProps {
	value: string
	onChange: (value: string) => void
}

export function RegionFilter({ value, onChange }: RegionFilterProps) {
	return (
		<div className="relative">
			<Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="appearance-none pl-12 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all cursor-pointer min-w-[160px]"
			>
				<option value="" className="bg-slate-900">
					All Regions
				</option>
				{REGIONS.map((region) => (
					<option key={region} value={region} className="bg-slate-900">
						{region}
					</option>
				))}
			</select>
			<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
				<svg
					className="w-4 h-4 text-muted-foreground"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>
		</div>
	)
}
