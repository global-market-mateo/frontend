import axios from 'axios'

export const Api = axios.create({
	baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`
})

// Interceptor para agregar automáticamente el bearer token
Api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

// Interceptor para manejar errores de autenticación
Api.interceptors.response.use(
	(response) => response,
	(error) => {
		console.log(error)
		// Solo redirige si no estamos en una página de autenticación
		if (error.response?.status === 401 && typeof window !== 'undefined') {
			const currentPath = window.location.pathname
			const isAuthPage = currentPath === '/login' || currentPath === '/register'

			// Limpiar token inválido
			localStorage.removeItem('token')

			if (!isAuthPage) {
				// Redirigir directamente a login
				window.location.replace('/login')
			}
		}
		return Promise.reject(error)
	}
)

// export const getBearerToken = () => {
// 	const token = localStorage.getItem('token')
// 	return token ? `Bearer ${token}` : null
// }
