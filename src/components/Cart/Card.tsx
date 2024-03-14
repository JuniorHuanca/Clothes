"use client";
import { IProductCart } from "@/shared/types";
import { formatPrice } from "@/shared/utils";
import Image from "next/image";
import React, { useState } from "react";
import { MinusSquare, PlusSquare, Trash } from "lucide-react";
import { toast } from "sonner";
import { Session } from "next-auth";
import Link from "next/link";

interface Props extends IProductCart {
  session: Session;
}

const Card = ({ session, ...props }: Props) => {
  const [quantity, setQuantity] = useState(props.quantity);
  const handleItemCart = async () => {
    if (!session) return toast.error("Necesitas iniciar sesión para continuar");
    // setIsProcessing(true);
    try {
      const res = await fetch(`/api/v1/cart`, {
        method: "POST",
        body: JSON.stringify({
          userId: session.user.id,
          product: {
            quantity,
            size: props.size,
            productSlug: props.product.slug,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        toast.success("Producto añadido al carro correctamente");
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
      // refresh();
    } catch (error) {
      toast.error("Se produjo un error al agregar el producto al carrito");
    } finally {
      // setIsProcessing(false);
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
            className=""
            disabled={props.product.inStock === 0 || quantity === 0}
            // onClick={() => handleQuantity(quantity - 1)}
          >
            <MinusSquare size={40} />
          </button>
          <span className="w-16 text-center rounded">{quantity}</span>
          <button
            type="button"
            className=""
            disabled={props.product.inStock === 0 || quantity === 0}
            // onClick={() => handleQuantity(quantity - 1)}
          >
            <PlusSquare size={40} />
          </button>
        </div>
        <div className="mt-6 md:m-0 self-center md:max-w-[50%] md:absolute bottom-0 left-0">
          <button
            type="button"
            className="flex gap-1 items-center text-gray-600"
            // onClick={() => setDeleteConfirmation(true)}
          >
            <Trash />
            Remove
          </button>
        </div>
      </div>
      {/* {deleteConfirmation && (
        <DeleteConfirmation
          title="Eliminar Producto"
          message="¿Estás seguro de que deseas eliminar este producto de tu carrito de compras? Ten en cuenta que este producto se eliminará del carrito, pero aún puedes agregarlo nuevamente en el futuro si lo necesitas."
          confirmText="Eliminar"
          cancelText="Cancelar"
          onConfirm={() =>
            handleDelete({
              ...propsForFunctions,
            })
          }
          onCancel={() => setDeleteConfirmation(false)}
        />
      )} */}
    </div>
  );
};

export { Card };
