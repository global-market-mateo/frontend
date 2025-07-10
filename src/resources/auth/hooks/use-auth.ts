import { useLogin } from '../services/use-login'
import { useRegister } from '../services/use-register'
import { useGetUser } from '../services/get-user'

export const useAuth = () => {
	const { mutate: login, isError: loginError, isSuccess: loginSuccess } = useLogin()
	const { mutate: register, isError: registerError, isSuccess: registerSuccess } = useRegister()

	return { login, register, loginError, registerError, loginSuccess, registerSuccess }
}

// Hook para obtener información del usuario cuando sea necesario
export const useUser = (enabled = true) => {
	return useGetUser(enabled)
}

// Hook para verificar si el usuario está autenticado
export const useIsAuthenticated = () => {
	const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
	return !!token
}
