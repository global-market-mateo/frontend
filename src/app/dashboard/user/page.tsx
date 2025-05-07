'use client'
import { useGetUser } from '@/actions/auth/getUser'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContentLayout } from '@/components/admin-panel/content-layout'

export default function UserPage() {
	const { data, error } = useGetUser()

	if (error) {
		return <div>Error loading user data</div>
	}

	return (
		<ContentLayout title="Bussiness configuration">
			{data && (
				<div className="flex flex-col gap-4">
					<Card>
						<CardHeader>
							<CardTitle>User</CardTitle>
						</CardHeader>
						<CardContent>
							<div>Name: {data.name}</div>
							<div>Email: {data.email}</div>
						</CardContent>
					</Card>
				</div>
			)}
		</ContentLayout>
	)
}
