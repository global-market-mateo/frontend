"use client";

import { columns, ContentLayout, DataTable } from "@/components";

export default function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <DataTable columns={columns} />
    </ContentLayout>
  );
}
