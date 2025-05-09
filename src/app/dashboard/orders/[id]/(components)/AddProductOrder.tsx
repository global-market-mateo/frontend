import { set, useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../../../components/ui/form'
import { Input } from '../../../../../components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../../../../../components/ui/button'
import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../../../components/ui/table'
import { CirclePlus } from 'lucide-react'
import { Order } from '@/actions/orders/orderService'
import { useUpdateOrder } from '@/actions/orders/orderMutations'
import { useGetPublicProductsBusiness } from '@/actions/businesses/businessQueries'

const formSchema = z.object({
	title: z.string().min(2, { message: 'La busqueda debe tener al menos 2 caracteres' })
})
interface Prop {
	order: Order
}
export const AddProductOrder = ({ order }: Prop) => {
	const { mutate } = useUpdateOrder(order.id)

	const [search, setSearch] = useState('coca')
	const { data } = useGetPublicProductsBusiness({ businessName: 'coca', category: search })
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: ''
		}
	})
	const onSubmit = (values: z.infer<typeof formSchema>) => {
		setSearch(values.title)
	}
	const add = ({ price, name, productOrderId }: { price: number; name: string; productOrderId: string }) => {
		mutate({
			id: order.id,
			orderDto: {
				products: [...order.products, { price, quantity: 1, name, id: productOrderId }]
			}
		})
	}

	return (
		<div className="flex flex-col gap-2 ">
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between gap-4">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Buscar producto</FormLabel>
								<FormControl>
									<Input placeholder="Buscar" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex items-end h-full">
						<Button type="submit">Buscar</Button>
					</div>
				</form>
			</Form>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Titulo</TableHead>
						<TableHead>Precio</TableHead>
						<TableHead>Categoria</TableHead>
						<TableHead className="text-right">Agregar</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{data?.data?.map(({ id, amount, price, brand, category, tipo, description }) => (
						<TableRow key={id}>
							<TableCell className="font-medium">{`${tipo} ${brand} ${amount}`}</TableCell>
							<TableCell>{price}</TableCell>
							<TableCell>{category.name}</TableCell>
							<TableCell className="text-right">
								<Button
									onClick={() =>
										add({
											price,
											name: `${tipo} ${description} ${brand} ${amount}`,
											productOrderId: id
										})
									}
								>
									<CirclePlus />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
