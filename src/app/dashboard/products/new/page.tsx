'use client'

import { ContentLayout } from '@/components/admin-panel/content-layout'
import { ProductForm } from '@/components/products/ProductForm'

export default function NewProductPage() {
	return (
		<ContentLayout title="Nuevo producto">
			<ProductForm className="w-3/5 " />
		</ContentLayout>
	)
}
