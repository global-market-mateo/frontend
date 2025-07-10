import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBusinessProductsFn, deleteBusinessProductsFn, updateBusinessProductsFn } from './business-products-service'
import { useToast } from '@/resources/shared/hooks/use-toast'
export const BusinessProductskey = ['BusinessProducts']

// Helper function for mutation success
const handleMutationSuccess = (queryClient, toast, message) => {
	toast({ title: message, duration: 4000 })
	queryClient.invalidateQueries({ queryKey: BusinessProductskey })
}

export const useCreateBusinessProduct = () => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	return useMutation({
		mutationKey: BusinessProductskey,
		mutationFn: createBusinessProductsFn,
		onSuccess: () => handleMutationSuccess(queryClient, toast, 'Producto creado')
	})
}

export const useDeleteBusinessProduct = () => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	return useMutation({
		mutationKey: BusinessProductskey,
		mutationFn: deleteBusinessProductsFn,
		onSuccess: () => handleMutationSuccess(queryClient, toast, 'Producto eliminado')
	})
}

export const useUpdateBusinessProduct = () => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	return useMutation({
		mutationKey: BusinessProductskey,
		mutationFn: updateBusinessProductsFn,
		onSuccess: () => handleMutationSuccess(queryClient, toast, 'Producto actualizado')
	})
}
