"use client";
import { IOrder, IUser } from "@/shared/types";
import Order from "./Order";
import { useState } from "react";
import useDeliveries from "@/hooks/useDeliveries";

type Props = { data: IOrder[] };
const Orders = ({ data }: Props) => {
  const deliveries = useDeliveries();
  const [ordersIds, setOrdersIds] = useState<number[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<IUser | null>(null);

  const toggleSelect = (orderId: number) => {
    setOrdersIds((prevSelected) => {
      if (prevSelected.includes(orderId)) {
        return prevSelected.filter((id) => id !== orderId);
      } else {
        return [...prevSelected, orderId];
      }
    });
  };

  const selectAll = () => {
    const allIds = data.map((e) => e.id);
    setOrdersIds((prevSelected) => {
      if (prevSelected.length === allIds.length) {
        // Desmarcar todos si todos están seleccionados
        return [];
      } else {
        // Marcar todos si no todos están seleccionados
        return allIds;
      }
    });
  };

  const isAllSelected = ordersIds.length === data.length;
  console.log(selectedDelivery);
  return (
    <>
      {ordersIds.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-blue-500">
          <div>
            Seleccionados: {ordersIds.length} / {data.length}
          </div>
          <div className="relative">
            <input value={selectedDelivery?.name} />
            <div className="absolute bg-yellow-500 top-0 flex flex-col gap-2 h-52 overflow-y-auto">
              <label>Seleccionar repartidor</label>
              {deliveries.map((delivery) => (
                <button
                  className="p-2 bg-green-500"
                  type="button"
                  key={delivery.id}
                  value={delivery.id}
                  onClick={() => setSelectedDelivery(delivery)}
                >
                  {delivery.name}
                </button>
              ))}
              {deliveries.map((delivery) => (
                <button
                  className="p-2 bg-green-500"
                  type="button"
                  key={delivery.id}
                  value={delivery.id}
                  onClick={() => setSelectedDelivery(delivery)}
                >
                  {delivery.name}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={selectAll}
            className="bg-white text-blue-500 py-2 px-4 rounded"
          >
            {isAllSelected ? "Desmarcar Todos" : "Marcar Todos"}
          </button>
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        {data.map((e) => (
          <Order
            key={e.id}
            onSelect={() => toggleSelect(e.id)}
            selected={ordersIds.includes(e.id)}
            isOneSelected={ordersIds.length}
            {...e}
          />
        ))}
        {data.length === 0 && (
          <p className="text-center">Usuarios no encontrados</p>
        )}
      </div>
    </>
  );
};

export default Orders;
