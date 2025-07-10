'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Loading } from '@/resources/shared/components/loading'
import { useIsAuthenticated } from '@/resources/auth/hooks/use-auth'

export default function PrivateRoute({ children }) {
	const [loading, setLoading] = useState(true)
	const router = useRouter()
	const pathname = usePathname()
	const isAuthenticated = useIsAuthenticated()

	useEffect(() => {
		// Si estamos en el dashboard y no hay token, redirigir a login
		if (pathname === '/dashboard' && !isAuthenticated) {
			router.push('/login')
			return
		}

		setLoading(false)
	}, [pathname, router, isAuthenticated])

	if (loading) {
		return <Loading />
	}

	return children
}
