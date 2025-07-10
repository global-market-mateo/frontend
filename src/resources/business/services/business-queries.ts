import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getBusinessByNameFn, getBusinessFn, getCategriesBusinessFn, getPublicProductsBusinessFn, getPublicProductsBusinessFnInterface, updateBusinessFn } from './business-service'
import { toast } from '@/resources/shared/hooks/use-toast'
export const BusinessesKey = 'businesses'
export const BusinessLocationKey = 'businessLocation'
export interface Business {
	id: string
	name: string
	ownerId: string
	paymentMethods: string[]
	deliveryMethods: string[]
	wppNumber: string | null
	location: {
		country: string
		city: string
		street: string
		number: string
		department: string | null
		postalCode: string
		district: string | null
	}
}

export const useBusinesses = () =>
	useQuery({
		queryKey: [BusinessesKey],
		queryFn: getBusinessFn
	})

export const useGetBusinessByName = (businessName: string) =>
	useQuery({
		queryKey: [businessName, BusinessesKey],
		queryFn: () => getBusinessByNameFn(businessName)
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
