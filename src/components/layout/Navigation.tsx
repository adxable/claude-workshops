import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NavigationProps {
	currentSlide: number
	totalSlides: number
	onPrev: () => void
	onNext: () => void
	canGoPrev: boolean
	canGoNext: boolean
}

export function Navigation({
	currentSlide,
	totalSlides,
	onPrev,
	onNext,
	canGoPrev,
	canGoNext,
}: NavigationProps) {
	const progress = (currentSlide / totalSlides) * 100

	return (
		<nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-t border-border">
			{/* Progress bar */}
			<div className="h-1 bg-muted">
				<motion.div
					className="h-full bg-gradient-purple-blue"
					initial={{ width: 0 }}
					animate={{ width: `${progress}%` }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
				/>
			</div>

			<div className="flex items-center justify-between px-6 py-4">
				{/* Previous button */}
				<button
					type="button"
					onClick={onPrev}
					disabled={!canGoPrev}
					className={cn(
						'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
						'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
						canGoPrev
							? 'hover:bg-muted text-foreground'
							: 'text-muted-foreground cursor-not-allowed',
					)}
					aria-label="Previous slide"
				>
					<ChevronLeft className="w-5 h-5" />
					<span className="hidden sm:inline">Previous</span>
				</button>

				{/* Slide counter */}
				<div className="flex items-center gap-3">
					<span className="text-sm text-muted-foreground">
						<span className="font-mono text-foreground">{currentSlide}</span>
						{' / '}
						<span className="font-mono">{totalSlides}</span>
					</span>

					{/* Dot indicators */}
					<div className="hidden md:flex items-center gap-1.5">
						{Array.from({ length: totalSlides }, (_, i) => (
							<div
								key={`slide-dot-${i + 1}`}
								className={cn(
									'w-2 h-2 rounded-full transition-all duration-300',
									i + 1 === currentSlide
										? 'bg-primary w-4'
										: i + 1 < currentSlide
											? 'bg-primary/50'
											: 'bg-muted-foreground/30',
								)}
							/>
						))}
					</div>
				</div>

				{/* Next button */}
				<button
					type="button"
					onClick={onNext}
					disabled={!canGoNext}
					className={cn(
						'flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
						'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
						canGoNext
							? 'hover:bg-muted text-foreground'
							: 'text-muted-foreground cursor-not-allowed',
					)}
					aria-label="Next slide"
				>
					<span className="hidden sm:inline">Next</span>
					<ChevronRight className="w-5 h-5" />
				</button>
			</div>
		</nav>
	)
}
