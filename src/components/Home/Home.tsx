import Link from "next/link";

type Props = {};

const Home = (props: Props) => {
  return (
    <section className="relative bg-[url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80)] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/50 sm:bg-transparent sm:from-white/50 sm:to-white/25 ltr:sm:bg-gradient-to-r sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left sm:text-right">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Descubre tu estilo con
            <strong className="block font-extrabold text-rose-700">
              Nuestra moda.
            </strong>
          </h1>

          <p className="mt-4 max-w-lg sm:text-xl/relaxed">
            Explora nuestra selección de prendas de alta calidad y encuentra lo
            último en tendencias de moda para esta temporada.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              href="/products"
              className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              ¡Empieza a comprar!
            </Link>

            <Link
              href="/contact"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
            >
              Más información
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Home };
