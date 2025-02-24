import { useUpdateOrder } from "@/actions";
import { Button } from "@/components";

export const ConfirmOrder = ({ orderId }: { orderId: string }) => {
  const { mutate } = useUpdateOrder(orderId);
  const confirmOrder = () => {
    mutate({
      id: orderId,
      orderDto: {
        isApproved: true,
      },
    });
  };
  return (
    <Button
      className="bg-green-600 hover:bg-green-700 text-gray-200"
      onClick={confirmOrder}
    >
      Confirmar pedido
    </Button>
  );
};
