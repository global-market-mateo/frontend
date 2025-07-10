import { useQuery } from '@tanstack/react-query'
import { getBusinessProductsFn, SearchBusinessProductsFn } from './business-products-service'
import { BusinessProductskey } from './business-products-mutations'

export const useBusinessProducts = () =>
	useQuery({
		queryKey: BusinessProductskey,
		queryFn: getBusinessProductsFn
	})

export const useSearchBusinessProducts = (search: string) =>
	useQuery({
		queryKey: [BusinessProductskey, search],
		queryFn: () => SearchBusinessProductsFn(search)
	})
