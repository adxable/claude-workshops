import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SlideLayout } from './components/layout/SlideLayout'
import { useSlideNavigation } from './hooks/useSlideNavigation'
import { slides } from './slides'

const DashboardLayout = lazy(
	() => import('./components/dashboard/DashboardLayout'),
)
const LearnADX = lazy(() => import('./components/dashboard/LearnADX'))
const PresentationView = lazy(
	() => import('./components/dashboard/PresentationView'),
)
const LiveDemo = lazy(() => import('./components/dashboard/LiveDemo'))

// Learn sub-sections
const AgenticIntro = lazy(() => import('./components/learn/AgenticIntro'))
const WorkflowSimulator = lazy(
	() => import('./components/learn/WorkflowSimulator'),
)
const CommandExplorer = lazy(
	() => import('./components/learn/CommandExplorer'),
)
const AgentPlayground = lazy(
	() => import('./components/learn/AgentPlayground'),
)
const PerformanceSimulator = lazy(
	() => import('./components/learn/PerformanceSimulator'),
)
const QuizMode = lazy(() => import('./components/learn/QuizMode'))

function SlideLoader() {
	return (
		<div className="flex items-center justify-center min-h-[400px]">
			<div className="flex items-center gap-3">
				<div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
				<div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
				<div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
			</div>
		</div>
	)
}

function SlideRoute() {
	const {
		currentSlide,
		totalSlides,
		direction,
		goToNext,
		goToPrev,
		canGoNext,
		canGoPrev,
	} = useSlideNavigation()

	const slide = slides.find((s) => s.id === currentSlide)

	if (!slide) {
		return <Navigate to="/slide/1" replace />
	}

	const SlideComponent = slide.component

	return (
		<SlideLayout
			currentSlide={currentSlide}
			totalSlides={totalSlides}
			direction={direction}
			onNext={goToNext}
			onPrev={goToPrev}
			canGoNext={canGoNext}
			canGoPrev={canGoPrev}
		>
			<Suspense fallback={<SlideLoader />}>
				<SlideComponent />
			</Suspense>
		</SlideLayout>
	)
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Navigate to="/dashboard" replace />} />

				{/* Dashboard with nested routes */}
				<Route
					path="/dashboard"
					element={
						<Suspense fallback={<SlideLoader />}>
							<DashboardLayout />
						</Suspense>
					}
				>
					{/* Default redirect to learn */}
					<Route index element={<Navigate to="learn" replace />} />

					{/* Learn section with nested routes */}
					<Route path="learn" element={<LearnADX />}>
						<Route index element={<Navigate to="intro" replace />} />
						<Route path="intro" element={<AgenticIntro />} />
						<Route path="workflow" element={<WorkflowSimulator />} />
						<Route path="commands" element={<CommandExplorer />} />
						<Route path="agents" element={<AgentPlayground />} />
						<Route path="roi" element={<PerformanceSimulator />} />
						<Route path="quiz" element={<QuizMode />} />
					</Route>

					{/* Presentation */}
					<Route path="presentation" element={<PresentationView />} />

					{/* Live Demo */}
					<Route path="demo" element={<LiveDemo />} />
				</Route>

				<Route path="/slide/:id" element={<SlideRoute />} />

				<Route path="*" element={<Navigate to="/dashboard" replace />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
