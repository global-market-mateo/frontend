import { useUpdateOrder } from '@/resources/orders/orderMutations'
import { Order } from '@/resources/orders/orderService'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

export const RemoveProductOrder = ({ orderId, order, productOrderId }: { orderId: string; order: Order; productOrderId: string }) => {
	const { mutate } = useUpdateOrder(orderId)

	const removeProductOrder = () => {
		mutate({
			id: orderId,
			orderDto: {
				products: order.products.filter((product) => product.id !== productOrderId)
			}
		})
	}
	return (
		<Button onClick={removeProductOrder} className="bg-red-800">
			<Trash2 />
		</Button>
	)
}
