'use client'

import { TopMenu } from '../../../resources/shared/components/top-menu'

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { businessName: string } }) {
	return (
		<div>
			<TopMenu businessName={params.businessName} />
			<div className="flex flex-col items-center">{children}</div>
		</div>
	)
}
