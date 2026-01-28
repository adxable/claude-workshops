import { AnimatePresence, motion } from 'framer-motion'
import {
	Check,
	ChevronRight,
	Copy,
	Search,
	Sparkles,
	Terminal,
} from 'lucide-react'
import { useState } from 'react'
import { type Command, allCommands, categoryColors } from '../../data/commands'
import { cn } from '../../lib/utils'

export default function CommandExplorer() {
	const [searchQuery, setSearchQuery] = useState('')
	const [selectedCommand, setSelectedCommand] = useState<Command | null>(null)
	const [copiedCommand, setCopiedCommand] = useState<string | null>(null)

	const filteredCommands = allCommands.filter(
		(cmd) =>
			cmd.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			cmd.description.toLowerCase().includes(searchQuery.toLowerCase()),
	)

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text)
		setCopiedCommand(text)
		setTimeout(() => setCopiedCommand(null), 2000)
	}

	return (
		<div className="space-y-4">
			{/* Search */}
			<div className="relative">
				<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
				<input
					type="text"
					placeholder="Search commands..."
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 outline-none transition-all"
				/>
			</div>

			<div className="grid md:grid-cols-2 gap-4">
				{/* Command list */}
				<div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
					{filteredCommands.map((cmd) => {
						const colors = categoryColors[cmd.category]
						const isSelected = selectedCommand?.name === cmd.name

						return (
							<motion.button
								key={cmd.name}
								onClick={() => setSelectedCommand(isSelected ? null : cmd)}
								className={cn(
									'w-full p-4 rounded-xl border text-left transition-all',
									isSelected
										? `${colors.bg} ${colors.border} ring-2 ring-offset-2 ring-offset-background ${colors.border}`
										: 'bg-card border-border hover:border-muted-foreground/50',
								)}
								whileHover={{ scale: 1.01 }}
								whileTap={{ scale: 0.99 }}
							>
								<div className="flex items-center justify-between mb-1">
									<code className={cn('font-mono font-bold', colors.text)}>
										{cmd.name}
									</code>
									<span
										className={cn(
											'px-2 py-0.5 rounded text-xs',
											colors.bg,
											colors.text,
										)}
									>
										{cmd.category}
									</span>
								</div>
								<p className="text-sm text-muted-foreground line-clamp-2">
									{cmd.description}
								</p>
							</motion.button>
						)
					})}

					{filteredCommands.length === 0 && (
						<div className="text-center py-8 text-muted-foreground">
							No commands found matching "{searchQuery}"
						</div>
					)}
				</div>

				{/* Command details */}
				<AnimatePresence mode="wait">
					{selectedCommand ? (
						<motion.div
							key={selectedCommand.name}
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							className="p-5 rounded-xl bg-card border border-border"
						>
							<div className="flex items-center justify-between mb-4">
								<code
									className={cn(
										'text-xl font-mono font-bold',
										categoryColors[selectedCommand.category].text,
									)}
								>
									{selectedCommand.name}
								</code>
								<span
									className={cn(
										'px-3 py-1 rounded-full text-xs',
										categoryColors[selectedCommand.category].bg,
										categoryColors[selectedCommand.category].text,
									)}
								>
									{selectedCommand.category}
								</span>
							</div>

							<p className="text-muted-foreground mb-4">
								{selectedCommand.description}
							</p>

							{selectedCommand.details && (
								<p className="text-sm text-muted-foreground mb-4 p-3 rounded-lg bg-black/20">
									{selectedCommand.details}
								</p>
							)}

							{/* Usage */}
							<div className="mb-4">
								<h4 className="text-sm font-medium mb-2 flex items-center gap-2">
									<Terminal className="w-4 h-4 text-muted-foreground" />
									Usage
								</h4>
								<div className="relative">
									<code className="block p-3 rounded-lg bg-black/30 border border-border text-sm font-mono">
										{selectedCommand.usage}
									</code>
									<button
										onClick={() => copyToClipboard(selectedCommand.usage)}
										className="absolute top-2 right-2 p-1.5 rounded bg-card/50 hover:bg-card transition-colors"
									>
										{copiedCommand === selectedCommand.usage ? (
											<Check className="w-4 h-4 text-green-400" />
										) : (
											<Copy className="w-4 h-4 text-muted-foreground" />
										)}
									</button>
								</div>
							</div>

							{/* Example */}
							<div className="mb-4">
								<h4 className="text-sm font-medium mb-2">Example</h4>
								<div className="relative">
									<code className="block p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 text-sm font-mono text-purple-400">
										{selectedCommand.example}
									</code>
									<button
										onClick={() => copyToClipboard(selectedCommand.example)}
										className="absolute top-2 right-2 p-1.5 rounded bg-card/50 hover:bg-card transition-colors"
									>
										{copiedCommand === selectedCommand.example ? (
											<Check className="w-4 h-4 text-green-400" />
										) : (
											<Copy className="w-4 h-4 text-muted-foreground" />
										)}
									</button>
								</div>
							</div>

							{/* Flags */}
							{selectedCommand.flags && selectedCommand.flags.length > 0 && (
								<div className="mb-4">
									<h4 className="text-sm font-medium mb-2">Flags</h4>
									<div className="flex flex-wrap gap-2">
										{selectedCommand.flags.map((flag) => (
											<span
												key={flag}
												className="px-2 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono"
											>
												{flag}
											</span>
										))}
									</div>
								</div>
							)}

							{/* Tips */}
							<div>
								<h4 className="text-sm font-medium mb-2 flex items-center gap-2">
									<Sparkles className="w-4 h-4 text-amber-400" />
									Tips
								</h4>
								<ul className="space-y-1">
									{selectedCommand.tips.map((tip, i) => (
										<li
											key={i}
											className="text-sm text-muted-foreground flex items-start gap-2"
										>
											<ChevronRight className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
											{tip}
										</li>
									))}
								</ul>
							</div>
						</motion.div>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="p-8 rounded-xl bg-card border border-border flex flex-col items-center justify-center text-center"
						>
							<Terminal className="w-12 h-12 text-muted-foreground mb-4" />
							<p className="text-muted-foreground">
								Select a command to see details
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	)
}
