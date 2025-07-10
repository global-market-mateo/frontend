import { Product } from '@/resources/general-products/components/product-form'
import { Order } from './order-form'
import { useGetBusinessByName } from '@/resources/business/services/business-queries'

interface Props {
	infoOrder: Order
	cart: Product[]
	totalPrice: number
	IdOrder: string
	businessName: string
}

export const useSendMessage = ({ IdOrder, cart, infoOrder, totalPrice, businessName }: Props) => {
	const { data } = useGetBusinessByName(businessName)

	const sendMessage = () => {
		if (!data?.wppNumber) return

		const { address, delivery_method, floor, name, pay_method, references } = infoOrder
		const urlBase = window.location.origin

		const message = `Hola! %0AMi nombre es ${name} %0AVoy a pagar con ${pay_method} %0A${
			delivery_method === 'envio' ? `Necesito que me lo envien %0A Mi direccion es ${address}, ${floor}, ${references && references}` : `Lo retiro por ${delivery_method} %0AMi pedido: %0A`
		}${cart.map(({ quantity, tipo, description, brand, amount, price }) => `${quantity} ${tipo} ${description} ${brand} ${amount} - ${price}`).join('%0A')}%0ATotal : $${totalPrice}
		%0ALink del pedido: ${urlBase}/market/${businessName}/pedido/${IdOrder}`

		window.open(`https://api.whatsapp.com/send?phone=${data.wppNumber}&text=${message}`, '_blank')
	}

	return { sendMessage }
}
