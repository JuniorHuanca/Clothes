import { useFetch } from "@/hooks/useFetch";
import { authOptions } from "@/shared/authOptions";
import { IOrder, IProductOrder } from "@/shared/types";
import { formatDate, formatPrice } from "@/shared/utils";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";

type Props = {};

const Product = (props: IProductOrder) => {
  return (
    <div className="flex">
      <img
        src={props.product.images[0]}
        alt={props.productSlug}
        className="w-32 h-32"
      />
      <div className="flex-1 p-2">
        <p>{props.product.title}</p>
        <p>
          <span className="font-bold text-sm">Precio: </span>
          {formatPrice(props.product.price)}
        </p>
        <p>
          <span className="font-bold text-sm">Unidades: </span>
          {props.quantity}
        </p>
        <p>
          <span className="font-bold text-sm">Talla: </span>
          {props.size}
        </p>
      </div>
    </div>
  );
};

const Orders = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const orders = await useFetch<IOrder[]>(
    `/api/v1/orders?userId=${session?.user.id}`
  );
  if (typeof orders !== "object") {
    notFound();
  }

  return (
    <div>
      {orders.map((e) => (
        <div className="flex flex-wrap" key={e.id}>
          <div className="w-full sm:w-1/3 lg:w-1/5 p-3">
            <span className="font-bold">Fecha</span>
            <p>{formatDate(e.createdAt)}</p>
            <span className="font-bold">Estado</span>
            <p>{e.status}</p>
          </div>
          <div className="w-full sm:w-1/3 lg:w-1/5 p-3">
            <span className="font-bold">Usuario</span>
            <p className="line-clamp-1">{e.user.name}</p>
            <p>{e.user.email}</p>
          </div>
          <div className="w-full sm:w-1/3 lg:w-1/5 p-3">
            <span className="font-bold">Repartidor</span>
            {e.deliveryUser ? (
              <p className="line-clamp-1">{e.deliveryUser.name}</p>
            ) : (
              <p>No asignado</p>
            )}
          </div>
          <div className="w-full lg:w-2/5 p-3 flex-1">
            <span className="font-bold">Productos</span>
            <details className="group max-h-96 overflow-y-auto">
              <summary className="block">
                <div>
                  {e.products.length > 1 && (
                    <span className="hidden group-open:block font-bold hover:cursor-pointer">
                      Ver menos
                    </span>
                  )}
                  <Product key={e.products[0].id} {...e.products[0]} />
                  {e.products.length > 1 && (
                    <span className="group-open:hidden font-bold hover:cursor-pointer">
                      Ver más
                    </span>
                  )}
                </div>
              </summary>
              <div>
                {e.products.slice(1).map((product) => (
                  <Product key={product.id} {...product} />
                ))}
              </div>
            </details>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
