import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/providers/Providers'
import { GeistSans } from 'geist/font/sans'

export const metadata: Metadata = {
	title: 'Global Market',
	description: 'Global Market'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="es" suppressHydrationWarning>
			<body className={GeistSans.className} suppressHydrationWarning>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
