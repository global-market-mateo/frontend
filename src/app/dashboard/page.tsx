'use client'

import { ContentLayout } from '@/components/admin-panel/content-layout'
import { DataTable } from '@/components/products/table/data-table'
import { columns } from '@/components/products/table/columns'

export default function DashboardPage() {
	return (
		<ContentLayout title="Dashboard">
			<DataTable columns={columns} />
		</ContentLayout>
	)
}
