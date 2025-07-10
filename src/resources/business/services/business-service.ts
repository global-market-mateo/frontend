import { Api } from '../../../utils/api'
import { Business } from './business-queries'
import { BusinessProductResponse } from './businessProducts/business-products-service'

interface BusinessResponse {
	id: string
	name: string
	ownerId: string
	wppNumber: string
	paymentMethods: string[]
	deliveryMethods: string[]
}
export interface getPublicProductsBusinessFnInterface {
	businessName: string
	category?: string
	limit?: number
	page?: number
	brand?: string
	tipo?: string
}

export const getBusinessFn = async (): Promise<BusinessResponse[]> => {
	const response = await Api.get('/businesses')
	return response.data
}

export const getBusinessByNameFn = async (businessName: string): Promise<BusinessResponse> => {
	if (!businessName) {
		throw new Error('Business name is required')
	}
	const response = await Api.get(`/businesses/${businessName}`)
	return response.data
}

export const getCategriesBusinessFn = async (businessName: string): Promise<{ name: string; id: string }[]> => {
	if (!businessName) {
		throw new Error('Business name is required')
	}
	const response = await Api.get(`/businesses/${businessName}/categories`)
	return response.data
}

export const getPublicProductsBusinessFn = async ({ businessName, category }: getPublicProductsBusinessFnInterface): Promise<BusinessProductResponse> => {
	if (!businessName) {
		throw new Error('Business name is required')
	}
	const response = await Api.get(`/businesses/${businessName}/products/${category ? category : ''}`)
	return response.data
}

interface BusinessDto {
	id: string
	paymentMethods?: string[]
	deliveryMethods?: string[]
	wppNumber?: string
}

export const updateBusinessFn = async (business: BusinessDto) => {
	const token = localStorage.getItem('token')
	const bererToken = `Bearer ${token}`
	return (
		await Api.patch(
			`/businesses/${business.id}`,
			{
				paymentMethods: business.paymentMethods,
				deliveryMethods: business.deliveryMethods,
				wppNumber: business.wppNumber
			},
			{ headers: { Authorization: bererToken } }
		)
	).data as Business
}
