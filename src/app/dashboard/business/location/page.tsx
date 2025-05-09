'use client'
import { useGetUser } from '@/actions/auth/getUser'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import { BussinessLocation } from '@/components/BussinessConfig/location/BussinessLocation'

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
