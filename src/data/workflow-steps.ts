export interface WorkflowStep {
	id: string
	title: string
	description: string
	command: string
	agent?: string
	icon:
		| 'Settings'
		| 'Lightbulb'
		| 'Code'
		| 'Wrench'
		| 'CheckCircle'
		| 'Eye'
		| 'GitCommit'
		| 'GitPullRequest'
	color:
		| 'indigo'
		| 'purple'
		| 'blue'
		| 'cyan'
		| 'green'
		| 'amber'
		| 'orange'
		| 'rose'
	details?: string
	output?: string
}

export const workflowSteps: WorkflowStep[] = [
	{
		id: 'setup',
		title: 'Setup',
		description: 'Configure project standards',
		command: '/setup',
		icon: 'Settings',
		color: 'indigo',
		details:
			'Run once per project. Detects your stack (React, Zustand, Tailwind, etc.) and creates configuration files in .claude/config/ that enable context-aware assistance.',
		output:
			'Creates .claude/config/frontend-guidelines.json, code-quality.json, project-structure.json',
	},
	{
		id: 'plan',
		title: 'Plan',
		description: 'Research codebase and create implementation plan',
		command: '/plan',
		agent: 'explorer',
		icon: 'Lightbulb',
		color: 'purple',
		details:
			'The explorer agent (Haiku) scans your codebase to understand patterns, find relevant files, and creates a detailed implementation plan in .claude/plans/',
		output:
			'Creates .claude/plans/plan-{feature}.md with steps, files to modify, and verification criteria',
	},
	{
		id: 'implement',
		title: 'Implement',
		description: 'Execute plan step by step',
		command: '/implement',
		agent: 'web-researcher',
		icon: 'Code',
		color: 'blue',
		details:
			'Follows the plan sequentially, writing code and making changes. If stuck, automatically spawns web-researcher agent to find solutions online.',
		output:
			'Creates/modifies files according to the plan, runs type checks after each change',
	},
	{
		id: 'refactor',
		title: 'Refactor',
		description: 'Clean code, remove any types',
		command: '/refactor',
		agent: 'refactorer',
		icon: 'Wrench',
		color: 'cyan',
		details:
			'The refactorer agent (Opus) analyzes code for technical debt: any types, oversized components, dead code, and applies fixes while maintaining functionality.',
		output:
			'Cleaner code with proper types, smaller components, removed unused code',
	},
	{
		id: 'verify',
		title: 'Verify',
		description: 'TypeScript + ESLint + Build loop',
		command: '/verify',
		icon: 'CheckCircle',
		color: 'green',
		details:
			'Runs verification in a loop (max 5 iterations): type check, lint, build. Auto-fixes issues until everything passes or max iterations reached.',
		output: 'All checks passing: tsc, eslint/biome, vite build',
	},
	{
		id: 'review',
		title: 'Review',
		description: '3 agents in parallel + browser testing',
		command: '/review',
		agent: 'code-reviewer, performance-auditor, browser-tester',
		icon: 'Eye',
		color: 'amber',
		details:
			'Spawns 3 agents in parallel: code-reviewer checks patterns, performance-auditor checks for issues, browser-tester visually verifies the UI.',
		output:
			'Creates .claude/reviews/review-{timestamp}.md with findings and recommendations',
	},
	{
		id: 'commit',
		title: 'Commit',
		description: 'Generate conventional commit',
		command: '/commit',
		agent: 'git-automator',
		icon: 'GitCommit',
		color: 'orange',
		details:
			'Analyzes all staged changes, generates a conventional commit message that describes the changes, and includes Co-Authored-By: Claude.',
		output:
			'Git commit with proper conventional commit format (feat:, fix:, etc.)',
	},
	{
		id: 'pr',
		title: 'PR',
		description: 'Create pull request',
		command: '/pr',
		agent: 'git-automator',
		icon: 'GitPullRequest',
		color: 'rose',
		details:
			'Analyzes all commits in the branch, generates PR title and description with summary and test plan, pushes to remote, and creates the PR via gh CLI.',
		output:
			'Pull request created with auto-generated description and link returned',
	},
]

export const colorMap = {
	indigo: {
		bg: 'bg-indigo-500/20',
		border: 'border-indigo-500/50',
		text: 'text-indigo-400',
		glow: 'shadow-indigo-500/30',
	},
	purple: {
		bg: 'bg-purple-500/20',
		border: 'border-purple-500/50',
		text: 'text-purple-400',
		glow: 'shadow-purple-500/30',
	},
	blue: {
		bg: 'bg-blue-500/20',
		border: 'border-blue-500/50',
		text: 'text-blue-400',
		glow: 'shadow-blue-500/30',
	},
	cyan: {
		bg: 'bg-cyan-500/20',
		border: 'border-cyan-500/50',
		text: 'text-cyan-400',
		glow: 'shadow-cyan-500/30',
	},
	green: {
		bg: 'bg-green-500/20',
		border: 'border-green-500/50',
		text: 'text-green-400',
		glow: 'shadow-green-500/30',
	},
	amber: {
		bg: 'bg-amber-500/20',
		border: 'border-amber-500/50',
		text: 'text-amber-400',
		glow: 'shadow-amber-500/30',
	},
	orange: {
		bg: 'bg-orange-500/20',
		border: 'border-orange-500/50',
		text: 'text-orange-400',
		glow: 'shadow-orange-500/30',
	},
	rose: {
		bg: 'bg-rose-500/20',
		border: 'border-rose-500/50',
		text: 'text-rose-400',
		glow: 'shadow-rose-500/30',
	},
}

export interface Agent {
	id: string
	name: string
	model: 'haiku' | 'sonnet' | 'opus'
	description: string
	capabilities: string[]
	color: string
}

export const agents: Agent[] = [
	{
		id: 'explorer',
		name: 'Explorer',
		model: 'haiku',
		description: 'Fast codebase search and exploration',
		capabilities: ['Find files', 'Search patterns', 'Locate definitions'],
		color: 'purple',
	},
	{
		id: 'web-researcher',
		name: 'Web Researcher',
		model: 'sonnet',
		description: 'Debug issues by searching online',
		capabilities: ['GitHub Issues', 'Stack Overflow', 'Documentation'],
		color: 'blue',
	},
	{
		id: 'refactorer',
		name: 'Refactorer',
		model: 'opus',
		description: 'Code cleanup and technical debt reduction',
		capabilities: [
			'Remove any types',
			'Split components',
			'Fix error handling',
		],
		color: 'cyan',
	},
	{
		id: 'code-reviewer',
		name: 'Code Reviewer',
		model: 'opus',
		description: 'Comprehensive code review',
		capabilities: [
			'Type checking',
			'Pattern validation',
			'Convention compliance',
		],
		color: 'green',
	},
	{
		id: 'performance-auditor',
		name: 'Performance Auditor',
		model: 'opus',
		description: 'Frontend performance analysis',
		capabilities: ['Bundle size', 'Re-render detection', 'Lazy loading'],
		color: 'amber',
	},
	{
		id: 'browser-tester',
		name: 'Browser Tester',
		model: 'opus',
		description: 'Visual and functional testing',
		capabilities: [
			'UI verification',
			'Interaction testing',
			'Responsive design',
		],
		color: 'orange',
	},
	{
		id: 'git-automator',
		name: 'Git Automator',
		model: 'sonnet',
		description: 'Git workflow automation',
		capabilities: ['Smart commits', 'Branch management', 'PR creation'],
		color: 'rose',
	},
	{
		id: 'accessibility-tester',
		name: 'Accessibility Tester',
		model: 'sonnet',
		description: 'WCAG compliance checking',
		capabilities: ['Semantic HTML', 'Keyboard nav', 'Color contrast'],
		color: 'indigo',
	},
	{
		id: 'docs-generator',
		name: 'Docs Generator',
		model: 'sonnet',
		description: 'Documentation generation',
		capabilities: ['README', 'Component docs', 'JSDoc comments'],
		color: 'slate',
	},
]
