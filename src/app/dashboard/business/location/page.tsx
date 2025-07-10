'use client'
import { ContentLayout } from '@/resources/admin-panel/content-layout'
import { useGetUser } from '@/resources/auth/services/get-user'
import { BussinessLocation } from '@/resources/business/components/location/bussiness-location'

export default function BusinessLocationPage() {
	const { data, error } = useGetUser()

	if (error) {
		return <div>Error loading user data</div>
	}
	return (
		<ContentLayout title="Ubicación de negocio">
			{data && (
				<div className="flex flex-col gap-4">
					<BussinessLocation />
				</div>
			)}
		</ContentLayout>
	)
}
