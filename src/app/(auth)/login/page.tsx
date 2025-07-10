'use client'
import { LoginForm } from '@/resources/auth/components/login-form'
import Link from 'next/link'

export default function LoginPage() {
	return (
		<div className="mx-auto grid w-[350px] gap-6">
			<div className="grid gap-2 text-center">
				<h1 className="text-3xl font-bold">Login</h1>
			</div>
			<LoginForm />

			<div className="mt-4 text-center text-sm">
				¿No tienes una cuenta?{' '}
				<Link href="/register" className="underline">
					Registrarse
				</Link>
			</div>
		</div>
	)
}
