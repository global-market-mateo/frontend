import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBusinessLocationFn, updateBusinessLocationFn } from './businessLocationsService'
import { BusinessLocationKey } from '../businessQueries'
import { useToast } from '@/hooks/use-toast'
export const useCreateBusinessLocation = () => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: createBusinessLocationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [BusinessLocationKey] })
			toast({
				title: 'Ubicación creada correctamente'
			})
		}
	})
}

export const useUpdateBusinessLocation = () => {
	const { toast } = useToast()
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: updateBusinessLocationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [BusinessLocationKey] })
			toast({
				title: 'Ubicación actualizada correctamente'
			})
		}
	})
}
