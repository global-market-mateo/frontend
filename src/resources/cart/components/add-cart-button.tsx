'use client'
import { Product } from '@/resources/general-products/components/product-form'
import { Button } from '@/resources/shared/ui/button'
import { useToast } from '@/resources/shared/hooks/use-toast'
import { useCartStore } from '@/resources/cart/store/cart-store'
import { useState } from 'react'

export const AddCartButton = ({ product }: { product: Product }) => {
	const [quantity, setQuantity] = useState<number>(1)
	const addToCart = useCartStore((state) => state.addToCart)
	const { toast } = useToast()

	const add = () => {
		addToCart({ ...product, quantity })
		toast({
			title: 'Agregado',
			// variant: "aggregate",
			duration: 500
		})
	}
	const incrementQuantity = () => {
		const newQuantity = quantity + 1
		setQuantity(newQuantity)
	}

	const decrementQuantity = () => {
		if (quantity > 0) {
			const newQuantity = quantity - 1
			setQuantity(newQuantity)
		}
	}
	return (
		<>
			<div className="flex gap-4 items-center">
				<Button onClick={decrementQuantity} className="rounded-full bg-gray-400 p-4">
					-
				</Button>
				{quantity}
				<Button onClick={incrementQuantity} className="rounded-full bg-gray-400 p-4">
					+
				</Button>
			</div>
			<Button className={'bg-secondary'} onClick={() => add()}>
				Agregar
			</Button>
		</>
	)
}
