import { Card, Summary } from "@/components/Cart";
import { useFetch } from "@/hooks/useFetch";
import { authOptions } from "@/shared/authOptions";
import { IProductCart } from "@/shared/types";
import { ShoppingCart, User } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

type Props = {};

const Cart = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const cart = await useFetch<{ products: IProductCart[] }>(
    `/api/v1/cart?userId=${session?.user.id}`
  );
  return (
    <>
      {!session && (
        <div className="flex items-center justify-center h-screen">
          <div className="bg-rose-600 p-8 rounded-lg text-center text-white shadow-xl animate-jump-in">
            <User
              size={48}
              className="text-white mx-auto mb-4 animate-jump-in animate-delay-1000"
            />
            <h2 className="text-3xl font-semibold animate-flip-up animate-delay-1000">
              Por favor, inicia sesión
            </h2>
            <p className="text-lg animate-flip-up animate-delay-1000">
              Para acceder a tu carrito de compras
            </p>
          </div>
        </div>
      )}
      {session && (
        <div className="max-w-screen-xl mx-auto w-full lg:flex gap-4">
          <div className="flex-1 bg-gray-50">
            <h2 className="text-2xl font-bold p-4">Carrito de Compras</h2>
            <hr />
            {(typeof cart !== "object" || !cart.products.length) && (
              <div className="text-center py-8">
                <ShoppingCart size={50} className="mx-auto mb-4" />
                <h2 className="text-2xl font-semibold mb-4">
                  Tu carrito está vacío
                </h2>
                <p className="text-lg mb-4">
                  ¡Agrega productos para comenzar a llenarlo!
                </p>

                <Link href="/products" className="mb-4 text-rose-600 underline">
                  Explorar productos
                </Link>
              </div>
            )}
            <div className="flex-1 flex flex-col gap-2">
              {cart.products?.map((product, index) => (
                <div key={index}>
                  <Card session={session} {...product} />
                  <hr />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/4 relative">
            <div className="flex flex-col gap-y-8 sticky top-0">
              <Summary cart={cart.products || []} session={session} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
