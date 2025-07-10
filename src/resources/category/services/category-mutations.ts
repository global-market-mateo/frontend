import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { createCategoryFn, deleteCategoryFn, updateCategoryFn } from './category-service'
import { useToast } from '@/resources/shared/hooks/use-toast'
import { categoryKey } from './category-queries'

// Helper function to handle common success case
const handleSuccess = (queryClient: QueryClient, toast, message: string) => {
	toast({ title: message, duration: 4000 })
	queryClient.invalidateQueries({ queryKey: categoryKey })
}

export const useCreateCategory = () => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	return useMutation({
		mutationKey: categoryKey,
		mutationFn: createCategoryFn,
		onSuccess: () => handleSuccess(queryClient, toast, 'Categoría creada')
	})
}

export const useDeleteCategory = () => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	return useMutation({
		mutationKey: categoryKey,
		mutationFn: deleteCategoryFn,
		onSuccess: () => handleSuccess(queryClient, toast, 'Categoría eliminada')
	})
}

export const useUpdateCategory = () => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	return useMutation({
		mutationKey: categoryKey,
		mutationFn: updateCategoryFn,
		onSuccess: () => handleSuccess(queryClient, toast, 'Categoría editada')
	})
}
