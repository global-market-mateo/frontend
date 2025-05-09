import { Api } from '@/actions/Api'
import { UUID } from 'crypto'

export type BusinessLocation = {
	id: UUID
	country: string
	city: string
	street: string
	number: string
	department: string | null
	postalCode: string
	district: string | null
	location: string
}

export interface BusinessLocationDto {
	country: string
	city: string
	street: string
	number: string
	department: string | null
	postalCode: string
	district: string | null
}

export const createBusinessLocationFn = async (location: BusinessLocationDto) => {
	const token = localStorage.getItem('token')
	const bererToken = `Bearer ${token}`
	return (await Api.post(`/businesses/location`, location, { headers: { Authorization: bererToken } })).data
}

export const updateBusinessLocationFn = async ({ location, id }: { location: BusinessLocationDto; id: UUID }) => {
	const token = localStorage.getItem('token')
	const bererToken = `Bearer ${token}`
	return (await Api.patch(`/businesses/location/${id}`, location, { headers: { Authorization: bererToken } })).data
}

export const getBusinessLocationFn = async () => {
	const token = localStorage.getItem('token')
	const bererToken = `Bearer ${token}`
	return (await Api.get(`/businesses/location/all`, { headers: { Authorization: bererToken } })).data as BusinessLocation[]
}
