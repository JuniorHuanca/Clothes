import { IOrder } from "@/shared/types";
import { formatDate } from "@/shared/utils";

interface Props extends IOrder {
  onSelect: () => void;
  selected: boolean;
  isOneSelected: number;
}

const Order = (props: Props) => {
  return (
    <div
      className={`max-w-2xl w-full p-2 rounded overflow-hidden shadow-lg text-white bg-indigo-800 ${
        props.selected
          ? "bg-indigo-800 ring-offset-2 ring-offset-white ring-indigo-800 ring-2"
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
      <p>
        <span className="font-semibold">Usuario:</span> {props.user.name}
      </p>
      <p>
        <span className="font-semibold">Precio Total:</span> ${props.totalPrice}
      </p>
      <p>
        <span className="font-semibold">Estado:</span> {props.status}
      </p>
      <p>
        <span className="font-semibold">Fecha:</span>{" "}
        {formatDate(props.createdAt)}
      </p>
      <div className="p-2">
        <p className="text-base">{props.description}</p>
      </div>
      <div>
        {props.products.map((e) => (
          <div key={e.id}>
            <img
              src={e.product.images[0]}
              alt={e.product.title}
              className="h-24 w-24 aspect-square"
            />
            <p>{e.product.title}</p>
            <p>{e.size}</p>
            <p>{e.quantity}</p>
          </div>
        ))}
      </div>
      {!props.deliveryUser && (
        <div className="p-2 font-bold text-xl mb-2">No definido</div>
      )}
      {props.deliveryUser && (
        <div className="p-2 font-bold text-xl mb-2">
          {props.deliveryUser.name}
        </div>
      )}
    </div>
  );
};

export default Order;
