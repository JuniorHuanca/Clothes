import useDeliveries from "@/hooks/useDeliveries";
import { IUser } from "@/shared/types";
import { useState } from "react";

type Props = {
  selectedDelivery: IUser | null;
  setSelectedDelivery: (value: IUser) => void;
  onConfirm: () => void;
  onCancel: () => void;
};
const Deliveries = ({
  onCancel,
  onConfirm,
  selectedDelivery,
  setSelectedDelivery,
}: Props) => {
  const deliveries = useDeliveries();
  const [search, setSearch] = useState("");

  return (
    <div className="flex justify-center items-center fixed top-0 right-0 w-screen h-screen bg-black/30 z-50 text-black">
      <div
        className={`w-full sm:w-[40%] max-w-[500px] h-auto bg-white p-6 rounded-lg`}
      >
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-semibold">
            <span className="underline">Repartidores</span>
          </h2>
          <p>Eliga el repartidor</p>
          <div className="">
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="top-0 flex flex-col gap-2 h-60 overflow-y-auto p-2">
              {deliveries.map((delivery) => (
                <button
                  type="button"
                  className={`p-2 rounded-lg text-white ${
                    selectedDelivery?.id === delivery.id
                      ? "bg-indigo-800 ring-offset-2 ring-offset-white ring-indigo-800 ring-2"
                      : "bg-gray-800"
                  }`}
                  key={delivery.id}
                  value={delivery.id}
                  onClick={() => setSelectedDelivery(delivery)}
                >
                  {delivery.name}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-evenly">
            <button
              className="p-3 rounded-lg bg-green-500 hover:bg-green-600 text-white"
              type="button"
              onClick={onConfirm}
            >
              Guardar
            </button>
            <button
              className="p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              type="button"
              onClick={onCancel}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deliveries;
