'use client'

import { useEffect, useState } from 'react'
import { useCartStore } from '@/stores/useCartStore'
import { Button } from '@/components/ui/button'
import { useStore } from '@/hooks/use-store'

interface Props {
	id: string
}

export const Quantity = ({ id }: Props) => {
	const [quantity, setQuantity] = useState<number>(0)
	const cart = useStore(useCartStore, (state) => state.cart)
	const updateCart = useCartStore((state) => state.updateCart)

	useEffect(() => {
		const item = cart?.find((item) => item.id === id)
		if (item) {
			setQuantity(item.quantity!)
		}
	}, [cart, id])

	const incrementQuantity = () => {
		const newQuantity = quantity + 1
		setQuantity(newQuantity)
		updateCart(id, newQuantity) // Actualiza el carrito globalmente
	}

	const decrementQuantity = () => {
		if (quantity > 0) {
			const newQuantity = quantity - 1
			setQuantity(newQuantity)
			updateCart(id, newQuantity) // Actualiza el carrito globalmente
		}
	}

	return (
		<div className="flex gap-4 items-center">
			<Button onClick={decrementQuantity} disabled={quantity === 1 ? true : false} className={`rounded-full bg-gray-400 p-4 `}>
				-
			</Button>
			{quantity}
			<Button onClick={incrementQuantity} className="rounded-full bg-gray-400 p-4">
				+
			</Button>
		</div>
	)
}
