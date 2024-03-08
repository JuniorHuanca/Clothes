import {
  BadgeDollarSign,
  Globe,
  Rocket,
  Brush,
  Shirt,
  Store,
} from "lucide-react";
import Link from "next/link";

type Props = {};

const TypesCollection = (props: Props) => {
  const items = [
    {
      icon: <Store />,
      title: "Moda para Todos",
      description: "Encuentra prendas para todas las edades y géneros.",
    },
    {
      icon: <Shirt />,
      title: "Ropa de Calidad",
      description: "Explora nuestra colección de prendas de alta calidad.",
    },
    {
      icon: <BadgeDollarSign />,
      title: "Ropa Económica",
      description:
        "Descubre nuestra colección de prendas a precios accesibles.",
    },
    {
      icon: <Rocket />,
      title: "Envío Rápido",
      description: "Disfruta de entregas rápidas en todos tus pedidos.",
    },
    {
      icon: <Brush />,
      title: "Estilo Único",
      description: "Descubre prendas con diseños exclusivos y originales.",
    },
    {
      icon: <Globe />,
      title: "Tallas Variadas",
      description: "Encuentra prendas en una amplia gama de tallas.",
    },
  ];
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
          <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left lg:text-right">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Explora nuestra colección
            </h2>

            <p className="mt-4 text-gray-600">
              Descubre las últimas tendencias en moda para hombre y mujer en
              nuestra amplia colección.
            </p>

            <Link
              href="/products"
              className="mt-8 inline-block rounded bg-rose-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-rose-700"
            >
              ¡Empezar a comprar!
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {items.map((item) => (
              <div
                className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring"
                key={item.title}
              >
                <span className="inline-block rounded-lg bg-gray-50 p-3 text-rose-600">
                  {item.icon}
                </span>
                <h2 className="mt-2 font-bold">{item.title}</h2>
                <p className="hidden sm:mt-1 sm:block sm:text-sm sm:text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export { TypesCollection };
