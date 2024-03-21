"use client";
import { IOrder, IUser } from "@/shared/types";
import Order from "./Order";
import { useState } from "react";
import Deliveries from "@/components/Modals/Deliveries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ChevronDown, UserMinus, UserPlus } from "lucide-react";
import Confirmation from "@/components/Modals/Confirmation";

type Props = { data: IOrder[] };
const Orders = ({ data }: Props) => {
  const router = useRouter();
  const [showModalDeliveries, setShowModalDeliveries] = useState(false);
  const [ordersSelecteds, setOrdersSelecteds] = useState<IOrder[]>([]);
  const [selectedDelivery, setSelectedDelivery] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [removeAssignConfirmation, setRemoveAssignConfirmation] =
    useState(false);
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
        <div className="flex items-center justify-between p-4 bg-indigo-800 w-full text-white">
          <span>
            Seleccionados: {ordersSelecteds.length} / {data.length}
          </span>
          <details className="relative group">
            <summary className="flex cursor-pointer items-center justify-between bg-white p-2 text-gray-900 transition rounded">
              <span className="text-sm font-medium">Entrega</span>
              <span className="transition group-open:-rotate-180">
                <ChevronDown />
              </span>
            </summary>
            <div className="hidden group-open:flex flex-col w-48 absolute left-1/2 transform -translate-x-1/2 bg-white text-black p-1 rounded-md shadow-md shadow-gray-700">
              <button
                type="button"
                className="flex gap-2 rounded-md p-1 hover:bg-slate-200"
                onClick={() => setShowModalDeliveries(true)}
                disabled={loading}
              >
                <UserPlus /> Asignar Repartidor
              </button>
              <button
                type="button"
                className="flex gap-3 rounded-md p-1 hover:bg-slate-200"
                onClick={() => setRemoveAssignConfirmation(true)}
                disabled={loading}
              >
                <UserMinus /> Quitar Repartidor
              </button>
            </div>
          </details>
          <button
            onClick={selectAll}
            className="bg-white text-indigo-800 py-2 px-4 rounded"
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
      <div className="flex flex-wrap justify-center gap-2 p-2">
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
      {removeAssignConfirmation && (
        <Confirmation
          title="Quitar repartidor"
          message="¿Está seguro de que desea quitar el repartidor de los pedidos seleccionados? Los pedidos quedarán sin un repartidor a partir de ahora. Podrá modificar esto más tarde si es necesario."
          confirmText="Aceptar"
          cancelText="Cancelar"
          onConfirm={handleRemoveAssign}
          onCancel={() => setRemoveAssignConfirmation(false)}
        />
      )}
    </>
  );
};

export default Orders;
