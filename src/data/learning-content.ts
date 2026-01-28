export interface QuizQuestion {
	id: string
	question: string
	options: string[]
	correctIndex: number
	explanation: string
	category: 'workflow' | 'commands' | 'agents'
}

export interface LearningScenario {
	id: string
	title: string
	description: string
	task: string
	recommendedCommands: string[]
	recommendedAgents: string[]
	difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export const quizQuestions: QuizQuestion[] = [
	{
		id: 'q1',
		question:
			'What is the first command you should run when starting a new project with ADX?',
		options: ['/plan', '/setup', '/ship', '/implement'],
		correctIndex: 1,
		explanation:
			'/setup detects your stack and creates configuration files that enable context-aware assistance for all other commands.',
		category: 'workflow',
	},
	{
		id: 'q2',
		question:
			'Which command runs the entire development pipeline from planning to PR creation?',
		options: ['/ralph', '/ship', '/implement', '/verify'],
		correctIndex: 1,
		explanation:
			'/ship executes all 8 phases: setup → plan → implement → refactor → verify → review → commit → pr',
		category: 'commands',
	},
	{
		id: 'q3',
		question: 'What does the /verify command do?',
		options: [
			'Creates a verification report',
			'Runs TypeScript, linter, and build in a loop until all pass',
			'Verifies your GitHub credentials',
			'Checks for security vulnerabilities',
		],
		correctIndex: 1,
		explanation:
			'/verify runs a loop (max 5 iterations) checking TypeScript, linter, and build, auto-fixing issues until everything passes.',
		category: 'commands',
	},
	{
		id: 'q4',
		question: 'How many agents run in parallel during /review?',
		options: ['1', '2', '3', '5'],
		correctIndex: 2,
		explanation:
			'/review spawns 3 agents in parallel: code-reviewer, performance-auditor, and browser-tester.',
		category: 'agents',
	},
	{
		id: 'q5',
		question: 'Which agent model is used for the "explorer" agent?',
		options: ['Haiku', 'Sonnet', 'Opus', 'GPT-4'],
		correctIndex: 0,
		explanation:
			'Explorer uses Haiku because it needs to be fast and cheap for codebase searches. Haiku is optimized for speed.',
		category: 'agents',
	},
	{
		id: 'q6',
		question: 'What happens if /implement gets stuck on an issue?',
		options: [
			'It fails and stops',
			'It asks for user input',
			'It spawns web-researcher agent to find solutions',
			'It skips the step',
		],
		correctIndex: 2,
		explanation:
			'When /implement encounters a problem, it automatically spawns the web-researcher agent to search GitHub issues, Stack Overflow, and documentation for solutions.',
		category: 'workflow',
	},
	{
		id: 'q7',
		question: 'Where does /plan save its output?',
		options: [
			'.claude/reviews/',
			'.claude/plans/',
			'.claude/config/',
			'./plans/',
		],
		correctIndex: 1,
		explanation:
			'/plan creates detailed implementation plans in .claude/plans/ directory with steps, files to modify, and verification criteria.',
		category: 'commands',
	},
	{
		id: 'q8',
		question: 'What does /ralph do differently from /ship?',
		options: [
			'It runs faster',
			'It uses fewer agents',
			'It loops autonomously until PR is created with error recovery',
			'It skips the review phase',
		],
		correctIndex: 2,
		explanation:
			'/ralph is a fully autonomous "fire and forget" mode that loops until a PR is created, with built-in circuit breakers and error recovery.',
		category: 'commands',
	},
	{
		id: 'q9',
		question:
			'Which agent is responsible for removing "any" types and splitting large components?',
		options: ['code-reviewer', 'refactorer', 'performance-auditor', 'explorer'],
		correctIndex: 1,
		explanation:
			'The refactorer agent (Opus) specializes in code cleanup: removing any types, splitting oversized components, and eliminating dead code.',
		category: 'agents',
	},
	{
		id: 'q10',
		question: 'What flag enables visual browser testing with /review?',
		options: ['--test', '--visual', '--browser', '--ui'],
		correctIndex: 2,
		explanation:
			'The --browser flag enables the browser-tester agent to visually verify the UI, test interactions, and check responsive design.',
		category: 'commands',
	},
]

export const learningScenarios: LearningScenario[] = [
	{
		id: 'scenario1',
		title: 'Add User Authentication',
		description:
			'Implement JWT-based authentication with login/logout functionality',
		task: 'Create a complete auth system with protected routes',
		recommendedCommands: ['/setup', '/plan', '/ship'],
		recommendedAgents: ['explorer', 'web-researcher', 'code-reviewer'],
		difficulty: 'intermediate',
	},
	{
		id: 'scenario2',
		title: 'Fix Performance Issues',
		description:
			'The dashboard is rendering slowly with unnecessary re-renders',
		task: 'Identify and fix performance bottlenecks',
		recommendedCommands: ['/plan', '/implement', '/review --browser'],
		recommendedAgents: ['explorer', 'performance-auditor', 'refactorer'],
		difficulty: 'intermediate',
	},
	{
		id: 'scenario3',
		title: 'Add Dark Mode',
		description: 'Implement a theme system with dark/light mode toggle',
		task: 'Create theme context and update all components',
		recommendedCommands: ['/setup', '/ship --browser'],
		recommendedAgents: ['explorer', 'browser-tester'],
		difficulty: 'beginner',
	},
	{
		id: 'scenario4',
		title: 'Refactor Legacy Code',
		description: 'Old codebase with any types, large files, and no tests',
		task: 'Clean up the code while maintaining functionality',
		recommendedCommands: ['/refactor', '/verify', '/review'],
		recommendedAgents: ['refactorer', 'code-reviewer'],
		difficulty: 'advanced',
	},
	{
		id: 'scenario5',
		title: 'Build API Integration',
		description: 'Connect to external REST API with proper error handling',
		task: 'Create API client with caching and retry logic',
		recommendedCommands: ['/plan', '/implement', '/verify'],
		recommendedAgents: ['explorer', 'web-researcher'],
		difficulty: 'intermediate',
	},
]

export const workflowTips = [
	{
		phase: 'setup',
		tips: [
			'Run /setup once when starting a new project',
			'Re-run if you add major new libraries',
			'Use "quick" mode for defaults: /setup quick',
		],
	},
	{
		phase: 'plan',
		tips: [
			'Be specific about what you want to build',
			'Review the plan before implementing',
			'Plans are saved in .claude/plans/ for reference',
		],
	},
	{
		phase: 'implement',
		tips: [
			'Pass the plan file path: /implement .claude/plans/plan-xyz.md',
			'Let it finish before interrupting',
			'Check type errors are fixed after each step',
		],
	},
	{
		phase: 'refactor',
		tips: [
			'Run on specific directories for focused cleanup',
			'Great for removing technical debt',
			'Verifies types after changes',
		],
	},
	{
		phase: 'verify',
		tips: [
			'Max 5 iterations prevents infinite loops',
			'Add URL path for browser testing: /verify /dashboard',
			'Wait for all checks to pass before proceeding',
		],
	},
	{
		phase: 'review',
		tips: [
			'Use --browser for visual verification',
			'3 agents review in parallel for speed',
			'Check .claude/reviews/ for the report',
		],
	},
	{
		phase: 'commit',
		tips: [
			'Auto-generates conventional commit messages',
			'Includes Co-Authored-By: Claude',
			'Specify type if needed: /commit feat',
		],
	},
	{
		phase: 'pr',
		tips: [
			'Analyzes all branch commits',
			'Pushes to remote automatically',
			'Returns the PR link when done',
		],
	},
]

export const agentUseCases: Record<string, string[]> = {
	explorer: [
		'Finding where a function is defined',
		'Understanding codebase structure',
		'Locating similar implementations',
		'Searching for patterns',
	],
	'web-researcher': [
		'Debugging obscure errors',
		'Finding library documentation',
		'Researching best practices',
		'Checking GitHub issues',
	],
	refactorer: [
		'Removing any types',
		'Splitting large components',
		'Eliminating dead code',
		'Improving code structure',
	],
	'code-reviewer': [
		'Checking type safety',
		'Validating patterns',
		'Ensuring convention compliance',
		'Finding potential bugs',
	],
	'performance-auditor': [
		'Analyzing bundle size',
		'Detecting unnecessary re-renders',
		'Finding lazy loading opportunities',
		'Checking memory usage',
	],
	'browser-tester': [
		'Visual UI verification',
		'Testing interactions',
		'Checking responsive design',
		'Screenshot comparisons',
	],
	'git-automator': [
		'Creating smart commits',
		'Managing branches',
		'Opening pull requests',
		'Handling rebases',
	],
	'accessibility-tester': [
		'WCAG compliance checks',
		'Keyboard navigation testing',
		'Screen reader compatibility',
		'Color contrast analysis',
	],
	'docs-generator': [
		'Creating README files',
		'Documenting components',
		'Writing API docs',
		'Adding JSDoc comments',
	],
}
