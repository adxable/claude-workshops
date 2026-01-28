import { AnimatePresence, motion } from 'framer-motion'
import {
	Check,
	Code2,
	Copy,
	ExternalLink,
	Github,
	Globe,
	LineChart,
	Sparkles,
	Star,
	TrendingUp,
	Users,
} from 'lucide-react'
import { useState } from 'react'
import { cn } from '../../lib/utils'

interface DemoOption {
	id: string
	title: string
	subtitle: string
	icon: React.ElementType
	color: string
	gradient: string
	borderColor: string
	api: {
		name: string
		url: string
		authRequired: boolean
	}
	features: string[]
	techHighlights: string[]
	prompt: string
	complexity: 'Medium' | 'Medium-High' | 'High'
	estimatedTime: string
}

const demoOptions: DemoOption[] = [
	{
		id: 'github',
		title: 'GitHub Repo Explorer',
		subtitle: 'Explore users, repositories & contributions',
		icon: Github,
		color: 'text-slate-300',
		gradient: 'from-slate-500/20 to-zinc-500/20',
		borderColor: 'border-slate-500/30',
		api: {
			name: 'GitHub REST API',
			url: 'api.github.com',
			authRequired: false,
		},
		features: [
			'Search GitHub users by username',
			'Display user profile with avatar & stats',
			'List repositories with stars, forks, language',
			'Filter repos by language or sort by stars',
			'Repository detail view with README preview',
		],
		techHighlights: [
			'TanStack Query for data fetching',
			'Debounced search input',
			'Skeleton loading states',
			'Error boundaries',
		],
		complexity: 'Medium',
		estimatedTime: '45-60 min',
		prompt: `Create a GitHub Repository Explorer feature with the following requirements:

## API
Use the GitHub REST API (no authentication required for public data):
- Search users: https://api.github.com/search/users?q={query}
- Get user: https://api.github.com/users/{username}
- Get repos: https://api.github.com/users/{username}/repos

## Features to Implement

1. **User Search**
   - Search input with debounce (300ms)
   - Display search results as user cards
   - Show avatar, username, and profile link

2. **User Profile View**
   - Large avatar and user info
   - Stats: followers, following, public repos
   - Bio and location if available

3. **Repository List**
   - List all public repositories
   - Show: name, description, stars, forks, primary language
   - Language color indicators
   - Sort by: stars, updated, name
   - Filter by language

4. **Repository Detail Modal**
   - Full repo stats
   - Topics/tags
   - Link to GitHub

## Technical Requirements
- Use TanStack Query with query options pattern
- Implement proper loading skeletons
- Handle rate limiting errors gracefully
- Mobile responsive design

## UI Style
- Dark theme matching existing app
- Use existing color system (purple/blue accents)
- Smooth animations with Framer Motion

Create this as a new route at /dashboard/github-explorer with its own components folder.`,
	},
	{
		id: 'countries',
		title: 'Country Comparison Tool',
		subtitle: 'Compare nations side by side',
		icon: Globe,
		color: 'text-emerald-400',
		gradient: 'from-emerald-500/20 to-teal-500/20',
		borderColor: 'border-emerald-500/30',
		api: {
			name: 'REST Countries API',
			url: 'restcountries.com',
			authRequired: false,
		},
		features: [
			'Browse all countries with search & filter',
			'Filter by region (Europe, Asia, etc.)',
			'Select 2-3 countries to compare',
			'Side-by-side comparison table',
			'Visual stats with charts',
		],
		techHighlights: [
			'Multi-select state management',
			'Dynamic comparison grid',
			'Data visualization',
			'Responsive card layout',
		],
		complexity: 'Medium',
		estimatedTime: '45-60 min',
		prompt: `Create a Country Comparison Tool feature with the following requirements:

## API
Use the REST Countries API (no authentication required):
- All countries: https://restcountries.com/v3.1/all
- By region: https://restcountries.com/v3.1/region/{region}
- Search: https://restcountries.com/v3.1/name/{name}

## Features to Implement

1. **Country Browser**
   - Grid of country cards with flags
   - Search by country name
   - Filter by region dropdown (Africa, Americas, Asia, Europe, Oceania)
   - Show: flag, name, capital, population

2. **Country Selection**
   - Click to select countries (max 3)
   - Selected countries shown in a "comparison tray"
   - Clear selection button
   - "Compare" button when 2+ selected

3. **Comparison View**
   - Side-by-side comparison cards
   - Compare: population, area, languages, currencies
   - Visual bars for population/area comparison
   - Flags prominently displayed

4. **Stats Visualization**
   - Population comparison bar chart
   - Area comparison
   - Density calculation (pop/area)

## Technical Requirements
- Use Zustand for selection state (with useShallow)
- TanStack Query for data fetching
- Memoize filtered/sorted results
- Handle loading and error states

## UI Style
- Dark theme with emerald/teal accents
- Flag images as visual anchors
- Smooth selection animations
- Mobile responsive grid

Create this as a new route at /dashboard/country-compare with its own components folder.`,
	},
	{
		id: 'crypto',
		title: 'Crypto Dashboard',
		subtitle: 'Real-time prices & market data',
		icon: LineChart,
		color: 'text-amber-400',
		gradient: 'from-amber-500/20 to-orange-500/20',
		borderColor: 'border-amber-500/30',
		api: {
			name: 'CoinGecko API',
			url: 'api.coingecko.com',
			authRequired: false,
		},
		features: [
			'Top cryptocurrencies by market cap',
			'Real-time price updates',
			'7-day sparkline charts',
			'Search and filter coins',
			'Watchlist with localStorage persistence',
		],
		techHighlights: [
			'Auto-refresh with refetchInterval',
			'Sparkline chart rendering',
			'LocalStorage persistence',
			'Optimistic UI updates',
		],
		complexity: 'Medium-High',
		estimatedTime: '60-75 min',
		prompt: `Create a Crypto Dashboard feature with the following requirements:

## API
Use the CoinGecko API (no authentication required):
- Market data: https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&sparkline=true
- Search: https://api.coingecko.com/api/v3/search?query={query}
- Coin detail: https://api.coingecko.com/api/v3/coins/{id}

## Features to Implement

1. **Market Overview**
   - Table of top 50 coins by market cap
   - Columns: rank, name, price, 24h change, market cap, sparkline
   - Color-coded price changes (green/red)
   - Auto-refresh every 60 seconds

2. **Search & Filter**
   - Search coins by name or symbol
   - Filter by price range
   - Sort by: market cap, price, 24h change

3. **Sparkline Charts**
   - 7-day price chart for each coin
   - Mini inline charts in the table
   - Color based on trend (up=green, down=red)

4. **Watchlist**
   - Star icon to add/remove from watchlist
   - Watchlist tab showing only starred coins
   - Persist to localStorage
   - Show watchlist count in tab

5. **Coin Detail Modal**
   - Click row to open detail modal
   - Larger price chart
   - Additional stats: volume, supply, ATH
   - Link to CoinGecko

## Technical Requirements
- TanStack Query with 60s refetchInterval
- Zustand for watchlist state
- localStorage sync for persistence
- Sparkline using a simple SVG or recharts
- Number formatting (K, M, B suffixes)

## UI Style
- Dark theme with amber/orange accents
- Green/red for price changes
- Smooth number transitions
- Responsive table with horizontal scroll on mobile

Create this as a new route at /dashboard/crypto with its own components folder.`,
	},
]

function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		await navigator.clipboard.writeText(text)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<button
			onClick={handleCopy}
			className={cn(
				'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
				copied
					? 'bg-green-500/20 text-green-400 border border-green-500/50'
					: 'bg-purple-500/20 text-purple-400 border border-purple-500/50 hover:bg-purple-500/30',
			)}
		>
			{copied ? (
				<>
					<Check className="w-4 h-4" />
					Copied!
				</>
			) : (
				<>
					<Copy className="w-4 h-4" />
					Copy Prompt
				</>
			)}
		</button>
	)
}

function DemoCard({
	option,
	isExpanded,
	onToggle,
}: {
	option: DemoOption
	isExpanded: boolean
	onToggle: () => void
}) {
	const Icon = option.icon

	return (
		<div
			className={cn(
				'rounded-2xl border transition-all cursor-pointer overflow-hidden',
				`bg-gradient-to-br ${option.gradient} ${option.borderColor}`,
				isExpanded && 'ring-2 ring-purple-500/50',
			)}
			onClick={() => !isExpanded && onToggle()}
		>
			{/* Header - Always visible */}
			<div className="p-6">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center gap-4">
						<div
							className={cn(
								'p-3 rounded-xl bg-black/30 border',
								option.borderColor,
							)}
						>
							<Icon className={cn('w-6 h-6', option.color)} />
						</div>
						<div>
							<h3 className="text-xl font-bold text-white">{option.title}</h3>
							<p className="text-sm text-muted-foreground">{option.subtitle}</p>
						</div>
					</div>
					<div className="flex flex-col items-end gap-2">
						<span
							className={cn(
								'px-2 py-1 rounded text-xs font-medium',
								option.complexity === 'Medium'
									? 'bg-green-500/20 text-green-400'
									: option.complexity === 'Medium-High'
										? 'bg-amber-500/20 text-amber-400'
										: 'bg-red-500/20 text-red-400',
							)}
						>
							{option.complexity}
						</span>
						<span className="text-xs text-muted-foreground">
							~{option.estimatedTime}
						</span>
					</div>
				</div>

				{/* API Badge */}
				<div className="flex items-center gap-2 mb-4">
					<span className="px-2 py-1 rounded bg-black/30 text-xs font-mono text-muted-foreground">
						{option.api.url}
					</span>
					{!option.api.authRequired && (
						<span className="px-2 py-1 rounded bg-green-500/20 text-xs text-green-400">
							No Auth Required
						</span>
					)}
				</div>

				{/* Features Preview */}
				<div className="space-y-2">
					{option.features.slice(0, 3).map((feature, i) => (
						<div key={i} className="flex items-center gap-2 text-sm">
							<Star className="w-3 h-3 text-purple-400 flex-shrink-0" />
							<span className="text-muted-foreground">{feature}</span>
						</div>
					))}
					{!isExpanded && option.features.length > 3 && (
						<p className="text-xs text-purple-400 mt-2">
							+{option.features.length - 3} more features...
						</p>
					)}
				</div>
			</div>

			{/* Expanded Content */}
			<AnimatePresence>
				{isExpanded && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
						className="overflow-hidden"
					>
						<div className="border-t border-white/10">
							{/* Additional Features */}
							{option.features.length > 3 && (
								<div className="px-6 pt-4 space-y-2">
									{option.features.slice(3).map((feature, i) => (
										<div key={i} className="flex items-center gap-2 text-sm">
											<Star className="w-3 h-3 text-purple-400 flex-shrink-0" />
											<span className="text-muted-foreground">{feature}</span>
										</div>
									))}
								</div>
							)}

							{/* Tech Highlights */}
							<div className="p-6 border-b border-white/10">
								<h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
									<Code2 className="w-4 h-4 text-purple-400" />
									Technical Highlights
								</h4>
								<div className="flex flex-wrap gap-2">
									{option.techHighlights.map((tech, i) => (
										<span
											key={i}
											className="px-2 py-1 rounded bg-purple-500/20 text-xs text-purple-300"
										>
											{tech}
										</span>
									))}
								</div>
							</div>

							{/* Prompt Section */}
							<div className="p-6">
								<div className="flex items-center justify-between mb-3">
									<h4 className="text-sm font-semibold text-white flex items-center gap-2">
										<Sparkles className="w-4 h-4 text-amber-400" />
										Ready-to-Use Prompt
									</h4>
									<CopyButton text={option.prompt} />
								</div>
								<div className="relative">
									<pre className="p-4 rounded-xl bg-black/50 border border-white/10 text-xs text-muted-foreground overflow-x-auto max-h-[300px] overflow-y-auto whitespace-pre-wrap">
										{option.prompt}
									</pre>
								</div>
							</div>

							{/* Action Buttons */}
							<div className="p-6 pt-0 flex items-center justify-between">
								<button
									onClick={(e) => {
										e.stopPropagation()
										onToggle()
									}}
									className="text-sm text-muted-foreground hover:text-white transition-colors"
								>
									Collapse
								</button>
								<a
									href={`https://${option.api.url}`}
									target="_blank"
									rel="noopener noreferrer"
									onClick={(e) => e.stopPropagation()}
									className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
								>
									View API Docs
									<ExternalLink className="w-3 h-3" />
								</a>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}

export default function DemoSelector() {
	const [expandedId, setExpandedId] = useState<string | null>(null)

	return (
		<div className="space-y-6">
			{/* Header */}
			<motion.div
				className="text-center"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
			>
				<div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4">
					<Users className="w-4 h-4 text-purple-400" />
					<span className="text-sm text-purple-300">Interactive Workshop</span>
				</div>
				<h1 className="text-3xl font-bold text-white mb-2">
					Choose Your Demo Feature
				</h1>
				<p className="text-muted-foreground max-w-2xl mx-auto">
					Vote for the feature you'd like to see built live! Each option
					demonstrates real-world patterns with free APIs.
				</p>
			</motion.div>

			{/* Voting Instructions */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1 }}
				className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 via-zinc-900 to-blue-500/10 border border-white/10"
			>
				<div className="flex items-center justify-center gap-6 text-sm">
					<div className="flex items-center gap-2">
						<span className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-400 text-xs font-bold">
							1
						</span>
						<span className="text-muted-foreground">Review the options</span>
					</div>
					<TrendingUp className="w-4 h-4 text-muted-foreground/50" />
					<div className="flex items-center gap-2">
						<span className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-400 text-xs font-bold">
							2
						</span>
						<span className="text-muted-foreground">Vote with the group</span>
					</div>
					<TrendingUp className="w-4 h-4 text-muted-foreground/50" />
					<div className="flex items-center gap-2">
						<span className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-400 text-xs font-bold">
							3
						</span>
						<span className="text-muted-foreground">Watch it get built!</span>
					</div>
				</div>
			</motion.div>

			{/* Demo Options Grid */}
			<motion.div
				className="grid gap-6"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.2 }}
			>
				{demoOptions.map((option, index) => (
					<motion.div
						key={option.id}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 * (index + 1) }}
					>
						<DemoCard
							option={option}
							isExpanded={expandedId === option.id}
							onToggle={() =>
								setExpandedId(expandedId === option.id ? null : option.id)
							}
						/>
					</motion.div>
				))}
			</motion.div>

			{/* Footer Note */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.5 }}
				className="text-center text-xs text-muted-foreground"
			>
				<p>
					All APIs are free and require no authentication. The selected feature
					will be built using the{' '}
					<code className="text-purple-400">/ship</code> workflow.
				</p>
			</motion.div>
		</div>
	)
}
