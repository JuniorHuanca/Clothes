"use client";
import { handleItemCart } from "@/shared/actions";
import { IProduct, IProductCart } from "@/shared/types";
import { MinusSquare, PlusSquare } from "lucide-react";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  product: IProduct;
  item: IProductCart;
  session: Session | null;
};

const Logic = ({ product, item, session }: Props) => {
  const { refresh } = useRouter();
  const [quantity, setQuantity] = useState(0);
  const [size, setSize] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleQuantity = (value: number) => {
    setQuantity(value);
  };
  const handleSize = (value: string) => {
    setSize(value);
  };

  return (
    <>
      <div className="flex gap-2">
        {product.sizes.map((s) => (
          <button
            key={s}
            type="button"
            className={`hover:bg-rose-600 hover:text-white text-lg p-2 rounded-md ${
              s === size ? "bg-rose-600 text-white" : "bg-slate-200"
            }`}
            onClick={() => handleSize(s)}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="flex">
        <button
          type="button"
          disabled={product.inStock === 0 || quantity === 0}
          onClick={() => handleQuantity(quantity - 1)}
          className="disabled:opacity-50"
        >
          <MinusSquare size={30} />
        </button>
        <span className="w-20 m-3 px-5 py-1 bg-slate-200 text-center rounded">
          {quantity}
        </span>
        <button
          type="button"
          disabled={product.inStock <= quantity}
          onClick={() => handleQuantity(quantity + 1)}
          className="disabled:opacity-50"
        >
          <PlusSquare size={30} />
        </button>
      </div>
      <p className="text-lg mb-1">
        {product.inStock > 0
          ? `Disponibles: ${product.inStock}`
          : "Producto agotado temporalmente"}

        {typeof item === "object" && (
          <strong className="text-lg mb-1" key={item.quantity}>
            {" "}
            ¡Artículo en tu carrito!
          </strong>
        )}
      </p>

      <button
        type="button"
        className="rounded-md bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow disabled:opacity-50"
        disabled={
          product.inStock === 0 || quantity === 0 || !size || isProcessing
        }
        onClick={() =>
          handleItemCart({
            session,
            quantity,
            size,
            productSlug: product.slug,
            setIsProcessing,
            refresh,
          })
        }
      >
        {isProcessing
          ? "Procesando..."
          : product.inStock
          ? "Agregar al carrito"
          : "Producto Agotado"}
      </button>
    </>
  );
};

export default Logic;
