'use client'

import { ProductsGrid } from '@/resources/products/components/products-grid'

interface Prop {
	params: {
		category: string
		businessName: string
	}
}
export default function CategoryPage({ params }: Prop) {
	return <ProductsGrid businessName={params.businessName} category={params.category} className="grid grid-cols-dynamic-150 md:grid-cols-dynamic-200 gap-1 md:gap-4 " />
}
