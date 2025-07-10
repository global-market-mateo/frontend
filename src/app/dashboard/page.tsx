'use client'

import { ContentLayout } from '@/resources/admin-panel/content-layout'
import { DataTable } from '@/resources/general-products/components/table/data-table'
import { columns } from '@/resources/general-products/components/table/columns'

export default function DashboardPage() {
	return (
		<ContentLayout title="Dashboard">
			<DataTable columns={columns} />
		</ContentLayout>
	)
}
