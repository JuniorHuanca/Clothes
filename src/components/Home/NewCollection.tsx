import { baseProducts } from "@/data/products";
import Link from "next/link";

type Props = {};

const NewCollection = (props: Props) => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            ¡Nueva Colección!
          </h2>

          <p className="mx-auto mt-4 max-w-md text-gray-500">
            Descubre lo último en tendencias de moda con nuestra nueva
            colección. ¡No te pierdas nuestras piezas exclusivas que te harán
            destacar esta temporada!
          </p>
        </header>

        <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {baseProducts.slice(40, 43).map((prod) => (
            <li
              key={prod.slug}
              className="last:lg:col-span-2 last:lg:col-start-2 last:lg:row-span-2 last:lg:row-start-1"
            >
              <Link
                href={`/product/${prod.slug}`}
                className="group relative block"
              >
                <img
                  src={prod.images[0]}
                  loading="lazy"
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-rose-600 [text-shadow:_0_0_10px_var(--tw-shadow-color)]">
                    {prod.title}
                  </h3>

                  <span className="mt-1.5 inline-block bg-rose-600 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                    Shop Now
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export { NewCollection };
