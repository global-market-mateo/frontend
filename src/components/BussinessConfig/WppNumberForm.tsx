'use client'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useGetUser } from '@/actions/auth/getUser'
import { useUpdateBusiness } from '@/actions/businesses/businessQueries'
import { Input } from '../ui/input'
import { useState, useEffect } from 'react'

const phoneValidation = {
	countryCode: {
		min: 1,
		max: 3,
		regex: /^\d+$/,
		messages: {
			required: 'El código de país es requerido',
			max: 'El código de país no puede tener más de 3 dígitos',
			format: 'El código de país solo debe contener números'
		}
	},
	phoneNumber: {
		min: 10,
		max: 10,
		regex: /^\d+$/,
		messages: {
			min: 'El número debe tener al menos 10 dígitos',
			max: 'El número no puede tener más de 10 dígitos',
			format: 'El número solo debe contener números'
		}
	}
}

const UserSchema = z.object({
	countryCode: z
		.string()
		.min(phoneValidation.countryCode.min, phoneValidation.countryCode.messages.required)
		.max(phoneValidation.countryCode.max, phoneValidation.countryCode.messages.max)
		.regex(phoneValidation.countryCode.regex, phoneValidation.countryCode.messages.format),
	phoneNumber: z
		.string()
		.min(phoneValidation.phoneNumber.min, phoneValidation.phoneNumber.messages.min)
		.max(phoneValidation.phoneNumber.max, phoneValidation.phoneNumber.messages.max)
		.regex(phoneValidation.phoneNumber.regex, phoneValidation.phoneNumber.messages.format)
})

type FormValues = z.infer<typeof UserSchema>

const parsePhoneNumber = (number: string | null | undefined) => {
	if (!number) return { countryCode: '', phoneNumber: '' }

	const cleanNumber = number.startsWith('+') ? number.slice(1) : number
	const parts = cleanNumber.split(/[- ]/)

	if (parts.length === 2) {
		return {
			countryCode: parts[0],
			phoneNumber: parts[1]
		}
	}

	if (cleanNumber.length >= 10) {
		return {
			countryCode: cleanNumber.slice(0, 2),
			phoneNumber: cleanNumber.slice(2)
		}
	}

	return { countryCode: '', phoneNumber: '' }
}

const PhoneNumberInput = ({ field, label, placeholder, maxLength }: { field: any; label: string; placeholder: string; maxLength: number }) => (
	<FormItem className={maxLength === 3 ? 'flex-1' : 'flex-[2]'}>
		<FormLabel>{label}</FormLabel>
		<FormControl>
			<Input type="text" placeholder={placeholder} {...field} value={field.value || ''} maxLength={maxLength} />
		</FormControl>
		<FormMessage />
	</FormItem>
)

export const WppNumberForm = () => {
	const { data, error } = useGetUser()
	const { mutate: update } = useUpdateBusiness()
	const [isEditing, setIsEditing] = useState(false)

	const form = useForm<FormValues>({
		resolver: zodResolver(UserSchema),
		defaultValues: parsePhoneNumber(data?.businesses[0].wppNumber)
	})

	useEffect(() => {
		setIsEditing(!data?.businesses[0].wppNumber)
	}, [data?.businesses[0].wppNumber])

	useEffect(() => {
		if (data?.businesses[0].wppNumber !== undefined) {
			const values = parsePhoneNumber(data.businesses[0].wppNumber)
			form.setValue('countryCode', values.countryCode)
			form.setValue('phoneNumber', values.phoneNumber)
		}
	}, [data?.businesses[0].wppNumber, form])

	const handleSubmit = (values: FormValues) => {
		const fullNumber = `${values.countryCode}-${values.phoneNumber}`
		update({
			id: data?.businesses[0].id,
			wppNumber: fullNumber || null
		})
		setIsEditing(false)
	}

	if (error) return <div>Error loading user data</div>

	return (
		<Card>
			<CardHeader className="flex flex-row justify-between">
				<CardTitle>Numero de Whatsapp</CardTitle>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					{!isEditing ? (
						<div className="flex justify-between items-center">
							<div>
								<FormLabel>Whatsapp</FormLabel>
								<p className="text-sm text-gray-500">{data?.businesses[0].wppNumber || 'No hay número registrado'}</p>
							</div>
							<Button onClick={() => setIsEditing(true)}>Editar</Button>
						</div>
					) : (
						<form onSubmit={form.handleSubmit(handleSubmit)} onError={(error) => console.log(error)} className="flex flex-col gap-4 w-1/3">
							<div className="flex gap-4">
								<FormField control={form.control} name="countryCode" render={({ field }) => <PhoneNumberInput field={field} label="Código de país" placeholder="52" maxLength={3} />} />
								<FormField
									control={form.control}
									name="phoneNumber"
									render={({ field }) => <PhoneNumberInput field={field} label="Número de teléfono" placeholder="2345678901" maxLength={10} />}
								/>
							</div>
							<div className="flex justify-end gap-2">
								{data?.businesses[0].wppNumber && (
									<Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
										Cancelar
									</Button>
								)}
								<Button type="submit">Guardar</Button>
							</div>
						</form>
					)}
				</Form>
			</CardContent>
		</Card>
	)
}
