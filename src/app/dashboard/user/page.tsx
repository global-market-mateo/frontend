"use client";
import { getUser } from "@/actions";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ContentLayout,
} from "@/components";
import UserForm from "@/components/user/UserForm";

export default function UserPage() {
  const { data, error } = getUser();

  if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <ContentLayout title="Usuario / Negocio">
      {data && (
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Usuario</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Nombre: {data.name}</div>
              <div>Email: {data.email}</div>
            </CardContent>
          </Card>
          <UserForm />
        </div>
      )}
    </ContentLayout>
  );
}
