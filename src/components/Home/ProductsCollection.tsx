import { baseProducts } from "@/data/products";
import { ProductCollection } from "./ProductCollection";
type Props = {};

const ProductsCollection = (props: Props) => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header>
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            Colección de Productos
          </h2>

          <p className="mt-4 max-w-md text-gray-500">
            Explora nuestra amplia selección de prendas de vestir y accesorios
            de moda. Desde ropa casual hasta elegantes trajes de noche, tenemos
            todo lo que necesitas para lucir espectacular en cualquier ocasión.
          </p>
        </header>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {baseProducts.slice(5, 9).map((prod) => (
            <ProductCollection key={prod.slug} {...prod} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export { ProductsCollection };
