import { Product } from '@/components/products/ProductForm'
import { Order } from './OrderForm'
interface Props {
	infoOrder: Order
	cart: Product[]
	totalPrice: number
	IdOrder: string
	businessName: string
}
export const sendMessage = ({ IdOrder, cart, infoOrder, totalPrice, businessName }: Props) => {
	const { address, delivery_method, floor, name, pay_method, references } = infoOrder

	const urlBase = window.location.origin

	const message = `Hola! %0AMi nombre es ${name} %0AVoy a pagar con ${pay_method} %0A${
		delivery_method === 'envio' ? `Necesito que me lo envien %0A Mi direccion es ${address}, ${floor}, ${references && references}` : `Lo retiro por ${delivery_method} %0AMi pedido: %0A`
	}${cart.map(({ quantity, tipo, description, brand, amount, price }) => `${quantity} ${tipo} ${description} ${brand} ${amount} - ${price}`).join('%0A')}%0ATotal : $${totalPrice}
    %0ALink del pedido: ${urlBase}/market/${businessName}/pedido/${IdOrder}`
	window.open(`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WPP_NUMBER}&text=${message}`, '_blank')
}
