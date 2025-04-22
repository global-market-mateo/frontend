import { useQuery } from '@tanstack/react-query'
import { Api } from '../Api'
import { UUID } from 'crypto'
const key = 'generalProducts'

export interface GeneralProduct {
	id: UUID
	tipo: string
	description: string
	brand: string
	amount: string
	url: string
}

interface Meta {
	total: number
	page: number
	totalPage: number
}

interface ProductResponse {
	data: GeneralProduct[]
	meta: Meta
}

export interface PaginationDto {
	page?: number
	limit?: number
	tipo?: string
	brand?: string
}
export const searchGeneralProductFn = async () => {
	const token = localStorage.getItem('token')
	const bererToken = `Bearer ${token}`
	return (
		await Api.get('/products/all', {
			headers: { Authorization: bererToken }
		})
	).data as ProductResponse
}

export const useSearchGeneralProduct = () => {
	return useQuery({
		queryKey: [key],
		queryFn: () => searchGeneralProductFn()
	})
}
