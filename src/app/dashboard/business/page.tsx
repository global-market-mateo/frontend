'use client'
import { useGetUser } from '@/actions/auth/getUser'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import { BussinessForm } from '@/components/BussinessConfig/BussinessForm'
import { WppNumberForm } from '@/components/BussinessConfig/WppNumberForm'

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
