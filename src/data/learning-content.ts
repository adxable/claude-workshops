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
			'What is the first phase in the Claude Code workflow?',
		options: ['/verify', '/plan', '/implement', '/review'],
		correctIndex: 1,
		explanation:
			'/plan is the first phase - it researches your codebase and creates a detailed implementation plan before any code is written.',
		category: 'workflow',
	},
	{
		id: 'q2',
		question:
			'Which command runs the entire development pipeline from planning to PR creation?',
		options: ['/ralph', '/ship', '/implement', '/verify'],
		correctIndex: 1,
		explanation:
			'/ship executes all 6 phases: plan → implement → verify → review → commit → pr',
		category: 'commands',
	},
	{
		id: 'q3',
		question: 'What does the /verify command do?',
		options: [
			'Creates a verification report',
			'Runs TypeScript, linter, build, and browser check in a loop',
			'Verifies your GitHub credentials',
			'Only checks for security vulnerabilities',
		],
		correctIndex: 1,
		explanation:
			'/verify runs a loop (max iterations) checking TypeScript, linter, build, and browser visual verification, auto-fixing issues until everything passes.',
		category: 'commands',
	},
	{
		id: 'q4',
		question: 'How many agents run during /review?',
		options: ['1', '2', '3', '5'],
		correctIndex: 1,
		explanation:
			'/review spawns 2 agents: code-reviewer and performance-auditor for code-specific review.',
		category: 'agents',
	},
	{
		id: 'q5',
		question: 'Which agent model is used for the "explorer" and "planner" agents?',
		options: ['Haiku', 'Sonnet', 'Opus', 'GPT-4'],
		correctIndex: 0,
		explanation:
			'Explorer and Planner use Haiku because they need to be fast and cheap for codebase searches and planning. Haiku is optimized for speed.',
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
		question: 'How many specialized agents are available in the workflow?',
		options: ['6', '9', '12', '15'],
		correctIndex: 2,
		explanation:
			'The workflow includes 12 specialized agents: explorer, planner, implementer, verifier, code-reviewer, browser-tester, git-automator, web-researcher, performance-auditor, security-auditor, pattern-researcher, and refactorer.',
		category: 'agents',
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
		question: 'What is the purpose of the verifier agent?',
		options: ['Visual UI testing', 'Type checks, linting, build, and tests', 'Code review', 'Git automation'],
		correctIndex: 1,
		explanation:
			'The verifier agent runs type checking, linting, builds, and tests with auto-fix capabilities in an iterative loop.',
		category: 'agents',
	},
]

export const learningScenarios: LearningScenario[] = [
	{
		id: 'scenario1',
		title: 'Add User Authentication',
		description:
			'Implement JWT-based authentication with login/logout functionality',
		task: 'Create a complete auth system with protected routes',
		recommendedCommands: ['/plan', '/implement', '/verify'],
		recommendedAgents: ['planner', 'implementer', 'verifier', 'web-researcher'],
		difficulty: 'intermediate',
	},
	{
		id: 'scenario2',
		title: 'Fix Performance Issues',
		description:
			'The dashboard is rendering slowly with unnecessary re-renders',
		task: 'Identify and fix performance bottlenecks',
		recommendedCommands: ['/plan', '/implement', '/verify'],
		recommendedAgents: ['explorer', 'performance-auditor', 'browser-tester'],
		difficulty: 'intermediate',
	},
	{
		id: 'scenario3',
		title: 'Add Dark Mode',
		description: 'Implement a theme system with dark/light mode toggle',
		task: 'Create theme context and update all components',
		recommendedCommands: ['/plan', '/ship'],
		recommendedAgents: ['planner', 'implementer', 'browser-tester'],
		difficulty: 'beginner',
	},
	{
		id: 'scenario4',
		title: 'Refactor Legacy Code',
		description: 'Old codebase with any types, large files, and no tests',
		task: 'Clean up the code while maintaining functionality',
		recommendedCommands: ['/refactor', '/verify', '/review'],
		recommendedAgents: ['refactorer', 'code-reviewer', 'verifier'],
		difficulty: 'advanced',
	},
	{
		id: 'scenario5',
		title: 'Build API Integration',
		description: 'Connect to external REST API with proper error handling',
		task: 'Create API client with caching and retry logic',
		recommendedCommands: ['/plan', '/implement', '/verify'],
		recommendedAgents: ['planner', 'implementer', 'web-researcher'],
		difficulty: 'intermediate',
	},
	{
		id: 'scenario6',
		title: 'Security Audit',
		description: 'Review codebase for security vulnerabilities',
		task: 'Identify and fix security issues',
		recommendedCommands: ['/review'],
		recommendedAgents: ['security-auditor', 'code-reviewer'],
		difficulty: 'advanced',
	},
]

export const workflowTips = [
	{
		phase: 'plan',
		tips: [
			'Be specific about what you want to build',
			'Review the plan before implementing',
			'Plans are saved in .claude/plans/ for reference',
			'Planner agent researches codebase patterns first',
		],
	},
	{
		phase: 'implement',
		tips: [
			'Pass the plan file path: /implement .claude/plans/plan-xyz.md',
			'Let it finish before interrupting',
			'Implementer agent loads relevant skills dynamically',
			'Web-researcher is spawned automatically if stuck',
		],
	},
	{
		phase: 'verify',
		tips: [
			'Runs TypeScript, linting, build, and browser check',
			'Add URL path for browser testing: /verify /dashboard',
			'Max iterations prevent infinite loops',
			'Auto-fixes issues until everything passes',
		],
	},
	{
		phase: 'review',
		tips: [
			'Code-specific review with 2 agents in parallel',
			'Code-reviewer checks patterns and type safety',
			'Performance-auditor analyzes bundle size and re-renders',
			'Check .claude/reviews/ for the report',
		],
	},
	{
		phase: 'commit',
		tips: [
			'Auto-generates conventional commit messages',
			'Includes Co-Authored-By: Claude',
			'Specify type if needed: /commit feat',
			'Git-automator ensures proper formatting',
		],
	},
	{
		phase: 'pr',
		tips: [
			'Analyzes all branch commits',
			'Pushes to remote automatically',
			'Returns the PR link when done',
			'Auto-generates description and test plan',
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
	planner: [
		'Creating implementation plans',
		'Detecting task types (feature, bug, refactor)',
		'Researching codebase patterns',
		'Estimating file changes',
	],
	implementer: [
		'Executing plan steps sequentially',
		'Loading relevant skills dynamically',
		'Creating and modifying files',
		'Running validation after changes',
	],
	verifier: [
		'Running TypeScript type checks',
		'Executing linting with auto-fix',
		'Building the project',
		'Running test suites',
	],
	'code-reviewer': [
		'Checking type safety',
		'Validating patterns',
		'Ensuring convention compliance',
		'Finding potential bugs',
	],
	'browser-tester': [
		'Visual UI verification',
		'Testing interactions',
		'Checking responsive design',
		'Error and loading state verification',
	],
	'git-automator': [
		'Creating smart commits',
		'Managing branches',
		'Opening pull requests',
		'Handling rebases',
	],
	'web-researcher': [
		'Debugging obscure errors',
		'Finding library documentation',
		'Researching best practices',
		'Checking GitHub issues',
	],
	'performance-auditor': [
		'Analyzing bundle size',
		'Detecting unnecessary re-renders',
		'Finding lazy loading opportunities',
		'Runtime profiling with browser',
	],
	'security-auditor': [
		'Detecting hardcoded secrets',
		'Finding XSS/SQL injection risks',
		'Auditing dependencies',
		'Checking configuration security',
	],
	'pattern-researcher': [
		'Discovering new patterns',
		'Analyzing Claude Code ecosystem',
		'Recommending improvements',
		'Comparing approaches',
	],
	refactorer: [
		'Removing any types',
		'Splitting large components',
		'Eliminating dead code',
		'Applying project conventions',
	],
}
