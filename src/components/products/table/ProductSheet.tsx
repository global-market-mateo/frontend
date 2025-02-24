import { Sheet, SheetContent, SheetTitle } from "@/components";
import { ProductForm } from "../ProductForm";
import { BusinessProduct, GeneralProduct } from "@/actions";

interface ProductSheetProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: BusinessProduct | GeneralProduct;
  pagination?: any[];
}

export const ProductSheet = ({
  open,
  setOpen,
  product,
  pagination,
}: ProductSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetTitle></SheetTitle>
      <SheetContent>
        <ProductForm product={product} pagination={pagination} />
      </SheetContent>
    </Sheet>
  );
};
