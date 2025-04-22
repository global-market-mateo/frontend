'use client'
import { useGetUser } from '@/actions/auth/getUser'
import { useBusinesses } from '@/actions/businesses/businessQueries'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { ArrowRightIcon, PanelsTopLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
export default function HomePage() {
	const { data: user } = useGetUser()
	const { data: businesses } = useBusinesses()
	return (
		<div className="flex flex-col min-h-screen">
			<header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
				<div className="container h-14 flex items-center">
					<Link href="/" className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300">
						<PanelsTopLeft className="w-6 h-6 mr-3" />
						<span className="font-bold">Global market</span>
						<span className="sr-only">Global market</span>
					</Link>
					<nav className="ml-auto flex items-center gap-2">
						<Button variant="outline" size="icon" className="rounded-full w-8 h-8 bg-background" asChild>
							<Link href="https://github.com/salimi-my/shadcn-ui-sidebar">
								<GitHubLogoIcon className="h-[1.2rem] w-[1.2rem]" />
							</Link>
						</Button>
						<ModeToggle />
					</nav>
				</div>
			</header>
			<main className="min-h-[calc(100vh-57px-97px)] flex-1">
				<div className="container relative pb-10">
					<section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
						<h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">Global market</h1>
						<span className="max-w-[750px] text-center text-lg font-light text-foreground">
							Facilita la venta online de tu supermercado con nuestra plataforma. Gestiona tus productos, organiza pedidos y atiende a tus clientes de manera simple y efectiva. Con
							nuestra solución, podrás empezar a vender en línea de forma rápida y sin complicaciones, para hacer crecer tu negocio fácilmente.
						</span>
						<div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
							<Button variant="default" asChild>
								<Link href={user ? '/dashboard' : '/login'}>
									{user ? 'Dashboard' : 'Login'}
									<ArrowRightIcon className="ml-2" />
								</Link>
							</Button>
						</div>
					</section>
					<div className="flex flex-col items-center">
						<span className="max-w-[750px] text-center text-lg font-light text-foreground">Nuestros negocios</span>
						<div className="flex justify-center gap-4 mt-4  py-5 w-full">
							{businesses?.map((business) => (
								<Link
									href={`/market/${business.name.replace(/ /g, '-')}`}
									key={business.id}
									className="w-1/5 flex flex-col items-center justify-center p-4 border border-border/40 rounded-xl shadow-sm dark:border-gray-700"
								>
									<h3 className="text-lg font-bold">{business.name}</h3>
								</Link>
							))}
						</div>
					</div>
					<div className="w-full flex justify-center relative">
						<Image
							src="/global-market-screen.webp"
							width={1080}
							height={608}
							alt="demo-dark"
							priority
							className="border border-zinc-600 rounded-xl shadow-sm hidden dark:block dark:shadow-gray-500/5"
						/>
					</div>
				</div>
			</main>
			<footer className="py-6 md:py-0 border-t border-border/40">
				<div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
					<p className="text-balance text-center text-sm leading-loose text-muted-foreground">
						Built on top of{' '}
						<Link href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">
							shadcn/ui
						</Link>
						. The source code is available on{' '}
						<Link href="https://github.com/salimi-my/shadcn-ui-sidebar" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-4">
							GitHub
						</Link>
						.
					</p>
				</div>
			</footer>
		</div>
	)
}
