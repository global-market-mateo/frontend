import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Form, FormField } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Checkbox } from '../ui/checkbox'
import { useGetUser } from '@/resources/auth/services/get-user'
import { useUpdateBusiness } from '@/resources/business/services/business-queries'
import { WppNumberForm } from './wpp-number-form'
const paymentMethods = {
	CASH: 'Efectivo',
	CREDIT_CARD: 'Tarjeta de credito',
	DEBIT_CARD: 'Tarjeta de debito',
	TRANSFER: 'Transferencia'
} as const

const deliveryMethods = {
	DELIVERY: 'Envio',
	PICKUP: 'Retiro'
} as const

const UserSchema = z.object({
	paymentMethods: z.array(z.enum(Object.keys(paymentMethods) as [string, ...string[]])),
	deliveryMethods: z.array(z.enum(Object.keys(deliveryMethods) as [string, ...string[]])),
	wppNumber: z.string().optional()
})

export const BussinessForm = () => {
	const { data, error } = useGetUser()
	const { mutate: update } = useUpdateBusiness()
	const form = useForm<z.infer<typeof UserSchema>>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			paymentMethods: data?.businesses[0].paymentMethods as ('CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'TRANSFER')[],
			deliveryMethods: data?.businesses[0].deliveryMethods as ('DELIVERY' | 'PICKUP')[]
		}
	})
	if (error) {
		return <div>Error loading user data</div>
	}

	const onSubmit = (values: z.infer<typeof UserSchema>) => {
		update({
			id: data?.businesses[0].id,
			paymentMethods: values.paymentMethods,
			deliveryMethods: values.deliveryMethods,
			wppNumber: values.wppNumber
		})
	}
	return (
		<Card>
			<CardHeader className="flex flex-row justify-between">
				<CardTitle>Negocio &quot;{data?.businesses[0].name}&quot;</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} onError={(error) => console.log(error)} className="flex justify-between gap-2">
						<FormField
							control={form.control}
							name="paymentMethods"
							render={({ field }) => (
								<div className="flex flex-col gap-2">
									<span>Metodo de pago :</span>
									{Object.keys(paymentMethods).map((method) => (
										<span key={method} className="flex flex-row gap-2 ">
											<Checkbox
												checked={field.value.includes(method)}
												onCheckedChange={(checked) => {
													if (checked) {
														field.onChange([...field.value, method])
													} else {
														field.onChange(field.value.filter((m) => m !== method))
													}
												}}
											/>
											<span>{paymentMethods[method as keyof typeof paymentMethods]}</span>
										</span>
									))}
								</div>
							)}
						/>
						<FormField
							control={form.control}
							name="deliveryMethods"
							render={({ field }) => (
								<div className="flex flex-col gap-2">
									<span>Metodo de entrega :</span>
									{Object.keys(deliveryMethods).map((method) => (
										<span key={method} className="flex flex-row gap-2">
											<Checkbox
												checked={field.value.includes(method)}
												onCheckedChange={(checked) => {
													if (checked) {
														field.onChange([...field.value, method])
													}
												}}
											/>
											<span>{deliveryMethods[method as keyof typeof deliveryMethods]}</span>
										</span>
									))}
								</div>
							)}
						/>
						<div className="self-end flex flex-row justify-end">
							<Button type="submit">Guardar</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
