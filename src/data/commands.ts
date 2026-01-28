export interface Command {
	name: string
	category: 'setup' | 'core' | 'dev' | 'quality' | 'git'
	description: string
	usage: string
	example: string
	tips: string[]
	flags?: string[]
	details?: string
}

export const setupCommands: Command[] = [
	{
		name: '/setup',
		category: 'setup',
		description:
			'Configure development standards for your project. Detects stack and creates config files.',
		usage: '/setup [quick]',
		example: '/setup quick',
		tips: [
			'Run once at project start',
			'Auto-detects React, Vue, Angular',
			'Creates .claude/config/ files',
			'Enables stack-specific rules',
		],
		details:
			'Analyzes package.json to detect your stack (state management, styling, forms, etc.) and creates configuration files that enable smart, context-aware assistance.',
	},
]

export const coreCommands: Command[] = [
	{
		name: '/ship',
		category: 'core',
		description:
			'Full autonomous pipeline: plan → implement → refactor → verify → review → commit → pr',
		usage: '/ship <feature description> [--browser]',
		example: '/ship "add user authentication with JWT" --browser',
		tips: [
			'Use --browser for visual verification',
			'Runs 7 phases automatically',
			'Creates PR when complete',
		],
		flags: ['--browser'],
	},
	{
		name: '/ralph',
		category: 'core',
		description:
			'Fully autonomous loop - fire and forget development with automatic error recovery',
		usage: '/ralph <description> [--browser] [--timeout <mins>] [--monitor]',
		example: '/ralph "add dashboard with charts" --browser --monitor',
		tips: [
			'Best for overnight development',
			'Loops until PR created',
			'Has circuit breaker safeguards',
		],
		flags: ['--browser', '--timeout', '--monitor'],
	},
]

export const devCommands: Command[] = [
	{
		name: '/plan',
		category: 'dev',
		description: 'Research codebase and create implementation plan',
		usage: '/plan <feature or bug description>',
		example: '/plan add shopping cart functionality',
		tips: [
			'Creates plan in .claude/plans/',
			'Review before implementing',
			'Explorer agent researches codebase',
		],
	},
	{
		name: '/implement',
		category: 'dev',
		description: 'Execute a plan file step by step',
		usage: '/implement <path to plan file>',
		example: '/implement .claude/plans/plan-shopping-cart.md',
		tips: [
			'Follows plan sequentially',
			'Uses web-researcher if stuck',
			'Runs type check after changes',
		],
	},
	{
		name: '/refactor',
		category: 'dev',
		description:
			'Code cleanup - eliminate any types, remove dead code, split large components',
		usage: '/refactor [file paths]',
		example: '/refactor src/features/users/',
		tips: [
			'Removes any types',
			'Splits oversized components',
			'Verifies types after changes',
		],
	},
]

export const qualityCommands: Command[] = [
	{
		name: '/verify',
		category: 'quality',
		description:
			'Run full verification loop: TypeScript + ESLint + Build (max 5 iterations)',
		usage: '/verify [url path for browser test]',
		example: '/verify /dashboard',
		tips: [
			'Loops until all checks pass',
			'Auto-fixes issues',
			'Optional browser testing',
		],
	},
	{
		name: '/review',
		category: 'quality',
		description:
			'Code review with 3 parallel agents + optional browser verification',
		usage: '/review [--browser | --browser-only]',
		example: '/review --browser',
		tips: [
			'3 agents review in parallel',
			'--browser adds visual testing',
			'Creates report in .claude/reviews/',
		],
		flags: ['--browser', '--browser-only'],
	},
]

export const gitCommands: Command[] = [
	{
		name: '/commit',
		category: 'git',
		description:
			'Analyze changes and create conventional commit with Co-Authored-By',
		usage: '/commit [type]',
		example: '/commit feat',
		tips: [
			'Auto-generates commit message',
			'Uses conventional commits format',
			'Adds Co-Authored-By: Claude',
		],
	},
	{
		name: '/pr',
		category: 'git',
		description: 'Create pull request with auto-generated description',
		usage: '/pr [base branch]',
		example: '/pr main',
		tips: [
			'Analyzes all branch commits',
			'Pushes to remote automatically',
			'Returns PR link',
		],
	},
]

export const allCommands = [
	...setupCommands,
	...coreCommands,
	...devCommands,
	...qualityCommands,
	...gitCommands,
]

export const categoryColors = {
	setup: {
		bg: 'bg-indigo-500/20',
		text: 'text-indigo-400',
		border: 'border-indigo-500/50',
	},
	core: {
		bg: 'bg-purple-500/20',
		text: 'text-purple-400',
		border: 'border-purple-500/50',
	},
	dev: {
		bg: 'bg-blue-500/20',
		text: 'text-blue-400',
		border: 'border-blue-500/50',
	},
	quality: {
		bg: 'bg-green-500/20',
		text: 'text-green-400',
		border: 'border-green-500/50',
	},
	git: {
		bg: 'bg-amber-500/20',
		text: 'text-amber-400',
		border: 'border-amber-500/50',
	},
}
