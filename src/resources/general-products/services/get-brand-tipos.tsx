import { useQuery } from '@tanstack/react-query'
import { Api } from '@/utils/api'
const key = ['brand', 'tipo']

export const getTypesBrandsFn = async () => {
	const token = localStorage.getItem('token')
	const bererToken = `Bearer ${token}`
	return (
		await Api.get('/products/types-brands', {
			headers: { Authorization: bererToken }
		})
	).data as { brands: string[]; tipos: string[] }
}

export const useGetTypesBrands = () =>
	useQuery({
		queryKey: key,
		queryFn: () => getTypesBrandsFn()
	})
