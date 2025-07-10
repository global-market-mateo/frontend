import { useQuery } from '@tanstack/react-query'
import { getCategoriesFn } from './category-service'
export const categoryKey = ['Category']

export const useCategories = (enabled = true) =>
	useQuery({
		queryKey: categoryKey,
		queryFn: getCategoriesFn,
		gcTime: 1000000,
		enabled: enabled
	})
