"use client";

import { CategoryForm, ContentLayout } from "@/components";

export default function NewCategoryPage() {
  return (
    <ContentLayout title="Nueva categorias">
      <CategoryForm className="w-2/5" />
    </ContentLayout>
  );
}
