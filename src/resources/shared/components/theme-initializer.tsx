'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeInitializer() {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	useEffect(() => {
		if (mounted && !theme) {
			setTheme('system')
		}
	}, [mounted, theme, setTheme])

	return null
}
