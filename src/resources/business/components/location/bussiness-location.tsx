import { BussinessLocationForm } from './bussiness-location-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/resources/shared/ui/card'
import { useGetBusinessLocation } from '@/resources/business/services/businessLocations/business-locations-queries'

export const BussinessLocation = () => {
	const { data } = useGetBusinessLocation()
	return (
		<div>
			<Card>
				<CardHeader>
					<CardTitle>Ubicación de negocio</CardTitle>
					<CardDescription>Agrega, edita o elimina ubicaciones para asegurar que la información siempre esté disponible.</CardDescription>
				</CardHeader>
				<CardContent>{data && data.length > 0 ? <BussinessLocationForm data={data[0]} /> : <BussinessLocationForm />}</CardContent>
			</Card>
		</div>
	)
}
