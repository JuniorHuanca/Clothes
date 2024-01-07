"use client";
import { IOrder, IUser } from "@/shared/types";
import Order from "./Order";
import { useState } from "react";
import Deliveries from "@/components/Modals/Deliveries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = { data: IOrder[] };
const Orders = ({ data }: Props) => {
  const router = useRouter();
  const [showModalDeliveries, setShowModalDeliveries] = useState(false);
  const [ordersSelecteds, setOrdersSelecteds] = useState<IOrder[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const hasDeliveryAssigned = () => {
    return ordersSelecteds.some(
      (e) =>
        e.deliveryUser !== null && e.deliveryUser.id !== selectedDelivery?.id
    );
  };
  const handleAssign = async () => {
    if (!selectedDelivery) {
      return toast.success(
        "Por favor, selecciona un repartidor antes de continuar."
      );
    }
    if (hasDeliveryAssigned()) {
      return toast.error(
        "Hay una incoherencia. Ya existe una orden con un repartidor asignado. ¿Desea continuar? Se asignará el repartidor seleccionado a las órdenes seleccionadas."
      );
    }
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/dashboard/orders/assign`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ordersIds: ordersSelecteds.map((e) => e.id),
          userId: selectedDelivery.id,
        }),
      });

      if (response.ok) {
        router.refresh();
        toast.success("Los pedidos se asignaron correctamente");
      } else {
        toast.error(response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setLoading(false);
      setShowModalDeliveries(false);
      setOrdersSelecteds([]);
      setSelectedDelivery(null);
    }
  };
  const handleRemoveAssign = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/v1/dashboard/orders/remove-assign`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ordersIds: ordersSelecteds.map((e) => e.id) }),
      });

      if (response.ok) {
        router.refresh();
        toast.success("Pedidos desasignados correctamente");
      } else {
        toast.error(response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    } finally {
      setLoading(false);
      setShowModalDeliveries(false);
      setOrdersSelecteds([]);
      setSelectedDelivery(null);
    }
  };
  const isIncluding = (order: IOrder) => {
    return ordersSelecteds.find((e) => e.id === order.id) !== undefined;
  };
  const toggleSelect = (order: IOrder) => {
    setOrdersSelecteds((prevSelected) => {
      if (isIncluding(order)) {
        return prevSelected.filter((id) => id !== order);
      } else {
        return [...prevSelected, order];
      }
    });
  };
  const selectAll = () => {
    const allIds = data.map((e) => e);
    setOrdersSelecteds((prevSelected) => {
      if (prevSelected.length === allIds.length) {
        // Desmarcar todos si todos están seleccionados
        return [];
      } else {
        // Marcar todos si no todos están seleccionados
        return allIds;
      }
    });
  };

  const isAllSelected = ordersSelecteds.length === data.length;
  return (
    <>
      {ordersSelecteds.length > 0 && (
        <div className="flex items-center justify-between p-4 bg-blue-500 w-full">
          <span>
            Seleccionados: {ordersSelecteds.length} / {data.length}
          </span>
          <details className="relative group">
            <summary className="flex cursor-pointer items-center justify-between bg-white p-2 text-gray-900 transition">
              <span className="text-sm font-medium">Entrega</span>
              {/* <span className="transition group-open:-rotate-180">icon</span> */}
            </summary>
            <div className="hidden group-open:flex flex-col w-44 absolute left-1/2 transform -translate-x-1/2 bg-yellow-500">
              <button
                type="button"
                className=""
                onClick={() => setShowModalDeliveries(true)}
                disabled={loading}
              >
                Asignar Repartidor
              </button>
              <button
                type="button"
                className=""
                onClick={handleRemoveAssign}
                disabled={loading}
              >
                Quitar Repartidor
              </button>
            </div>
          </details>
          <button
            onClick={selectAll}
            className="bg-white text-blue-500 py-2 px-4 rounded"
          >
            {isAllSelected ? "Desmarcar Todos" : "Marcar Todos"}
          </button>
          {showModalDeliveries && (
            <Deliveries
              onCancel={() => setShowModalDeliveries(false)}
              onConfirm={handleAssign}
              selectedDelivery={selectedDelivery}
              setSelectedDelivery={setSelectedDelivery}
            />
          )}
        </div>
      )}
      <div className="flex flex-wrap justify-center gap-2">
        {data.map((e) => (
          <Order
            key={e.id}
            onSelect={() => toggleSelect(e)}
            selected={isIncluding(e)}
            isOneSelected={ordersSelecteds.length}
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
