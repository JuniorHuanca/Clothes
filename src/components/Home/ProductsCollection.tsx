import { baseProducts } from "@/data/products";
import { formatPrice } from "@/shared/utils";
import Link from "next/link";
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
            <li key={prod.slug}>
              <Link
                href={`/product/${prod.slug}`}
                className="group block overflow-hidden"
              >
                <img
                  src={prod.images[0]}
                  alt=""
                  className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
                />

                <div className="relative bg-white pt-3">
                  <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
                    {prod.title}
                  </h3>

                  <p className="mt-2">
                    <span className="sr-only"> Regular Price </span>

                    <span className="tracking-wider text-gray-900">
                      {formatPrice(prod.price)}
                    </span>
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export { ProductsCollection };
