import { useQuery } from '@tanstack/react-query'
import { getBusinessLocationFn } from './business-locations-service'

export const BusinessLocationKey = 'businessLocation'

export const useGetBusinessLocation = () => {
	return useQuery({
		queryKey: [BusinessLocationKey],
		queryFn: () => getBusinessLocationFn()
	})
}
