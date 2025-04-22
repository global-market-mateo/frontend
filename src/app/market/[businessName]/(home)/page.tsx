'use client'

import { useCategoriesBusiness } from '@/actions/businesses/businessQueries'
import { ProductsCarrousel } from '../(components)/product/ProductsCarrousel'

export default function BusinessPage({ params }: { params: { businessName: string } }) {
	const { data: categories } = useCategoriesBusiness(params.businessName)
	return (
		<div className="flex flex-col items-center justify-center w-full gap-10 pt-10">
			{categories?.map(({ name }) => (
				<ProductsCarrousel businessName={params.businessName} key={name} category={name} />
			))}
		</div>
	)
}
