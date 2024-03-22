import { IOrder, ÏProductOrder } from "@/shared/types";
import { formatDate } from "@/shared/utils";

interface Props extends IOrder {
  onSelect: () => void;
  selected: boolean;
  isOneSelected: number;
}
const Product = (props: ÏProductOrder) => {
  return (
    <div className="flex">
      <img
        src={props.product.images[0]}
        alt={props.productSlug}
        className="w-32 h-32"
      />
      <div className="flex-1">
        <p>{props.product.title}</p>
        <p>{props.product.price}</p>
        <p>{props.quantity}</p>
        <p>{props.size}</p>
      </div>
    </div>
  );
};

const Order = (props: Props) => {
  return (
    <div
      className={`max-w-screen-xl w-full p-2 rounded overflow-hidden shadow-lg bg-slate-100 ${
        props.selected
          ? "bg-slate-200 ring-offset-2 ring-offset-white ring-indigo-800 ring-2"
          : ""
      }`}
      onDoubleClick={props.onSelect}
    >
      {props.isOneSelected > 0 && (
        <div className="p-2" style={{ userSelect: "none" }}>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={props.selected}
              onChange={props.onSelect}
              className="form-checkbox h-5 w-5 text-blue-500 cursor-pointer"
            />
            <span className="ml-2">Seleccionado</span>
          </label>
        </div>
      )}
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/3 lg:w-1/5 p-3">
          <span className="font-bold">Fecha</span>
          <p>{formatDate(props.createdAt)}</p>
          <span className="font-bold">Estado</span>
          <p>{props.status}</p>
        </div>
        <div className="w-full sm:w-1/3 lg:w-1/5 p-3">
          <span className="font-bold">Usuario</span>
          <p className="line-clamp-1">{props.user.name}</p>
          <p>{props.user.email}</p>
        </div>
        <div className="w-full sm:w-1/3 lg:w-1/5 p-3">
          <span className="font-bold">Repartidor</span>
          {props.deliveryUser ? (
            <p className="line-clamp-1">{props.deliveryUser.name}</p>
          ) : (
            <p>No asignado</p>
          )}
        </div>
        <div className="w-full lg:w-2/5 p-3 flex-1">
          <span className="font-bold">Productos</span>
          <details className="group max-h-96 overflow-y-auto">
            <summary className="block">
              <div>
                {props.products.length > 1 && (
                  <span className="hidden group-open:block font-bold hover:cursor-pointer">
                    Ver menos
                  </span>
                )}
                <Product key={props.products[0].id} {...props.products[0]} />
                {props.products.length > 1 && (
                  <span className="group-open:hidden font-bold hover:cursor-pointer">
                    Ver más
                  </span>
                )}
              </div>
            </summary>
            <div>
              {props.products.slice(1).map((product) => (
                <Product key={product.id} {...product} />
              ))}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default Order;
