'use client'

import { ContentLayout } from '@/resources/admin-panel/content-layout'
import { ProductForm } from '@/resources/general-products/components/product-form'

export default function NewProductPage() {
	return (
		<ContentLayout title="Nuevo producto">
			<ProductForm className="w-3/5 " />
		</ContentLayout>
	)
}
