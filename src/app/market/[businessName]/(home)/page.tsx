'use client'

import { useCategoriesBusiness } from '@/resources/business/services/business-queries'
import { ProductsCarrousel } from '@/resources/products/components/products-carrousel'

export default function BusinessPage({ params }: { params: { businessName: string } }) {
	const { data: categories } = useCategoriesBusiness(params.businessName)

	if (!categories) {
		return null
	}

	return (
		<div className="flex flex-col items-center justify-center w-full gap-10 pt-10">
			{categories.map(({ name }) => (
				<ProductsCarrousel businessName={params.businessName} key={name} category={name} />
			))}
		</div>
	)
}
