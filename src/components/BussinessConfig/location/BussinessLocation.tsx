import { BussinessLocationForm } from './BussinessLocationForm'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card'
import { useGetBusinessLocation } from '@/actions/businesses/businessLocations/businessLocationsQueries'

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
