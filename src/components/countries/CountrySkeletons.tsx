export function CountryCardSkeleton() {
	return (
		<div className="rounded-xl overflow-hidden bg-white/5 border border-white/10 animate-pulse">
			<div className="h-32 bg-white/10" />
			<div className="p-4 space-y-3">
				<div className="h-5 bg-white/10 rounded w-3/4" />
				<div className="h-4 bg-white/10 rounded w-1/2" />
				<div className="h-3 bg-white/10 rounded w-1/4" />
			</div>
		</div>
	)
}

export function CountryGridSkeleton() {
	return (
		<div className="space-y-4">
			<div className="h-4 bg-white/10 rounded w-48 animate-pulse" />
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{Array.from({ length: 12 }).map((_, i) => (
					<CountryCardSkeleton key={`skeleton-${i}`} />
				))}
			</div>
		</div>
	)
}

export function ComparisonSkeleton() {
	return (
		<div className="p-6 space-y-8 animate-pulse">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={`comparison-skeleton-${i}`}
						className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
					>
						<div className="h-32 bg-white/10" />
						<div className="p-4 space-y-3">
							<div className="h-6 bg-white/10 rounded w-3/4" />
							<div className="h-4 bg-white/10 rounded w-1/2" />
							<div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10">
								{Array.from({ length: 4 }).map((_, j) => (
									<div key={`stat-skeleton-${i}-${j}`} className="space-y-1">
										<div className="h-3 bg-white/10 rounded w-16" />
										<div className="h-4 bg-white/10 rounded w-12" />
									</div>
								))}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
