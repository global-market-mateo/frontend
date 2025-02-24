import { Category } from "@/actions";
import { CategoryForm, Sheet, SheetContent, SheetTitle } from "@/components";

interface CategorySheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  category: Category;
}

export const CategorySheet = ({
  open,
  setOpen,
  category,
}: CategorySheetProps) => {
  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetTitle />

      <SheetContent>
        <CategoryForm category={category} />
      </SheetContent>
    </Sheet>
  );
};
