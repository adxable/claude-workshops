import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { totalSlides } from '../slides'

const TOTAL_SLIDES = totalSlides

export function useSlideNavigation() {
	const navigate = useNavigate()
	const { id } = useParams<{ id: string }>()
	const currentSlide = Number.parseInt(id || '1', 10)
	const [direction, setDirection] = useState(0)

	const goToSlide = useCallback(
		(slideId: number) => {
			if (slideId >= 1 && slideId <= TOTAL_SLIDES) {
				setDirection(slideId > currentSlide ? 1 : -1)
				navigate(`/slide/${slideId}`)
			}
		},
		[navigate, currentSlide],
	)

	const goToNext = useCallback(() => {
		if (currentSlide < TOTAL_SLIDES) {
			goToSlide(currentSlide + 1)
		}
	}, [currentSlide, goToSlide])

	const goToPrev = useCallback(() => {
		if (currentSlide > 1) {
			goToSlide(currentSlide - 1)
		}
	}, [currentSlide, goToSlide])

	// Keyboard navigation
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			// Ignore if user is typing in an input
			if (
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			) {
				return
			}

			switch (e.key) {
				case 'ArrowRight':
				case 'ArrowDown':
				case ' ':
					e.preventDefault()
					goToNext()
					break
				case 'ArrowLeft':
				case 'ArrowUp':
					e.preventDefault()
					goToPrev()
					break
				case 'Home':
					e.preventDefault()
					goToSlide(1)
					break
				case 'End':
					e.preventDefault()
					goToSlide(TOTAL_SLIDES)
					break
			}
		}

		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [goToNext, goToPrev, goToSlide])

	return {
		currentSlide,
		totalSlides: TOTAL_SLIDES,
		direction,
		goToSlide,
		goToNext,
		goToPrev,
		canGoNext: currentSlide < TOTAL_SLIDES,
		canGoPrev: currentSlide > 1,
	}
}
