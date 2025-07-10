'use client'
import { useGetUser } from '@/resources/auth/services/get-user'
import { ContentLayout } from '@/resources/admin-panel/content-layout'
import { BussinessForm } from '@/resources/business/components/bussiness-form'
import { WppNumberForm } from '@/resources/business/components/wpp-number-form'

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
					<WppNumberForm />
				</div>
			)}
		</ContentLayout>
	)
}
