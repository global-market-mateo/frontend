'use client'

export const redirectToLogin = () => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('token')
		window.location.replace('/login')
	}
}
