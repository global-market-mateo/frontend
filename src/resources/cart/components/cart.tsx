'use client'
import { useCartStore } from '@/resources/cart/store/cart-store'
import CartItem from './cart-item'

import { useStore } from '@/resources/shared/hooks/use-store'

interface Prop {
	className?: string
}

export const Cart = ({ className }: Prop) => {
	const cart = useStore(useCartStore, (state) => state.cart)
	const totalPrice = useStore(useCartStore, (state) => state.totalPrice)

	return (
		<section className={` p-6 ${className}`}>
			<h3 className="text-2xl font-bold mb-4">Carrito</h3>
			{totalPrice && (
				<>
					<ul className="flex flex-col gap-2">
						{cart?.map((product) => (
							<CartItem key={product.id} product={product} />
						))}
					</ul>
					<div className="flex justify-end items-center gap-10 mt-4 pr-10">
						<span className="text-lg font-bold">Sub-Total:</span>
						<span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
					</div>
				</>
			)}
		</section>
	)
}
