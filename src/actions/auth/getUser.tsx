import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Api } from '../Api'
import { Business } from '../businesses/businessQueries'

interface User {
	id: string
	name: string
	email: string
	businesses: Business[]
	role: 'USER' | 'ADMIN' | 'ROOT'
}

export const getUserFn = async () => {
	const token = localStorage.getItem('token')
	const bererToken = `Bearer ${token}`
	return (await Api.get('/user', { headers: { Authorization: bererToken } })).data as User
}

export const useGetUser = () => {
	return useQuery({
		queryKey: ['user'],
		queryFn: getUserFn
	})
}
