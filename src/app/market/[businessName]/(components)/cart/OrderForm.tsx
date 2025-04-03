"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { MyFormItem } from "./MyFormItem";

import { useEffect, useState } from "react";
import { sendMessage } from "./SendMessage";
import { useCartStore } from "@/stores/useCartStore";
import { DevTool } from "@hookform/devtools";
import { useStore } from "@/hooks/use-store";
import { Button, Form, FormField } from "@/components";
import { MyFormItem } from "@/components/MyFormItem";
import { z } from "zod";
import { useCreateOrder } from "@/actions";

export const formOrderSchema = z.object({
  name: z.string().min(5, "Ingrea nombre completo").max(50),
  // number: z.string().min(10,'Ingresa tu numero').max(50),
  delivery_method: z.string().min(2).max(50),
  address: z.string().optional(),
  floor: z.string().optional(),
  references: z.string().optional(),
  pay_method: z.string().min(2).max(50),
});

export type Order = z.infer<typeof formOrderSchema>;

export const OrderForm = ({ businessName }: { businessName: string }) => {
  const { mutate: create, isSuccess, data } = useCreateOrder();
  const [deliveryMethod, setDeliveryMethod] = useState<string>();
  const form = useForm<Order>({
    resolver: zodResolver(formOrderSchema),
    defaultValues: {
      name: "",
      delivery_method: "",
      address: "",
      floor: "",
      references: "",
      pay_method: "",
    },
  });
  const cart = useStore(useCartStore, (state) => state.cart);
  const total = useStore(useCartStore, (state) => state.totalPrice);
  const onSubmit = async (values: Order) => {
    const { address, delivery_method, name, pay_method, floor, references } =
      values;
    create({
      orderDto: {
        buyerInfo: {
          address: `${address}-${floor}-${references}`,
          delivery_method,
          name,
          pay_method,
        },
        businessName,
        products: cart.map(
          ({ amount, brand, description, id, price, quantity, tipo }) => ({
            amount,
            brand,
            description,
            id,
            price,
            quantity,
            tipo,
          })
        ),
      },
    });
  };
  useEffect(() => {
    if (isSuccess) {
      sendMessage({
        infoOrder: form.getValues(),
        cart: cart!,
        totalPrice: total!,
        IdOrder: data!.id,
        businessName,
      });
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-col gap-4 md:w-2/5 max-md:w-full max-md:px-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onError={(error) => console.log(error)}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <MyFormItem field={field} label="Nombre y apellido" />
            )}
          />

          <FormField
            control={form.control}
            name="delivery_method"
            render={({ field }) => (
              <MyFormItem field={field} setDeliveryMethod={setDeliveryMethod} />
            )}
          />
          {deliveryMethod === "envio" && (
            <>
              <p>
                Costo del envio $1000 (puede variar dependiendo de la distancia)
              </p>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <MyFormItem field={field} label="Direccion y calle" />
                )}
              />
              <FormField
                control={form.control}
                name="floor"
                render={({ field }) => (
                  <MyFormItem field={field} label="Piso / Departamento" />
                )}
              />
              <FormField
                control={form.control}
                name="references"
                render={({ field }) => (
                  <MyFormItem field={field} label="Referencias" />
                )}
              />
            </>
          )}

          <FormField
            control={form.control}
            name="pay_method"
            render={({ field }) => (
              <MyFormItem field={field} label="Forma de pago" />
            )}
          />
          <Button type="submit">Realizar pedido</Button>
          {/* <DevTool control={form.control} /> */}
        </form>
      </Form>
    </div>
  );
};
