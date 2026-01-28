import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Navigation } from './Navigation'

interface SlideLayoutProps {
	children: ReactNode
	currentSlide: number
	totalSlides: number
	direction: number
	onPrev: () => void
	onNext: () => void
	canGoPrev: boolean
	canGoNext: boolean
}

const slideVariants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 50 : -50,
		opacity: 0,
	}),
	center: {
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => ({
		x: direction < 0 ? 50 : -50,
		opacity: 0,
	}),
}

export function SlideLayout({
	children,
	currentSlide,
	totalSlides,
	direction,
	onPrev,
	onNext,
	canGoPrev,
	canGoNext,
}: SlideLayoutProps) {
	return (
		<div className="min-h-screen flex flex-col bg-background">
			{/* Main content area */}
			<main className="flex-1 flex items-center justify-center p-6 md:p-12 pb-24">
				<div className="w-full max-w-6xl">
					<AnimatePresence mode="wait" custom={direction}>
						<motion.div
							key={currentSlide}
							custom={direction}
							variants={slideVariants}
							initial="enter"
							animate="center"
							exit="exit"
							transition={{
								duration: 0.3,
								ease: [0.4, 0, 0.2, 1],
							}}
						>
							{children}
						</motion.div>
					</AnimatePresence>
				</div>
			</main>

			{/* Navigation */}
			<Navigation
				currentSlide={currentSlide}
				totalSlides={totalSlides}
				onPrev={onPrev}
				onNext={onNext}
				canGoPrev={canGoPrev}
				canGoNext={canGoNext}
			/>
		</div>
	)
}
