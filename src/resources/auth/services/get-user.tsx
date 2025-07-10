import { useQuery } from '@tanstack/react-query'
import { Api } from '../../../utils/api'
import { Business } from '../../business/services/business-queries'

interface User {
	id: string
	name: string
	email: string
	businesses: Business[]
	role: 'USER' | 'ADMIN' | 'ROOT'
}

export const getUserFn = async () => {
	const token = localStorage.getItem('token')
	if (!token) {
		throw new Error('No token available')
	}
	const response = await Api.get('/user', {
		headers: { Authorization: `Bearer ${token}` }
	})
	return response.data as User
}

export const useGetUser = (enabled = true) => {
	const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

	return useQuery({
		queryKey: ['user'],
		queryFn: getUserFn,
		enabled: enabled && !!token, // Solo se ejecuta si está habilitado y hay token
		retry: false, // No reintenta si falla
		staleTime: 5 * 60 * 1000 // 5 minutos
	})
}
