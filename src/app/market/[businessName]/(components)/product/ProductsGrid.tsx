"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ProductItem } from "./ProductItem";

import { Button, PaginationComponent } from "@/components";
import { getPublicProductsBusiness } from "@/actions";
import { Title } from "../ui/Title";

interface Prop {
  category: string;
  className?: string;
  businessName: string;
}

export const ProductsGrid = ({ category, className, businessName }: Prop) => {
  const [brandState, setBrand] = useState<undefined | string>(undefined);
  const [tipoState, setTipo] = useState<undefined | string>(undefined);
  const [page, setPage] = useState(1);

  const { data: products, isLoading } = getPublicProductsBusiness({
    businessName,
    category,
    limit: 21,
    page,
    brand: brandState ? brandState : undefined, // Convertir false a undefined
    tipo: tipoState ? tipoState : undefined, // Convertir false a undefined
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-4/5 flex flex-col gap-5 pt-10">
      <div className="border-t-2 border-black pb-2 pt-4 flex justify-between gap-2 w-full">
        <Title>Productos {category.replace(/_/g, " ")}</Title>
        <Link href={`/`}>
          <Button>Volver</Button>
        </Link>
      </div>

      <div className="w-full flex  justify-around flex-col gap-5 md:gap-0 md:flex-row  ">
        {/* <ProductsFilters
          tipoState={tipoState}
          brandState={brandState}
          setBrand={setBrand}
          setTipo={setTipo}
          category={category}
        /> */}
        <div className={`w-full ${className}`}>
          {products?.data?.map((product) => (
            <ProductItem {...product} key={product.id} />
          ))}
        </div>
      </div>
      {products && (
        <PaginationComponent
          meta={products?.meta!}
          page={page}
          setPage={setPage}
        />
      )}
    </div>
  );
};
