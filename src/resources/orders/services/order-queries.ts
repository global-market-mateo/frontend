import { useQuery } from '@tanstack/react-query'
import { orderKey } from './order-mutations'
import { getOrderByIdFn, getOrdersFn } from './order-service'

export const useGetOrders = () =>
	useQuery({
		queryKey: orderKey,
		queryFn: getOrdersFn,
		gcTime: 1000000
	})

export const useGetOrderByid = ({ id }: { id: string }) =>
	useQuery({
		queryKey: [orderKey, id],
		queryFn: () => getOrderByIdFn({ id }),
		gcTime: 1000000
	})
