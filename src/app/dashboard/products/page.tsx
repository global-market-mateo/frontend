'use client'

import { ContentLayout } from '@/components/admin-panel/content-layout'
import { columns } from '@/components/products/table/columns'
import { DataTable } from '@/components/products/table/data-table'

export default function ProductsPage() {
	return (
		<ContentLayout title="Productos">
			<DataTable columns={columns} />
		</ContentLayout>
	)
}
