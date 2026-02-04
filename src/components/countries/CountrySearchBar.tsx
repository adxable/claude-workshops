import { Loader2, Search, X } from 'lucide-react'

interface CountrySearchBarProps {
	value: string
	onChange: (value: string) => void
	isLoading?: boolean
}

export function CountrySearchBar({
	value,
	onChange,
	isLoading,
}: CountrySearchBarProps) {
	return (
		<div className="relative flex-1">
			<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Search countries..."
				className="w-full pl-12 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
			/>
			{isLoading ? (
				<Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground animate-spin" />
			) : value ? (
				<button
					type="button"
					onClick={() => onChange('')}
					className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground hover:text-white transition-colors"
				>
					<X className="w-5 h-5" />
				</button>
			) : null}
		</div>
	)
}
