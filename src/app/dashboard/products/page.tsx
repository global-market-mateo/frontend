'use client'

import { ContentLayout } from '@/resources/admin-panel/content-layout'
import { columns } from '@/resources/general-products/components/table/columns'
import { DataTable } from '@/resources/general-products/components/table/data-table'

export default function ProductsPage() {
	return (
		<ContentLayout title="Productos">
			<DataTable columns={columns} />
		</ContentLayout>
	)
}
