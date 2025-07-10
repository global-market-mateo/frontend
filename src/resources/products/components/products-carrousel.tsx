'use client'
import Link from 'next/link'
import { ProductItem } from './product-item'
import { Title } from '@/resources/shared/components/title'
import { useGetPublicProductsBusiness } from '@/resources/business/services/business-queries'
import { Button } from '@/resources/shared/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/resources/shared/ui/carousel'

interface Prop {
	category: string
	limit?: number
	className?: string
	businessName: string
}

export const ProductsCarrousel = ({ category, businessName }: Prop) => {
	const { data: products } = useGetPublicProductsBusiness({
		businessName,
		category
	})

	if (!products?.data || products.data.length === 0) {
		return null
	}

	return (
		<div className="w-4/5 flex flex-col gap-5">
			<div className="border-t-2 border-black pt-4  flex justify-between ">
				<Title>Productos {category.replace(/_/g, ' ')}</Title>
				<Link href={`/market/${businessName}/${category}`}>
					<Button>Ver todo</Button>
				</Link>
			</div>
			<Carousel className="w-full ">
				<CarouselContent className="-ml-1">
					{products.data.map((product) => (
						<CarouselItem key={product.id} className="pl-1 basis-4/7 ">
							<ProductItem {...product} />
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
		</div>
	)
}
