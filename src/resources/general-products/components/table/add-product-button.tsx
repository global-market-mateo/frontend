import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/resources/shared/ui/sheet'
import { ProductForm } from '@/resources/general-products/components/product-form'
import { Button } from '@/resources/shared/ui/button'

export const AddProductButton = ({ pagination }: { pagination: any[] }) => {
	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>Crear Producto</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Crear/Editar producto</SheetTitle>
				</SheetHeader>
				<ProductForm pagination={pagination} />
			</SheetContent>
		</Sheet>
	)
}
