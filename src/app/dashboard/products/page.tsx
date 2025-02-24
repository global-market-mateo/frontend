"use client";

import { columns, ContentLayout, DataTable } from "@/components";

export default function ProductsPage() {
  return (
    <ContentLayout title="Productos">
      <DataTable columns={columns} />
    </ContentLayout>
  );
}
