'use client'

import { Badge, Check, Plus } from 'lucide-react'
import { ConfirmOrder } from './(components)/ConfirmOrder'
import { RemoveProductOrder } from './(components)/RemoveProductOrder'
import { useGetOrderByid } from '@/resources/orders/services/order-queries'
import { ContentLayout } from '@/resources/admin-panel/content-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/resources/shared/ui/card'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { Button } from '@/resources/shared/ui/button'
import { DialogHeader } from '@/resources/shared/ui/dialog'
import { AddProductOrder } from './(components)/AddProductOrder'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/resources/shared/ui/table'

export default function OrderId({ params: { id } }: { params: { id: string } }) {
	const { data: order } = useGetOrderByid({ id })

	return (
		<ContentLayout title="Pedido">
			{order && (
				<>
					<Card className="mb-8">
						<CardHeader className="flex-row justify-between w-full ">
							<h1 className="text-xl font-semibold">Pedido #{order.id.slice(0, 8)}</h1>
							<div className="flex gap-4 items-center  h-full">
								<Badge className={`${order.isApproved ? 'bg-green-600' : 'bg-red-500'} text-md py-1 px-2`}>{order.isApproved ? 'Aprobado' : 'Pendiente'}</Badge>
							</div>
						</CardHeader>
						<CardContent className="flex items-center gap-4 justify-between">
							<p className="text-md text-gray-500 text-muted-foreground">Fecha de creación: {new Date(order.createdAt).toLocaleString()}</p>
							<div>
								{!order.isApproved && (
									<Dialog>
										<DialogTrigger asChild>
											<Button className="bg-green-600 hover:bg-green-700 text-gray-200">
												<Check className="w-4 h-4 mr-2" />
												Confirmar pedido
											</Button>
										</DialogTrigger>
										<DialogContent>
											<DialogHeader>
												<DialogTitle>¿Quieres confirmar el pedido?</DialogTitle>
											</DialogHeader>
											<p>Al confirmar el pedido, el cliente recibirá un correo con la confirmación de su compra.</p>
											<div className="flex gap-4 mt-4">
												<ConfirmOrder orderId={order.id} />
												<Button className="bg-red-500 hover:bg-red-600 text-gray-200" onClick={() => console.log('Cancelar')}>
													Cancelar
												</Button>
											</div>
										</DialogContent>
									</Dialog>
								)}
							</div>
						</CardContent>
					</Card>
					<Card className="mb-8">
						<CardHeader>
							<CardTitle>Información del cliente</CardTitle>
						</CardHeader>
						<CardContent>
							<p>Nombre: {order.buyerInfo.name}</p>
							<p>Dirección: {order.buyerInfo.address || 'Sin dirección'}</p>
							<p>Método de pago: {order.buyerInfo.pay_method}</p>
							<p>Método de entrega: {order.buyerInfo.delivery_method}</p>
						</CardContent>
					</Card>
					<Card className="flex flex-col gap-4 mb-8">
						<CardHeader className="flex-row justify-between items-center">
							<CardTitle>Productos</CardTitle>
							<Dialog>
								<DialogTrigger asChild>
									<Button size="sm">
										<Plus className="w-4 h-4 mr-2" />
										Agregar producto
									</Button>
								</DialogTrigger>
								<DialogContent>
									<DialogHeader>
										<DialogTitle>Agregar producto</DialogTitle>
									</DialogHeader>
									<AddProductOrder order={order} />
								</DialogContent>
							</Dialog>
						</CardHeader>
						<CardContent>
							<h3 className="font-medium">Productos</h3>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Cantidad</TableHead>
										<TableHead>Producto</TableHead>
										<TableHead>Precio</TableHead>
										<TableHead>Eliminar</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{order.products.map((product, index) => (
										<TableRow key={index}>
											<TableCell>{product.quantity}</TableCell>
											<TableCell className="font-medium">{product.name}</TableCell>
											<TableCell>${product.price}</TableCell>
											<TableCell>
												<RemoveProductOrder orderId={order.id} order={order} productOrderId={product.id} />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TableCell colSpan={2} className="text-right">
											Total
										</TableCell>
										<TableCell className="text-lg font-semibold">${order.total}</TableCell>
									</TableRow>
								</TableFooter>
							</Table>
						</CardContent>
					</Card>
				</>
			)}
		</ContentLayout>
	)
}
