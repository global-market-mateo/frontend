import { useGetUser } from '@/resources/auth/services/get-user'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '@/resources/shared/ui/form'
import { MyFormItem } from '@/resources/shared/components/my-form-item'
import { Card, CardContent, CardHeader, CardTitle } from '@/resources/shared/ui/card'
import { Button } from '@/resources/shared/ui/button'
import { useCreateBusinessLocation, useUpdateBusinessLocation } from '@/resources/business/services/businessLocations/business-locations-mutations'
import { BusinessLocation } from '@/resources/business/services/businessLocations/business-locations-service'
import { useEffect } from 'react'

const schema = z.object({
	country: z.string().min(1),
	city: z.string().min(1),
	street: z.string().min(1),
	number: z.string().min(1),
	department: z.string().optional(),
	postalCode: z.string().min(1),
	district: z.string().optional()
})

export const BussinessLocationForm = ({ data }: { data?: BusinessLocation }) => {
	const { error } = useGetUser()
	const { mutate: createBusinessLocation } = useCreateBusinessLocation()
	const { mutate: updateBusinessLocation } = useUpdateBusinessLocation()
	const form = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
		defaultValues: {
			country: '',
			city: '',
			street: '',
			number: '',
			department: '',
			postalCode: '',
			district: ''
		}
	})

	useEffect(() => {
		if (data) {
			form.reset(
				{
					country: data.country || '',
					city: data.city || '',
					street: data.street || '',
					number: data.number || '',
					department: data.department || '',
					postalCode: data.postalCode || '',
					district: data.district || ''
				},
				{
					keepDefaultValues: false
				}
			)
		}
	}, [data, form])

	if (error) {
		return <div>Error loading user data</div>
	}

	const onSubmit = (values: z.infer<typeof schema>) => {
		const location = {
			country: values.country,
			city: values.city,
			street: values.street,
			number: values.number,
			department: values.department,
			postalCode: values.postalCode,
			district: values.district
		}
		if (data) {
			updateBusinessLocation({ location, id: data.id })
		} else {
			createBusinessLocation(location)
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Business location</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
						<FormField control={form.control} name="country" render={({ field }) => <MyFormItem field={field} label="Country*" />} />
						<FormField control={form.control} name="city" render={({ field }) => <MyFormItem field={field} label="City*" />} />
						<FormField control={form.control} name="street" render={({ field }) => <MyFormItem field={field} label="Street*" />} />
						<FormField control={form.control} name="number" render={({ field }) => <MyFormItem field={field} label="Number*" />} />
						<FormField control={form.control} name="department" render={({ field }) => <MyFormItem field={field} label="Department (optional)" />} />
						<FormField control={form.control} name="postalCode" render={({ field }) => <MyFormItem field={field} label="Postal Code*" />} />
						<FormField control={form.control} name="district" render={({ field }) => <MyFormItem field={field} label="District (optional)" />} />
						<Button type="submit">Save</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	)
}
