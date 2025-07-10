import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createBusinessLocationFn, updateBusinessLocationFn } from './business-locations-service'
import { BusinessLocationKey } from '../business-queries'
import { useToast } from '@/resources/shared/hooks/use-toast'
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
