"use client";
import { IProductCart } from "@/shared/types";
import { formatPrice } from "@/shared/utils";
import Image from "next/image";
import React, { useState } from "react";
import { MinusSquare, PlusSquare, Trash } from "lucide-react";
import { toast } from "sonner";
import { Session } from "next-auth";
import Link from "next/link";
import Confirmation from "../Modals/Confirmation";
import { useRouter } from "next/navigation";
import { handleItemCart } from "@/shared/actions";

interface Props extends IProductCart {
  session: Session;
}

const Card = ({ session, ...props }: Props) => {
  const { refresh } = useRouter();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [processing, setIsProcessing] = useState(false);

  const handleDeleteItemCart = async () => {
    if (!session) return toast.error("Necesitas iniciar sesión para continuar");
    setIsProcessing(true);
    try {
      const res = await fetch(
        `/api/v1/cart?itemId=${props.id}&userId=${session.user.id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        toast.success("Producto eliminado del carrito correctamente");
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
      refresh();
    } catch (error) {
      toast.error("Se produjo un error al agregar el producto al carrito");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col h-auto md:flex-row md:flex-wrap max-[365px]:border-b-2 border-black p-2 md:p-4 gap-4">
      <div className="relative w-full md:w-36 aspect-square">
        <Image
          layout="fill"
          src={props.product.images[0]}
          alt={props.product.title}
        />
      </div>
      <div className="flex flex-col flex-1 relative">
        <div className="md:max-w-[50%] flex flex-col md:absolute top-0 left-0">
          <Link
            href={`/product/${props.productSlug}`}
            className="font-bold hover:text-rose-600 transition-all"
          >
            {props.product.title}
          </Link>
          <span className="text-gray-600">{props.size}</span>
          <span className="text-gray-600">{props.product.gender}</span>
          <span className="text-gray-600">
            {formatPrice(props.product.price)}
          </span>
        </div>
        <div className="md:max-w-[50%] md:absolute bottom-0 right-0">
          <span className="text-gray-600">(x{props.quantity})</span>{" "}
          <span>{formatPrice(props.quantity * props.product.price)}</span>
        </div>
        <div className="self-center md:max-w-[50%] w-max flex items-center md:absolute top-0 right-0 border-2 rounded-md border-gray-200">
          <button
            type="button"
            className="disabled:opacity-50"
            disabled={
              props.product.inStock === 0 || props.quantity === 1 || processing
            }
            onClick={() =>
              handleItemCart({
                session,
                quantity: props.quantity - 1,
                size: props.size,
                productSlug: props.productSlug,
                setIsProcessing,
                refresh,
              })
            }
          >
            <MinusSquare size={40} />
          </button>
          <span className="w-16 text-center rounded">{props.quantity}</span>
          <button
            type="button"
            className="disabled:opacity-50"
            disabled={props.product.inStock === props.quantity || processing}
            onClick={() =>
              handleItemCart({
                session,
                quantity: props.quantity + 1,
                size: props.size,
                productSlug: props.productSlug,
                setIsProcessing,
                refresh,
              })
            }
          >
            <PlusSquare size={40} />
          </button>
        </div>
        <div className="mt-6 md:m-0 self-center md:max-w-[50%] md:absolute bottom-0 left-0">
          <button
            type="button"
            disabled={processing}
            className="flex gap-1 items-center text-gray-600"
            onClick={() => setDeleteConfirmation(true)}
          >
            <Trash />
            Remove
          </button>
        </div>
      </div>
      {deleteConfirmation && (
        <Confirmation
          title="Eliminar Producto"
          message="¿Estás seguro de que deseas eliminar este producto de tu carrito de compras? Ten en cuenta que este producto se eliminará del carrito, pero aún puedes agregarlo nuevamente en el futuro si lo necesitas."
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={handleDeleteItemCart}
          onCancel={() => setDeleteConfirmation(false)}
        />
      )}
    </div>
  );
};

export { Card };
