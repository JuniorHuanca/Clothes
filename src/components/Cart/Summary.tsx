"use client";
import { IProductCart } from "@/shared/types";
import { calcularSubtotal, formatPrice } from "@/shared/utils";
import { Session } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import getStripe from "@/shared/stripe";

type Props = {
  cart: IProductCart[];
  session: Session;
};

const Summary = ({ cart, session }: Props) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const subtotalTotal = calcularSubtotal(cart);
  const descuentoTotal = 0;
  const total = subtotalTotal - descuentoTotal;
  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      // validate the cart
      if (cart.some((c) => c.quantity > c.product.inStock)) {
        return toast.error(
          "Lo sentimos, uno de los productos en su carrito está agotado o excede la cantidad disponible en stock.",
          { duration: 10000 }
        );
      }
      const stripe = await getStripe();
      if (!stripe)
        return toast.error(
          "Ocurrió un error. Por favor, inténtelo nuevamente."
        );
      const response = await fetch("/api/v1/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart, session }),
      });
      const data = await response.json();

      if (!response.ok) return toast.error(data.message);
      toast.loading("Redirecting...");

      stripe.redirectToCheckout({ sessionId: data.checkoutSession.id });
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
        disabled={isProcessing || !cart.length}
      >
        {isProcessing ? "Cargando..." : "Continuar compra"}
      </button>
    </div>
  );
};

export { Summary };
