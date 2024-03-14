"use client";
import { IProductCart } from "@/shared/types";
import { calcularSubtotal, formatPrice } from "@/shared/utils";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  cart: IProductCart[];
  session: Session;
};

const Summary = ({ cart, session }: Props) => {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const subtotalTotal = calcularSubtotal(cart);
  const descuentoTotal = 0;
  const total = subtotalTotal - descuentoTotal;
  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      // const response = await postPayment({
      //   cart: cart,
      //   session: session,
      // });
      // if (response.status === 200) {
      //   router.push(`/checkout?orderId=${response.data.id}`);
      //   toast.loading("Redirigiendo...", { duration: 2000 });
      // }
    } catch (error) {
      toast.error("Ocurrió un error. Por favor, inténtelo nuevamente.");
    } finally {
      setIsProcessing(false);
    }
  };
  return (
    <div className="p-6 flex flex-col text-gray-600 bg-gray-50">
      <div>
        <p className="flex justify-between my-2 text-base">
          <span>Subtotal</span>
          <span>{formatPrice(subtotalTotal)}</span>
        </p>
        <p className="flex justify-between my-2">
          <span>Descuentos</span>
          <span>{formatPrice(descuentoTotal)}</span>
        </p>
        {/* <p className="flex justify-between my-2">
      <span>Taxes</span>
      <span>{formatPrice(0)}</span>
    </p> */}
        <hr className="my-4" />
        <p className="flex justify-between mb-4 text-base">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </p>
      </div>
      <button
        type="button"
        className="inline-flex justify-center text-white p-4 bg-rose-600 hover:bg-rose-400 text-center disabled:opacity-50 disabled:bg-black"
        onClick={handleCheckout}
        disabled={isProcessing}
      >
        {isProcessing ? "Cargando..." : "Continuar compra"}
      </button>
    </div>
  );
};

export { Summary };
