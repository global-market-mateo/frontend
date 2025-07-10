import { Product } from '@/resources/general-products/components/product-form'
import { Api } from '@/utils/api'

interface ProductOrder {
	id: string
	quantity: number
	name: string
	price: number
}

interface BuyerInfo {
	name: string
	delivery_method: string
	address?: string
	pay_method: string
}
export interface Order {
	id: string
	buyerInfo: BuyerInfo
	products: ProductOrder[]
	total: number
	isApproved: boolean
	nameBusines: string
	createdAt: Date
}

export const getOrdersFn = async (): Promise<Order[]> => {
	const response = await Api.get('/businesses/order/all')
	return response.data
}

export const getOrderByIdFn = async ({ id }: { id: string }): Promise<Order> => {
	const response = await Api.get(`/businesses/order/${id}`)
	return response.data
}

interface createOrderProps {
	orderDto: {
		buyerInfo: BuyerInfo
		products: Product[]
		businessName: string
	}
}
export const createOrderFn = async ({
	orderDto
}: createOrderProps): Promise<{
	status: number
	message: string
	id: string
}> => {
	try {
		const response = await Api.post('/businesses/order', orderDto)
		return response.data
	} catch (error) {
		console.log(error)
	}
}

interface updateOrderProps {
	id: string
	orderDto: {
		products?: ProductOrder[]
		isApproved?: boolean
	}
}
export const updateOrderFn = async ({ id, orderDto }: updateOrderProps) => {
	try {
		const response = await Api.patch(`/businesses/order/${id}`, orderDto)
		return response.data
	} catch (error) {
		console.log(error)
	}
}
