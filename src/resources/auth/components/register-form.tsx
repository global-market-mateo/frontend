'use client'
import { Button } from '@/resources/shared/ui/button'
import { Form, FormField, FormMessage } from '@/resources/shared/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MyFormItem } from '@/resources/shared/components/my-form-item'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/resources/shared/hooks/use-toast'
import { useAuth } from '../hooks/use-auth'

const RegisterSchema = z.object({
	name: z.string().min(1, 'El campo debe tener al menos 1 carácter.'),

	email: z.string().email('Debe ser un correo electrónico válido.'),

	password: z
		.string()
		.min(6, 'El campo debe tener al menos 6 caracteres.')
		.transform((value) => value.trim()),

	businessName: z
		.string()
		.min(6, 'El campo debe tener al menos 6 caracteres.')
		.transform((value) => value.trim())
})
export type RegisterSchemaType = z.infer<typeof RegisterSchema>

export const RegisterForm = () => {
	const { register, registerError, registerSuccess } = useAuth()
	const router = useRouter()
	const form = useForm<RegisterSchemaType>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})
	const onSubmit = (data) => {
		register(data)
	}

	useEffect(() => {
		if (registerSuccess) {
			router.push('/login')
			toast({
				title: 'Registro exitoso',
				description: 'Ahora puedes iniciar sesión'
			})
		}
	}, [registerSuccess, router])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} onError={(error) => console.log(error)} className="grid gap-4">
				<FormField control={form.control} name="name" render={({ field }) => <MyFormItem field={field} label="Nombre" />} />
				<FormField control={form.control} name="email" render={({ field }) => <MyFormItem field={field} label="Email" />} />

				<FormField control={form.control} name="password" render={({ field }) => <MyFormItem field={field} label="Contraseña" type="password" />} />

				<FormField control={form.control} name="businessName" render={({ field }) => <MyFormItem field={field} label="Nombre del negocio" />} />
				<FormMessage>{registerError && 'No autorizado'}</FormMessage>
				<Button type="submit">Ingresar</Button>
			</form>
		</Form>
	)
}
