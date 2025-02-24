"use client";
import { getUser } from "@/actions";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  ContentLayout,
} from "@/components";

export default function UserPage() {
  const { data, error } = getUser();

  if (error) {
    return <div>Error loading user data</div>;
  }

  return (
    <ContentLayout title="Usuario">
      {data && (
        <Card>
          <CardHeader>
            <CardTitle>Usuario</CardTitle>
          </CardHeader>
          <CardContent>
            <div>Nombre: {data.name}</div>
            <div>Email: {data.email}</div>
            <div>Nombre del negocio: {data.businesses[0].name}</div>
          </CardContent>
          <CardFooter>{/* Add any footer content if needed */}</CardFooter>
        </Card>
      )}
    </ContentLayout>
  );
}
