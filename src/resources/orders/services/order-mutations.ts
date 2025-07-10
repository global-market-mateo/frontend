import { useToast } from '@/resources/shared/hooks/use-toast'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import { createOrderFn, updateOrderFn } from './order-service'
export const orderKey = ['Order']
const handleSuccess = (queryClient: QueryClient, toast, message: string, id?: string) => {
	toast({ title: message, duration: 4000 })
	queryClient.invalidateQueries({ queryKey: id ? [orderKey, id] : orderKey })
}

export const useCreateOrder = () => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	return useMutation({
		mutationKey: orderKey,
		mutationFn: createOrderFn,
		onSuccess: () => handleSuccess(queryClient, toast, 'Orden creada')
	})
}

export const useUpdateOrder = (id: string) => {
	const queryClient = useQueryClient()
	const { toast } = useToast()

	return useMutation({
		mutationKey: [orderKey, id],
		mutationFn: updateOrderFn,
		onSuccess: () => handleSuccess(queryClient, toast, 'Orden actualizada', id)
	})
}
