'use client'
import { useMutation } from '@tanstack/react-query'
import { Api } from '../../../utils/api'

export const loginFn = async (loginData: { password: string; email: string }) => {
	return (await Api.post('/auth/login', loginData)).data
}

export const useLogin = () => {
	return useMutation({
		mutationFn: loginFn,
		onSuccess: (data) => {
			if (typeof window !== 'undefined') {
				localStorage.setItem('token', data.token)
				window.location.href = '/dashboard'
			}
		},
		onError: (error) => {
			console.error('Error durante el login:', error || error.message)
			return { message: 'No autorizado', status: 401 }
		}
	})
}
