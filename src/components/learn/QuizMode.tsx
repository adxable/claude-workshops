import { AnimatePresence, motion } from 'framer-motion'
import {
	CheckCircle,
	ChevronRight,
	HelpCircle,
	RotateCcw,
	Sparkles,
	Trophy,
	XCircle,
} from 'lucide-react'
import { useState } from 'react'
import { quizQuestions } from '../../data/learning-content'
import { cn } from '../../lib/utils'

export default function QuizMode() {
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
	const [showExplanation, setShowExplanation] = useState(false)
	const [score, setScore] = useState(0)
	const [isComplete, setIsComplete] = useState(false)

	const question = quizQuestions[currentQuestion]

	const handleAnswer = (index: number) => {
		if (selectedAnswer !== null) return
		setSelectedAnswer(index)
		setShowExplanation(true)
		if (index === question.correctIndex) {
			setScore((prev) => prev + 1)
		}
	}

	const nextQuestion = () => {
		if (currentQuestion < quizQuestions.length - 1) {
			setCurrentQuestion((prev) => prev + 1)
			setSelectedAnswer(null)
			setShowExplanation(false)
		} else {
			setIsComplete(true)
		}
	}

	const resetQuiz = () => {
		setCurrentQuestion(0)
		setSelectedAnswer(null)
		setShowExplanation(false)
		setScore(0)
		setIsComplete(false)
	}

	if (isComplete) {
		const percentage = Math.round((score / quizQuestions.length) * 100)
		return (
			<motion.div
				initial={{ opacity: 0, scale: 0.95 }}
				animate={{ opacity: 1, scale: 1 }}
				className="p-8 rounded-xl bg-card border border-border text-center"
			>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ delay: 0.2, type: 'spring' }}
				>
					<Trophy
						className={cn(
							'w-16 h-16 mx-auto mb-4',
							percentage >= 80
								? 'text-amber-400'
								: percentage >= 60
									? 'text-blue-400'
									: 'text-muted-foreground',
						)}
					/>
				</motion.div>

				<h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
				<p className="text-4xl font-bold text-gradient mb-2">
					{score}/{quizQuestions.length}
				</p>
				<p className="text-muted-foreground mb-6">
					{percentage >= 80
						? "Excellent! You're an ADX expert!"
						: percentage >= 60
							? 'Good job! Keep learning.'
							: 'Keep practicing to improve!'}
				</p>

				<motion.button
					onClick={resetQuiz}
					className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-400 mx-auto"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					<RotateCcw className="w-5 h-5" />
					Try Again
				</motion.button>
			</motion.div>
		)
	}

	return (
		<div className="space-y-6">
			{/* Progress */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<HelpCircle className="w-5 h-5 text-purple-400" />
					<span className="font-medium">
						Question {currentQuestion + 1} of {quizQuestions.length}
					</span>
				</div>
				<div className="flex items-center gap-2">
					<Sparkles className="w-4 h-4 text-amber-400" />
					<span className="text-sm text-muted-foreground">Score: {score}</span>
				</div>
			</div>

			{/* Progress bar */}
			<div className="h-2 bg-card rounded-full overflow-hidden">
				<motion.div
					className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
					initial={{ width: 0 }}
					animate={{
						width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%`,
					}}
				/>
			</div>

			{/* Question */}
			<AnimatePresence mode="wait">
				<motion.div
					key={question.id}
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: -20 }}
					className="p-6 rounded-xl bg-card border border-border"
				>
					<div className="flex items-center gap-2 mb-4">
						<span
							className={cn(
								'px-2 py-0.5 rounded text-xs',
								question.category === 'workflow'
									? 'bg-purple-500/20 text-purple-400'
									: question.category === 'commands'
										? 'bg-blue-500/20 text-blue-400'
										: 'bg-green-500/20 text-green-400',
							)}
						>
							{question.category}
						</span>
					</div>

					<h3 className="text-lg font-medium mb-6">{question.question}</h3>

					<div className="space-y-3">
						{question.options.map((option, index) => {
							const isSelected = selectedAnswer === index
							const isCorrect = index === question.correctIndex
							const showResult = selectedAnswer !== null

							return (
								<motion.button
									key={index}
									onClick={() => handleAnswer(index)}
									disabled={selectedAnswer !== null}
									className={cn(
										'w-full p-4 rounded-xl border text-left transition-all',
										showResult
											? isCorrect
												? 'bg-green-500/20 border-green-500/50'
												: isSelected
													? 'bg-red-500/20 border-red-500/50'
													: 'bg-card border-border opacity-50'
											: 'bg-card border-border hover:border-purple-500/50',
									)}
									whileHover={!showResult ? { scale: 1.01 } : {}}
									whileTap={!showResult ? { scale: 0.99 } : {}}
								>
									<div className="flex items-center justify-between">
										<span>{option}</span>
										{showResult &&
											(isCorrect ? (
												<CheckCircle className="w-5 h-5 text-green-400" />
											) : isSelected ? (
												<XCircle className="w-5 h-5 text-red-400" />
											) : null)}
									</div>
								</motion.button>
							)
						})}
					</div>

					{/* Explanation */}
					<AnimatePresence>
						{showExplanation && (
							<motion.div
								initial={{ opacity: 0, height: 0 }}
								animate={{ opacity: 1, height: 'auto' }}
								exit={{ opacity: 0, height: 0 }}
								className="overflow-hidden"
							>
								<div
									className={cn(
										'mt-4 p-4 rounded-xl border',
										selectedAnswer === question.correctIndex
											? 'bg-green-500/10 border-green-500/30'
											: 'bg-amber-500/10 border-amber-500/30',
									)}
								>
									<div className="flex items-center gap-2 mb-2">
										{selectedAnswer === question.correctIndex ? (
											<CheckCircle className="w-5 h-5 text-green-400" />
										) : (
											<Sparkles className="w-5 h-5 text-amber-400" />
										)}
										<span className="font-medium">
											{selectedAnswer === question.correctIndex
												? 'Correct!'
												: 'Explanation'}
										</span>
									</div>
									<p className="text-sm text-muted-foreground">
										{question.explanation}
									</p>
								</div>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</AnimatePresence>

			{/* Next button */}
			{showExplanation && (
				<motion.button
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					onClick={nextQuestion}
					className="flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-500/50 text-purple-400 ml-auto"
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
				>
					{currentQuestion < quizQuestions.length - 1 ? (
						<>
							Next Question
							<ChevronRight className="w-5 h-5" />
						</>
					) : (
						<>
							See Results
							<Trophy className="w-5 h-5" />
						</>
					)}
				</motion.button>
			)}
		</div>
	)
}
