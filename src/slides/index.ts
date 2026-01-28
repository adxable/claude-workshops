import { lazy } from 'react'
import type { ComponentType } from 'react'

export interface SlideConfig {
	id: number
	path: string
	title: string
	section: string
	component: React.LazyExoticComponent<ComponentType>
}

export const slides: SlideConfig[] = [
	{
		id: 1,
		path: '/slide/1',
		title: 'ADX Toolkit',
		section: 'Introduction',
		component: lazy(() => import('./01-intro')),
	},
	{
		id: 2,
		path: '/slide/2',
		title: 'The Workflow',
		section: 'Workflow',
		component: lazy(() => import('./02-workflow')),
	},
	{
		id: 3,
		path: '/slide/3',
		title: 'Workflow Deep Dive',
		section: 'Workflow',
		component: lazy(() => import('./10-workflow-deep-dive')),
	},
	{
		id: 4,
		path: '/slide/4',
		title: '/setup',
		section: 'Commands',
		component: lazy(() => import('./11-setup-command')),
	},
	{
		id: 5,
		path: '/slide/5',
		title: '/plan',
		section: 'Commands',
		component: lazy(() => import('./12-plan-command')),
	},
	{
		id: 6,
		path: '/slide/6',
		title: '/implement',
		section: 'Commands',
		component: lazy(() => import('./13-implement-command')),
	},
	{
		id: 7,
		path: '/slide/7',
		title: '/refactor',
		section: 'Commands',
		component: lazy(() => import('./14-refactor-command')),
	},
	{
		id: 8,
		path: '/slide/8',
		title: '/verify',
		section: 'Commands',
		component: lazy(() => import('./15-verify-command')),
	},
	{
		id: 9,
		path: '/slide/9',
		title: '/review',
		section: 'Commands',
		component: lazy(() => import('./16-review-command')),
	},
	{
		id: 10,
		path: '/slide/10',
		title: '/commit & /pr',
		section: 'Commands',
		component: lazy(() => import('./17-git-workflow')),
	},
	{
		id: 11,
		path: '/slide/11',
		title: 'Agents',
		section: 'Architecture',
		component: lazy(() => import('./18-agents-showcase')),
	},
	{
		id: 12,
		path: '/slide/12',
		title: 'Live Demo',
		section: 'Demo',
		component: lazy(() => import('./19-real-world-demo')),
	},
	{
		id: 13,
		path: '/slide/13',
		title: 'Q&A',
		section: 'Closing',
		component: lazy(() => import('./09-qa')),
	},
]

export const totalSlides = slides.length
