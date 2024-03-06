import { IProduct } from "@/shared/types";
import { MinusSquare, PlusSquare } from "lucide-react";

type Props = {
  product: IProduct;
};

const CartLogic = ({ product }: Props) => {
  return (
    <div>
      <div className="flex gap-2">
        {product.sizes.map((size) => (
          <button
            key={size}
            type="button"
            className="hover:bg-rose-600 hover:text-white text-lg bg-slate-200 p-2 rounded-md"
          >
            {size}
          </button>
        ))}
      </div>
      <div className="flex">
        <button type="button" disabled={product.inStock === 0}>
          <MinusSquare size={30} />
        </button>
        <span className="w-20 m-3 px-5 py-1 bg-slate-200 text-center rounded">
          {product.inStock}
        </span>
        <button type="button" disabled={product.inStock === 0}>
          <PlusSquare size={30} />
        </button>
      </div>
      <p className="text-lg mb-1">
        {product.inStock > 0
          ? `Disponibles: ${product.inStock}`
          : "Producto agotado temporalmente"}
      </p>
      <button
        type="button"
        className="rounded-md bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow disabled:opacity-50"
        disabled={product.inStock === 0}
      >
        {product.inStock ? "Agregar al carrito" : "Producto Agotado"}
      </button>
    </div>
  );
};

export default CartLogic;
