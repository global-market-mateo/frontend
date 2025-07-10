import { Sheet, SheetContent, SheetTitle } from '@/resources/shared/ui/sheet'
import { ProductForm } from '@/resources/general-products/components/product-form'
import { BusinessProduct } from '@/resources/business/services/businessProducts/business-products-service'
import { GeneralProduct } from '@/resources/general-products/services/get-general-products'

interface ProductSheetProps {
	open: boolean
	setOpen: (open: boolean) => void
	product: BusinessProduct | GeneralProduct
	pagination?: any[]
}

export const ProductSheet = ({ open, setOpen, product, pagination }: ProductSheetProps) => {
	return (
		<Sheet open={open} onOpenChange={() => setOpen(!open)}>
			<SheetTitle></SheetTitle>
			<SheetContent>
				<ProductForm product={product} pagination={pagination} />
			</SheetContent>
		</Sheet>
	)
}
