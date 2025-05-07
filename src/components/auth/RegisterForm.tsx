'use client'
import { Button } from '@/components/ui/button'
import { Form, FormField } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MyFormItem } from '@/components/MyFormItem'
import { useRegister } from '@/actions/auth/useRegister'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'

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
	const { mutate: register, isError, isSuccess } = useRegister()
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
		if (isSuccess) {
			router.push('/login')
			toast({
				title: 'Registro exitoso',
				description: 'Ahora puedes iniciar sesión'
			})
		}
	}, [isSuccess])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} onError={(error) => console.log(error)} className="grid gap-4">
				<FormField control={form.control} name="name" render={({ field }) => <MyFormItem field={field} label="Nombre" />} />
				<FormField control={form.control} name="email" render={({ field }) => <MyFormItem field={field} label="Email" />} />

				<FormField control={form.control} name="password" render={({ field }) => <MyFormItem field={field} label="Contraseña" type="password" />} />

				<FormField control={form.control} name="businessName" render={({ field }) => <MyFormItem field={field} label="Nombre del negocio" />} />
				{/* <FormMessage>{isError && "No autorizado"}</FormMessage> */}
				<Button type="submit">Ingresar</Button>
			</form>
		</Form>
	)
}
