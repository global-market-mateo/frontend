"use client";

// import { Product } from "@/types";
import { ColumnDef, FilterFn, Row } from "@tanstack/react-table";
import Image from "next/image";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  Button,
  Checkbox,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components";
import { BusinessProduct, useDeleteBusinessProduct } from "@/actions";
// import { removeProduct } from "@/actions/usePorduct";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const myCustomFilterFn: FilterFn<BusinessProduct> = (
  row: Row<BusinessProduct>,
  columnId: string,
  filterValue: string,
  addMeta: (meta: any) => void
) => {
  const { tipo, brand, description, category } = row.original;
  filterValue = filterValue.toLowerCase();
  const filterParts = filterValue.split(" ");
  const rowValues = `${tipo} ${brand} ${description} ${category}`;

  return filterParts.every((part) => rowValues.includes(part));
};

export const columns: ColumnDef<BusinessProduct>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        // checked={
        //   table.getIsAllPageRowsSelected() ||
        //   (table.getIsSomePageRowsSelected() && "indeterminate")
        // }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tipo",
    filterFn: myCustomFilterFn,
    header: ({ column }) => Sort(column, "Tipo"),
  },
  {
    accessorKey: "description",
    header: ({ column }) => Sort(column, "Descripción"),
  },
  {
    accessorKey: "brand",
    header: ({ column }) => Sort(column, "Marca"),
  },
  {
    accessorKey: "category",
    cell: ({ row }) => {
      const category: { name: string; id: string } = row.getValue("category");
      return <p>{category?.name || "Sin categoria"}</p>;
    },
    header: ({ column }) => Sort(column, "Categoría"),
  },
  {
    accessorKey: "amount",
    header: "Cantidad",
  },
  {
    accessorKey: "price",
    header: "Precio",
  },

  {
    accessorKey: "stock",
    header: ({ column }) => Sort(column, "Stock"),
  },

  {
    accessorKey: "url",
    header: "Imagen",
    cell: ({ row }) => {
      const url: string = row.getValue("url");
      return (
        <Image
          src={url ? url : "no_image_product.png"}
          alt=""
          width={50}
          height={50}
          className="max-h-[45px] w-auto"
        />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const { mutate: remove } = useDeleteBusinessProduct();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                remove(product.id);
              }}
            >
              <Button>Eliminar</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
const Sort = (column: any, title: string) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  );
};
