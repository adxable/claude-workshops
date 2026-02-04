import { useQuery } from '@tanstack/react-query'

const BASE_URL = 'https://restcountries.com/v3.1'

export interface Country {
	cca3: string
	name: {
		common: string
		official: string
	}
	capital?: string[]
	population: number
	area: number
	region: string
	subregion?: string
	flags: {
		svg: string
		png: string
	}
	languages?: Record<string, string>
	currencies?: Record<string, { name: string; symbol: string }>
}

async function fetchAllCountries(): Promise<Country[]> {
	const response = await fetch(
		`${BASE_URL}/all?fields=cca3,name,capital,population,area,region,subregion,flags,languages,currencies`,
	)
	if (!response.ok) {
		throw new Error('Failed to fetch countries')
	}
	return response.json()
}

async function fetchCountriesByRegion(region: string): Promise<Country[]> {
	const response = await fetch(
		`${BASE_URL}/region/${region}?fields=cca3,name,capital,population,area,region,subregion,flags,languages,currencies`,
	)
	if (!response.ok) {
		throw new Error('Failed to fetch countries by region')
	}
	return response.json()
}

async function searchCountries(query: string): Promise<Country[]> {
	const response = await fetch(
		`${BASE_URL}/name/${query}?fields=cca3,name,capital,population,area,region,subregion,flags,languages,currencies`,
	)
	if (!response.ok) {
		if (response.status === 404) {
			return []
		}
		throw new Error('Failed to search countries')
	}
	return response.json()
}

export function useAllCountries() {
	return useQuery({
		queryKey: ['countries', 'all'],
		queryFn: fetchAllCountries,
		staleTime: 1000 * 60 * 60, // 1 hour
	})
}

export function useCountriesByRegion(region: string) {
	return useQuery({
		queryKey: ['countries', 'region', region],
		queryFn: () => fetchCountriesByRegion(region),
		enabled: !!region,
		staleTime: 1000 * 60 * 60,
	})
}

export function useSearchCountries(query: string) {
	return useQuery({
		queryKey: ['countries', 'search', query],
		queryFn: () => searchCountries(query),
		enabled: query.length >= 2,
		staleTime: 1000 * 60 * 5, // 5 minutes
	})
}

export function useCountryByCode(code: string) {
	return useQuery({
		queryKey: ['country', code],
		queryFn: async () => {
			const response = await fetch(
				`${BASE_URL}/alpha/${code}?fields=cca3,name,capital,population,area,region,subregion,flags,languages,currencies`,
			)
			if (!response.ok) {
				throw new Error('Failed to fetch country')
			}
			return response.json() as Promise<Country>
		},
		enabled: !!code,
		staleTime: 1000 * 60 * 60,
	})
}

export function useCountriesByCodes(codes: string[]) {
	return useQuery({
		queryKey: ['countries', 'codes', codes],
		queryFn: async () => {
			if (codes.length === 0) return []
			const response = await fetch(
				`${BASE_URL}/alpha?codes=${codes.join(',')}&fields=cca3,name,capital,population,area,region,subregion,flags,languages,currencies`,
			)
			if (!response.ok) {
				throw new Error('Failed to fetch countries by codes')
			}
			return response.json() as Promise<Country[]>
		},
		enabled: codes.length > 0,
		staleTime: 1000 * 60 * 60,
	})
}

// Formatting utilities
export function formatPopulation(population: number): string {
	if (population >= 1_000_000_000) {
		return `${(population / 1_000_000_000).toFixed(2)}B`
	}
	if (population >= 1_000_000) {
		return `${(population / 1_000_000).toFixed(2)}M`
	}
	if (population >= 1_000) {
		return `${(population / 1_000).toFixed(1)}K`
	}
	return population.toString()
}

export function formatArea(area: number): string {
	if (area >= 1_000_000) {
		return `${(area / 1_000_000).toFixed(2)}M km²`
	}
	if (area >= 1_000) {
		return `${(area / 1_000).toFixed(1)}K km²`
	}
	return `${area.toFixed(0)} km²`
}

export function formatDensity(population: number, area: number): string {
	if (area === 0) return 'N/A'
	const density = population / area
	return `${density.toFixed(1)}/km²`
}

export function getLanguagesString(languages?: Record<string, string>): string {
	if (!languages) return 'N/A'
	return Object.values(languages).slice(0, 3).join(', ')
}

export function getCurrenciesString(
	currencies?: Record<string, { name: string; symbol: string }>,
): string {
	if (!currencies) return 'N/A'
	return Object.values(currencies)
		.map((c) => `${c.name} (${c.symbol})`)
		.slice(0, 2)
		.join(', ')
}
