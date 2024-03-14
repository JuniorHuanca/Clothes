import { Card, Summary } from "@/components/Cart";
import { useFetch } from "@/hooks/useFetch";
import { authOptions } from "@/shared/authOptions";
import { IProductCart } from "@/shared/types";
import { User } from "lucide-react";
import { getServerSession } from "next-auth";

type Props = {};

const Cart = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const cart = await useFetch<{ products: IProductCart[] }>(
    `/api/v1/cart?userId=${session?.user.id}`
  );
  return (
    <>
      {!session && (
        <div className="max-w-screen-xl mx-auto w-full flex justify-center items-center h-screen bg-gradient-to-br from-rose-500 to-rose-600 text-white">
          <div className="text-center">
            <User size={48} className="text-white mx-auto mb-4" />
            <h2 className="text-4xl font-semibold mb-4">
              Por favor, inicia sesión
            </h2>
            <p className="text-lg mb-8">Para acceder a tu carrito de compras</p>
          </div>
        </div>
      )}
      {session && (
        <div className="max-w-screen-xl mx-auto w-full lg:flex gap-4">
          <div className="flex-1 bg-gray-50">
            <h2 className="text-2xl font-bold p-4">Carrito de Compras</h2>
            <hr />
            <div className="flex-1 flex flex-col gap-2">
              {cart.products.map((product, index) => (
                <div key={index}>
                  <Card session={session} {...product} />
                  <hr />
                </div>
              ))}
            </div>
          </div>
          <div className="lg:w-1/4 relative">
            <div className="flex flex-col gap-y-8 sticky top-0">
              <Summary cart={cart.products} session={session} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
