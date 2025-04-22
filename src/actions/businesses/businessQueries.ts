import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getBusinessByIdFn, getBusinessFn, getCategriesBusinessFn, getPublicProductsBusinessFn, getPublicProductsBusinessFnInterface, updateBusinessFn } from './businessService'
import { UUID } from 'crypto'
import { toast } from '@/hooks/use-toast'
export const BusinessesKey = 'businesses'

export interface Business {
	id: string
	name: string
	ownerId: string
	paymentMethods: string[]
	deliveryMethods: string[]
	wppNumber: string | null
}

export const useBusinesses = () =>
	useQuery({
		queryKey: [BusinessesKey],
		queryFn: getBusinessFn
	})

export const useGetBusinessById = (businessId: UUID) =>
	useQuery({
		queryKey: [businessId, BusinessesKey],
		queryFn: () => getBusinessByIdFn(businessId)
	})

export const useCategoriesBusiness = (businessName: string) =>
	useQuery({
		queryKey: [businessName, 'categories'],
		queryFn: () => getCategriesBusinessFn(businessName)
	})

export const useGetPublicProductsBusiness = ({ businessName, category, brand, limit, page, tipo }: getPublicProductsBusinessFnInterface) =>
	useQuery({
		queryKey: ['products', businessName, category, brand, limit, page, tipo],
		queryFn: () => getPublicProductsBusinessFn({ businessName, category }),
		staleTime: 60 * 60 * 1000 // 1 hs
	})

export const useUpdateBusiness = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: updateBusinessFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [BusinessesKey] })
			toast({
				title: 'Negocio actualizado correctamente',
				description: 'Los cambios se han guardado correctamente'
			})
		},
		onError: () => {
			toast({
				title: 'Error al actualizar el negocio',
				description: 'Por favor, inténtelo de nuevo'
			})
		}
	})
}
