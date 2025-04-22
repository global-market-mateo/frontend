import { Category } from '@/actions/category/categoryService'
import { Sheet, SheetContent, SheetTitle } from '../ui/sheet'
import { CategoryForm } from './CategoryForm'

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
