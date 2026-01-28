import { cn } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

interface CodeBlockProps {
	code: string
	language?: string
	filename?: string
	showLineNumbers?: boolean
}

export function CodeBlock({
	code,
	language = 'typescript',
	filename,
	showLineNumbers = false,
}: CodeBlockProps) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		await navigator.clipboard.writeText(code)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const lines = code.split('\n')

	return (
		<div className="rounded-lg overflow-hidden bg-zinc-900/80 border border-zinc-800">
			{/* Header */}
			{filename && (
				<div className="flex items-center justify-between px-4 py-2 bg-zinc-800/50 border-b border-zinc-700/50">
					<span className="text-sm text-zinc-400 font-mono">{filename}</span>
					<span className="text-xs text-zinc-500 px-2 py-0.5 rounded bg-zinc-700/50">
						{language}
					</span>
				</div>
			)}

			{/* Code */}
			<div className="relative group">
				<pre
					className={cn(
						'p-4 overflow-x-auto text-sm',
						showLineNumbers && 'pl-12',
					)}
				>
					{showLineNumbers && (
						<div className="absolute left-0 top-0 bottom-0 w-10 bg-zinc-800/30 border-r border-zinc-700/50 flex flex-col items-end pr-2 pt-4 text-xs text-zinc-600 font-mono select-none">
							{lines.map((_, i) => (
								<div key={`line-${i + 1}`} className="leading-6">
									{i + 1}
								</div>
							))}
						</div>
					)}
					<code className="font-mono text-zinc-100 leading-6">{code}</code>
				</pre>

				{/* Copy button */}
				<button
					type="button"
					onClick={handleCopy}
					className={cn(
						'absolute top-3 right-3 p-2 rounded-md transition-all',
						'opacity-0 group-hover:opacity-100',
						'bg-zinc-700/80 hover:bg-zinc-600/80',
						'focus:outline-none focus:ring-2 focus:ring-primary',
					)}
					aria-label={copied ? 'Copied!' : 'Copy code'}
				>
					{copied ? (
						<Check className="w-4 h-4 text-green-400" />
					) : (
						<Copy className="w-4 h-4 text-zinc-400" />
					)}
				</button>
			</div>
		</div>
	)
}
