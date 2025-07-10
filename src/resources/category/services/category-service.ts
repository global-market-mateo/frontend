import { Api } from '@/utils/api'
import { UUID } from 'crypto'

export interface Category {
	id: UUID
	name: string
}

export const getCategoriesFn = async (): Promise<Category[]> => {
	const response = await Api.get('/businesses/category/all')
	return response.data
}

export const createCategoryFn = async (name: string) => {
	console.log('🔐 Llamando a crear categoría')
	const response = await Api.post('/businesses/category', { name })
	return response.data
}

export const deleteCategoryFn = async ({ id }: { id: UUID }) => {
	const response = await Api.delete(`/businesses/category/${id}`)
	return response.data
}

export const updateCategoryFn = async ({ id, name }: { id: UUID; name: string }) => {
	const response = await Api.patch(`/businesses/category/${id}`, { name })
	return response.data
}
