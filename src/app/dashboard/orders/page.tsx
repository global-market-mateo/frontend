'use client'
import { useGetOrders } from '@/actions/orders/orderQueries'
import { ContentLayout } from '@/components/admin-panel/content-layout'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRouter } from 'next/navigation'

export default function OrderPage() {
	const router = useRouter()
	const { data: orders } = useGetOrders()
	const toOrder = (id: string) => {
		router.push(`/dashboard/orders/${id}`)
	}
	return (
		<ContentLayout title="Pedidos">
			<div>
				{orders && (
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[100px]">Id</TableHead>
								<TableHead>Estado</TableHead>
								<TableHead>Nombre</TableHead>
								<TableHead>Fecha</TableHead>
								<TableHead className="text-right">Total</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{orders.map(({ buyerInfo, createdAt, id, isApproved, total }) => (
								<TableRow key={id} onClick={() => toOrder(id)}>
									<TableCell className="font-medium">{id.slice(0, 8)}</TableCell>
									<TableCell>{isApproved ? 'Aprobado' : 'Pendiente'}</TableCell>
									<TableCell>{buyerInfo.name}</TableCell>
									<TableCell>{new Date(createdAt).toLocaleString()}</TableCell>
									<TableCell className="text-right">{total}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</div>
		</ContentLayout>
	)
}
