"use client";
import { ContentLayout, ProductForm } from "@/components";

export default function NewProductPage() {
  return (
    <ContentLayout title="Nuevo producto">
      <ProductForm className="w-3/5 " />
    </ContentLayout>
  );
}
