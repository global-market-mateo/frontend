'use client'
import { useGetUser } from '@/actions/auth/getUser'
import { BussinessForm } from '@/components/user/UserForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ContentLayout } from '@/components/admin-panel/content-layout'

export default function UserPage() {
	const { data, error } = useGetUser()

	if (error) {
		return <div>Error loading user data</div>
	}

	return (
		<ContentLayout title="Usuario / Negocio">
			{data && (
				<div className="flex flex-col gap-4">
					<Card>
						<CardHeader>
							<CardTitle>Usuario</CardTitle>
						</CardHeader>
						<CardContent>
							<div>Nombre: {data.name}</div>
							<div>Email: {data.email}</div>
						</CardContent>
					</Card>
					<BussinessForm />
				</div>
			)}
		</ContentLayout>
	)
}
