import { useGetUser } from '@/actions/auth/getUser'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/components/ui/form'
import { MyFormItem } from '../MyFormItem'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const schema = z.object({
	country: z.string(),
	city: z.string(),
	street: z.string(),
	number: z.string(),
	department: z.string(),
	location: z.string(),
	postalCode: z.string(),
	district: z.string()
})

export const BussinessLocation = () => {
	const { data, error } = useGetUser()

	if (error) {
		return <div>Error loading user data</div>
	}

	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			country: '',
			city: '',
			street: '',
			number: '',
			department: '',
			location: '',
			postalCode: '',
			district: ''
		}
	})

	const onSubmit = (values: z.infer<typeof schema>) => {
		console.log(values)
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Business location</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField control={form.control} name="country" render={({ field }) => <MyFormItem field={field} label="Country" />} />
						<FormField control={form.control} name="city" render={({ field }) => <MyFormItem field={field} label="City" />} />
						<FormField control={form.control} name="street" render={({ field }) => <MyFormItem field={field} label="Street" />} />
						<FormField control={form.control} name="number" render={({ field }) => <MyFormItem field={field} label="Number" />} />
						<FormField control={form.control} name="department" render={({ field }) => <MyFormItem field={field} label="Department" />} />
						<FormField control={form.control} name="location" render={({ field }) => <MyFormItem field={field} label="Location" />} />
						<FormField control={form.control} name="postalCode" render={({ field }) => <MyFormItem field={field} label="Postal Code" />} />
						<FormField control={form.control} name="district" render={({ field }) => <MyFormItem field={field} label="District" />} />
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
