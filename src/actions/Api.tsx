import axios from 'axios'
import { redirectToLogin } from '@/utils/redirect'

export const Api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`
})

// Interceptor para manejar errores de autenticación
Api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			redirectToLogin()
		}
		return Promise.reject(error)
	}
)
