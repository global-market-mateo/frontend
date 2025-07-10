'use client'

import { Footer } from '@/resources/admin-panel/footer'
import { Sidebar } from '@/resources/admin-panel/sidebar'
import { useSidebar } from '@/resources/shared/hooks/use-sidebar'
import { useStore } from '@/resources/shared/hooks/use-store'
import { cn } from '@/lib/utils'

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
	const sidebar = useStore(useSidebar, (x) => x)
	if (!sidebar) return null
	const { getOpenState, settings } = sidebar
	return (
		<>
			<Sidebar />
			<main
				className={cn(
					'min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300',
					!settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72')
				)}
			>
				{children}
			</main>
			<footer className={cn('transition-[margin-left] ease-in-out duration-300', !settings.disabled && (!getOpenState() ? 'lg:ml-[90px]' : 'lg:ml-72'))}>
				<Footer />
			</footer>
		</>
	)
}
