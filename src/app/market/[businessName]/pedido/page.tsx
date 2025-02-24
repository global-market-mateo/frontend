"use client";
import { useStore } from "@/hooks/use-store";
import { useCartStore } from "@/stores/useCartStore";
import { Cart } from "../(components)/cart/Cart";
import { OrderForm } from "../(components)/cart/OrderForm";

export default function PedidoPage({
  params: { businessName },
}: {
  params: { businessName: string };
}) {
  const totalPrice = useStore(useCartStore, (state) => state.totalPrice);
  return (
    <div className="flex flex-col gap-4 md:w-4/5 max-w-[800px] ">
      {!totalPrice ? (
        <section className="mt-5 text-center h-[30vh] flex flex-col justify-center bg-gray-500 rounded-xl">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Agrega productos al carrito para realizar tu compra
          </h2>
        </section>
      ) : (
        <>
          <Cart />
          <OrderForm businessName={businessName} />
        </>
      )}
    </div>
  );
}
