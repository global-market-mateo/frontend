'use client'
import { useGetUser } from '@/actions/auth/getUser'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import { BussinessForm } from '@/components/Bussiness/BussinessForm'
import { BussinessLocation } from '@/components/Bussiness/BussinessLocation'

export default function BusinessPage() {
	const { data, error } = useGetUser()

	if (error) {
		return <div>Error loading user data</div>
	}
	return (
		<ContentLayout title="Business configuration">
			{data && (
				<div className="flex flex-col gap-4">
					<BussinessForm />
					<BussinessLocation />
				</div>
			)}
		</ContentLayout>
	)
}
