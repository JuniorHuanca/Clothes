import Breadcrumb from "@/components/Breadcrumb";
import Card from "@/components/Products/Card";
import { baseProducts } from "@/data/products";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Productos",
};

const Products = (props: Props) => {
  return (
    <div className="min-h-screen sm:p-3">
      <Breadcrumb />
      <div className="flex">
        {/* <div className="bg-red-500 w-60 min-h-screen flex-none"></div> */}
        <div>
          <h1 className="text-xl sm:text-3xl font-bold mb-4">
            Todos los productos
          </h1>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {baseProducts.map((product) => (
              <Card key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
