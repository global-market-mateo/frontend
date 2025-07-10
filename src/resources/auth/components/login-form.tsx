'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { MyFormItem } from '@/resources/shared/components/my-form-item'
import Link from 'next/link'
import { Form, FormField, FormMessage } from '@/resources/shared/ui/form'
import { Label } from '@/resources/shared/ui/label'
import { Button } from '@/resources/shared/ui/button'
import { useAuth } from '../hooks/use-auth'

const LoginSchema = z.object({
	email: z.string().email('Debe ser un correo electrónico válido').min(3, 'El campo  debe tener al menos 3 caracteres.'),
	password: z.string().min(6, 'El campo no es valido')
})
export type LoginSchemaType = z.infer<typeof LoginSchema>

export const LoginForm = () => {
	const { login, loginError } = useAuth()

	const form = useForm<LoginSchemaType>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})
	const onSubmit = (data) => {
		console.log(data)
		login(data)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} onError={(error) => console.log(error)} className="grid gap-4">
				<FormField control={form.control} name="email" render={({ field }) => <MyFormItem field={field} label="Email" />} />

				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<div className="flex flex-col pt-2">
							<Label className="flex items-center">
								<div>Contraseña</div>
								<Link href="/forgot-password" className="ml-auto inline-block text-sm underline">
									¿Olvidaste tu contraseña?
								</Link>
							</Label>
							<MyFormItem field={field} type="password" />
						</div>
					)}
				/>
				<FormMessage>{loginError && 'No autorizado'}</FormMessage>
				<Button type="submit">Ingresar</Button>
			</form>
		</Form>
	)
}
