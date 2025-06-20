'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Api } from '@/actions/Api'
import { Loading } from '@/components/Loading'

export default function PrivateRoute({ children }) {
	const [loading, setLoading] = useState(true)
	const router = useRouter()
	const pathname = usePathname()

	const getToken = async (token: string) => {
		try {
			const res = await Api.get('/auth/token', {
				headers: { Authorization: `Bearer ${token}` }
			})
			return res.status === 200
		} catch (err) {
			return false
		}
	}

	useEffect(() => {
		const verifyToken = async () => {
			const token = localStorage.getItem('token')

			if (pathname === '/dashboard') {
				const isValid = token ? await getToken(token) : false

				if (!isValid) {
					router.push('/login')
					return
				}
			}

			setLoading(false)
		}

		verifyToken()
	}, [pathname, router])

	if (loading) {
		return <Loading />
	}

	return children
}
