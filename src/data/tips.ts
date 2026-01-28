export interface Tip {
	id: string
	category: 'autonomous' | 'workflow' | 'quality' | 'debugging'
	icon: 'Rocket' | 'GitBranch' | 'CheckCircle' | 'Bug'
	title: string
	description: string
}

export const tips: Tip[] = [
	{
		id: 'use-ship',
		category: 'autonomous',
		icon: 'Rocket',
		title: 'Start with /ship',
		description:
			'Let the autonomous pipeline handle the full cycle. Only use individual commands when you need more control.',
	},
	{
		id: 'browser-flag',
		category: 'quality',
		icon: 'CheckCircle',
		title: 'Use --browser Flag',
		description:
			'Visual verification catches issues that type checking misses. Always use it for UI changes.',
	},
	{
		id: 'review-plans',
		category: 'workflow',
		icon: 'GitBranch',
		title: 'Review Plans First',
		description:
			'When using /plan + /implement, always review the generated plan before implementing.',
	},
	{
		id: 'trust-loops',
		category: 'quality',
		icon: 'CheckCircle',
		title: 'Trust the Loops',
		description:
			'Fix-verify loops run up to 5 times automatically. Let them fix issues before intervening.',
	},
	{
		id: 'use-ralph',
		category: 'autonomous',
		icon: 'Rocket',
		title: 'Use /ralph for Complex Tasks',
		description:
			'For features with unknown scope or overnight development, /ralph loops until done.',
	},
	{
		id: 'no-any',
		category: 'quality',
		icon: 'CheckCircle',
		title: 'No any Types',
		description:
			'/refactor automatically eliminates any types. Run it after implementing new features.',
	},
	{
		id: 'parallel-agents',
		category: 'workflow',
		icon: 'GitBranch',
		title: 'Parallel Agents',
		description:
			'/review runs 3 agents in parallel. One command gives you type review, perf audit, and visual testing.',
	},
	{
		id: 'share-errors',
		category: 'debugging',
		icon: 'Bug',
		title: 'Share Error Output',
		description:
			'Copy full error messages and stack traces. More context helps agents diagnose issues faster.',
	},
]

export const categoryInfo = {
	autonomous: {
		label: 'Autonomous',
		color: 'text-purple-400',
		bgColor: 'bg-purple-500/20',
	},
	workflow: {
		label: 'Workflow',
		color: 'text-blue-400',
		bgColor: 'bg-blue-500/20',
	},
	quality: {
		label: 'Quality',
		color: 'text-green-400',
		bgColor: 'bg-green-500/20',
	},
	debugging: {
		label: 'Debugging',
		color: 'text-amber-400',
		bgColor: 'bg-amber-500/20',
	},
}
