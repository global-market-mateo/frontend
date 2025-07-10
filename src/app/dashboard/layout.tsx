import AdminPanelLayout from '@/resources/admin-panel/admin-panel-layout'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return <AdminPanelLayout>{children}</AdminPanelLayout>
}
