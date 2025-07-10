import { Api } from '@/utils/api'

export interface BusinessProduct {
	id: string
	businessId: string
	price: number
	tipo: string
	description: string
	brand: string
	amount: string
	url: string
	stock: boolean
	categoryId: string
	category: {
		id: string
		name: string
	}
}

interface Meta {
	total: number
	page: number
	totalPage: number
}

export interface BusinessProductResponse {
	data: BusinessProduct[]
	meta: Meta
}

interface CreateBusinessDto {
	amount?: string
	brand?: string
	description?: string
	tipo?: string
	url?: string
	categoryId?: string
	price?: string
	stock?: boolean
}

interface UpdateBusinessDto extends CreateBusinessDto {
	id: string
}

// Get business products
export const getBusinessProductsFn = async (): Promise<BusinessProductResponse> => {
	const response = await Api.get('/businesses/products/all')
	return response.data
}

// Create business product
export const createBusinessProductsFn = async (dto: CreateBusinessDto) => {
	const response = await Api.post('/businesses/products', dto)
	return response.data
}

// Delete business product
export const deleteBusinessProductsFn = async (id: string) => {
	const response = await Api.delete(`/businesses/products/${id}`)
	return response.data
}

// Update business product
export const updateBusinessProductsFn = async (dto: UpdateBusinessDto) => {
	const { id, ...rest } = dto
	const response = await Api.patch(`/businesses/products/${id}`, rest)
	return response.data
}

export const SearchBusinessProductsFn = async (search: string) => {
	const response = await Api.get(`/businesses/products/search?filter=${search}`)
	return response.data as BusinessProduct[]
}
