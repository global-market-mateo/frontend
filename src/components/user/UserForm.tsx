import { getUser } from "@/actions";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Settings } from "lucide-react";
import { Form, FormField } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "../ui/input";

const UserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  paymentMethods: z.string().min(1),
  deliveryMethods: z.string().min(1),
  businessName: z.string().min(1),
});

const UserForm = () => {
  const { data, error } = getUser();
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });
  if (error) {
    return <div>Error loading user data</div>;
  }

  const handleEditBusiness = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Editar negocio");
  };

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    console.log(values);
  };
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <CardTitle>Negocio</CardTitle>
        <Button
          onClick={handleEditBusiness}
          variant="outline"
          className="flex flex-row gap-2 m-0"
          style={{ margin: 0 }}
        >
          <Link className="flex flex-row gap-2" href="/dashboard/bussiness">
            <p>Editar</p>
            <Settings className="w-4 h-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            onError={(error) => console.log(error)}
            className={`flex flex-col gap-1 overflow-y-auto h-full`}
          >
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => <Input {...field} />}
            />
            <FormField
              control={form.control}
              name="paymentMethods"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <span>Metodo de pago :</span>
                  <Input {...field} />
                </div>
              )}
            />
            <FormField
              control={form.control}
              name="deliveryMethods"
              render={({ field }) => (
                <div className="flex flex-col gap-2">
                  <span>Metodo de entrega :</span>
                  <Input {...field} />
                </div>
              )}
            />
            <Button type="submit">Guardar</Button>
            
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default UserForm;
