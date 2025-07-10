'use client'

import { useGetOrderByid } from '@/resources/orders/services/order-queries'
import { Badge } from '@/resources/shared/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/resources/shared/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/resources/shared/ui/table'

export default function PedidoIdPage({ params: { id } }: { params: { id: string } }) {
	const { data: order } = useGetOrderByid({ id })

	// return <div>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</div>;
	if (order)
		return (
			<Card className="max-w-md mx-auto p-4 space-y-4  shadow-md rounded-lg mt-10">
				<CardHeader>
					<CardTitle className="text-xl font-semibold">Pedido #{order.id.slice(0, 8)}</CardTitle>
					<p className="text-sm text-gray-500">Fecha de creación: {new Date(order.createdAt).toLocaleString()}</p>
				</CardHeader>

				<CardContent>
					<div className="flex flex-col gap-4">
						<div>
							<h3 className="font-medium">Información del comprador</h3>
							<p>Nombre: {order.buyerInfo.name}</p>
							<p>Dirección: {order.buyerInfo.address || 'Sin dirección'}</p>
							<p>Método de pago: {order.buyerInfo.pay_method}</p>
							<p>Método de entrega: {order.buyerInfo.delivery_method}</p>
						</div>

						<div>
							<h3 className="font-medium">Productos</h3>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Cantidad</TableHead>
										<TableHead>Producto</TableHead>
										<TableHead>Precio</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{order.products.map((product, index) => (
										<TableRow key={index}>
											<TableCell>{product.quantity}</TableCell>
											<TableCell className="font-medium">{product.name}</TableCell>
											<TableCell className="text-right">${product.price}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>

						<div className="flex justify-between items-center mt-4">
							<h3 className="text-lg font-semibold">Total: ${order.total}</h3>
							<Badge color={order.isApproved ? 'success' : 'warning'}>{order.isApproved ? 'Aprobado' : 'Pendiente'}</Badge>
						</div>

						{/* <Button className="w-full mt-4">
                {order.isApproved ? "Ver detalles" : "Aprobar pedido"}
              </Button> */}
					</div>
				</CardContent>
			</Card>
		)
}
