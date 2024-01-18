import { IOrder } from "@/shared/types";

interface Props extends IOrder {
  onSelect: () => void;
  selected: boolean;
  isOneSelected: number;
}

const Order = (props: Props) => {
  return (
    <div
      className={`max-w-xs rounded overflow-hidden shadow-lg m-4 text-white bg-indigo-800 ${
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
      {/* <img src={image} alt={name} className="w-full h-48 object-cover" /> */}
      <div className="p-2">
        <p className="text-base">{props.description}</p>
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
