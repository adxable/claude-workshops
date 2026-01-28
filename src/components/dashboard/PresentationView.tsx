import { AnimatePresence, motion } from 'framer-motion'
import {
	ChevronLeft,
	ChevronRight,
	Home,
	Maximize2,
	Minimize2,
} from 'lucide-react'
import { Suspense, useEffect, useState } from 'react'
import { cn } from '../../lib/utils'
import { slides as slideConfig } from '../../slides'

export default function PresentationView() {
	const [currentSlide, setCurrentSlide] = useState(0)
	const [direction, setDirection] = useState(0)
	const [isFullscreen, setIsFullscreen] = useState(false)

	const totalSlides = slideConfig.length

	const goToSlide = (index: number) => {
		if (index < 0 || index >= totalSlides) return
		setDirection(index > currentSlide ? 1 : -1)
		setCurrentSlide(index)
	}

	const nextSlide = () => goToSlide(currentSlide + 1)
	const prevSlide = () => goToSlide(currentSlide - 1)

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'ArrowRight' || e.key === ' ') {
				e.preventDefault()
				nextSlide()
			} else if (e.key === 'ArrowLeft') {
				e.preventDefault()
				prevSlide()
			} else if (e.key === 'Home') {
				e.preventDefault()
				goToSlide(0)
			} else if (e.key === 'End') {
				e.preventDefault()
				goToSlide(totalSlides - 1)
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [currentSlide])

	const CurrentSlideComponent = slideConfig[currentSlide].component

	const slideVariants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 300 : -300,
			opacity: 0,
			scale: 0.95,
		}),
		center: {
			x: 0,
			opacity: 1,
			scale: 1,
		},
		exit: (direction: number) => ({
			x: direction < 0 ? 300 : -300,
			opacity: 0,
			scale: 0.95,
		}),
	}

	return (
		<div
			className={cn(
				'space-y-4 overflow-x-hidden',
				isFullscreen && 'fixed inset-0 z-50 bg-background p-6',
			)}
		>
			{/* Slide Container */}
			<motion.div
				className={cn(
					'relative rounded-xl overflow-hidden',
					'bg-zinc-900/50 border border-white/10',
					isFullscreen ? 'h-[calc(100vh-140px)]' : 'h-[500px]',
				)}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				{/* Fullscreen toggle */}
				<motion.button
					onClick={() => setIsFullscreen(!isFullscreen)}
					className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					{isFullscreen ? (
						<Minimize2 className="w-4 h-4 text-white" />
					) : (
						<Maximize2 className="w-4 h-4 text-white" />
					)}
				</motion.button>

				{/* Slide content */}
				<div className="relative h-full overflow-y-auto overflow-x-hidden">
					<AnimatePresence initial={false} custom={direction} mode="wait">
						<motion.div
							key={currentSlide}
							custom={direction}
							variants={slideVariants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								x: { type: 'spring', stiffness: 300, damping: 30 },
								opacity: { duration: 0.2 },
								scale: { duration: 0.2 },
							}}
							className="absolute inset-0 p-6 "
						>
							<Suspense
								fallback={
									<div className="flex items-center justify-center h-full">
										<motion.div
											className="flex gap-1"
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
										>
											{[0, 1, 2].map((i) => (
												<motion.div
													key={i}
													className="w-2 h-2 bg-purple-400 rounded-full"
													animate={{ y: [0, -10, 0] }}
													transition={{
														duration: 0.5,
														delay: i * 0.1,
														repeat: Number.POSITIVE_INFINITY,
													}}
												/>
											))}
										</motion.div>
									</div>
								}
							>
								<div className="transform scale-[0.85] origin-top-left w-[118%]">
									<CurrentSlideComponent />
								</div>
							</Suspense>
						</motion.div>
					</AnimatePresence>
				</div>

				{/* Navigation arrows */}
				<motion.button
					onClick={prevSlide}
					disabled={currentSlide === 0}
					className={cn(
						'absolute left-2 top-1/2 -translate-y-1/2 z-10',
						'p-2 rounded-full bg-white/10 backdrop-blur-sm',
						'hover:bg-white/20 transition-colors',
						'disabled:opacity-30 disabled:cursor-not-allowed',
					)}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<ChevronLeft className="w-5 h-5 text-white" />
				</motion.button>
				<motion.button
					onClick={nextSlide}
					disabled={currentSlide === totalSlides - 1}
					className={cn(
						'absolute right-2 top-1/2 -translate-y-1/2 z-10',
						'p-2 rounded-full bg-white/10 backdrop-blur-sm',
						'hover:bg-white/20 transition-colors',
						'disabled:opacity-30 disabled:cursor-not-allowed',
					)}
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
				>
					<ChevronRight className="w-5 h-5 text-white" />
				</motion.button>
			</motion.div>

			{/* Slide Navigation Bar */}
			<motion.div
				className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/50 border border-white/10"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
			>
				{/* Home button */}
				<motion.button
					onClick={() => goToSlide(0)}
					className="p-2 rounded-lg hover:bg-white/10 transition-colors"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Home className="w-4 h-4 text-muted-foreground" />
				</motion.button>

				{/* Slide dots */}
				<div className="flex items-center gap-1">
					{slideConfig.map((slide, index) => (
						<motion.button
							key={slide.id}
							onClick={() => goToSlide(index)}
							className={cn(
								'relative group flex items-center justify-center',
								'w-7 h-7 rounded-lg transition-all shrink-0',
								currentSlide === index
									? 'bg-purple-500/20 border border-purple-500/50'
									: 'hover:bg-white/10',
							)}
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.95 }}
						>
							<span
								className={cn(
									'text-xs font-mono',
									currentSlide === index
										? 'text-purple-400'
										: 'text-muted-foreground',
								)}
							>
								{index + 1}
							</span>

							{/* Tooltip */}
							<div className="absolute bottom-full mb-2 px-2 py-1 rounded bg-zinc-800 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
								{slide.title}
							</div>
						</motion.button>
					))}
				</div>

				{/* Progress */}
				<div className="flex items-center gap-2 text-sm">
					<span className="text-muted-foreground">
						<span className="text-white font-mono">{currentSlide + 1}</span>
						<span className="mx-1">/</span>
						<span className="font-mono">{totalSlides}</span>
					</span>
				</div>
			</motion.div>

			{/* Progress bar */}
			<div className="h-1 bg-white/10 rounded-full overflow-hidden">
				<motion.div
					className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
					initial={{ width: 0 }}
					animate={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
					transition={{ duration: 0.3 }}
				/>
			</div>
		</div>
	)
}
