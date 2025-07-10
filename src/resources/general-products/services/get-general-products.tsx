import { useQuery } from '@tanstack/react-query'
import { Api } from '@/utils/api'
import { UUID } from 'crypto'
const key = 'generalProducts'

export interface GeneralProduct {
	id?: UUID
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
	search?: string
}
export const getProductsFn = async ({ page, limit, brand, tipo, search }: PaginationDto) => {
	const token = localStorage.getItem('token')
	const bererToken = `Bearer ${token}`
	return (
		await Api.get('/products/all', {
			headers: { Authorization: bererToken },
			params: {
				page,
				limit,
				brand,
				tipo,
				search
			}
		})
	).data as ProductResponse
}

export const useGetGeneralProducts = (paginationDto: PaginationDto) => {
	const { page, brand, tipo, search } = paginationDto
	return useQuery({
		queryKey: [key, page, brand, tipo, search],
		queryFn: () => getProductsFn(paginationDto)
	})
}
