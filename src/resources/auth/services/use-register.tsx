'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Api } from '../../../utils/api'

export const registerFn = async (loginData: { name: string; password: string; email: string; businessName: string }) => {
	return (await Api.post('/auth/register', loginData)).data
}

export const useRegister = () => {
	const router = useRouter()
	return useMutation({
		mutationFn: registerFn,
		onSuccess: () => {
			router.push('/login')
		},
		onError: (error) => {
			console.error('Error durante el login:', error || error.message)
			return { message: 'No autorizado', status: 401 }
		}
	})
}
