import { Category } from '@/resources/category/services/category-service'
import { Sheet, SheetContent, SheetTitle } from '@/resources/shared/ui/sheet'
import { CategoryForm } from './category-form'

interface CategorySheetProps {
	open: boolean
	setOpen: (open: boolean) => void
	category: Category
}

export const CategorySheet = ({ open, setOpen, category }: CategorySheetProps) => {
	return (
		<Sheet open={open} onOpenChange={() => setOpen(!open)}>
			<SheetTitle />

			<SheetContent>
				<CategoryForm category={category} />
			</SheetContent>
		</Sheet>
	)
}
