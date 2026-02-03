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
		title: 'What is Workflow',
		section: 'Concepts',
		component: lazy(() => import('./02-workflow')),
	},
	{
		id: 2,
		path: '/slide/2',
		title: 'Flow Overview',
		section: 'Concepts',
		component: lazy(() => import('./04-flow-overview')),
	},
	{
		id: 3,
		path: '/slide/3',
		title: 'Live Demo',
		section: 'Demo',
		component: lazy(() => import('./05-live-demo-start')),
	},
	{
		id: 4,
		path: '/slide/4',
		title: '/implement',
		section: 'Workflow',
		component: lazy(() => import('./13-implement-command')),
	},
	{
		id: 5,
		path: '/slide/5',
		title: 'Agents',
		section: 'Workflow',
		component: lazy(() => import('./18-agents-showcase')),
	},
	{
		id: 6,
		path: '/slide/6',
		title: '/verify',
		section: 'Workflow',
		component: lazy(() => import('./15-verify-command')),
	},
	{
		id: 7,
		path: '/slide/7',
		title: '/review',
		section: 'Workflow',
		component: lazy(() => import('./16-review-command')),
	},
	{
		id: 8,
		path: '/slide/8',
		title: '/commit & /pr',
		section: 'Workflow',
		component: lazy(() => import('./17-git-workflow')),
	},
	{
		id: 9,
		path: '/slide/9',
		title: 'ADX Toolkit',
		section: 'Resources',
		component: lazy(() => import('./20-adx-toolkit')),
	},
	{
		id: 10,
		path: '/slide/10',
		title: 'Q&A',
		section: 'Closing',
		component: lazy(() => import('./09-qa')),
	},
]

export const totalSlides = slides.length
