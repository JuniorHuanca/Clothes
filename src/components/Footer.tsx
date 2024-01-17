import { Facebook, Github, Instagram, Shirt, Twitter } from "lucide-react";
import Link from "next/link";
import Tooltip from "./Tooltip";

type Props = {};

const Footer = (props: Props) => {
  const links = [
    { name: "Inicio", route: "/" },
    { name: "Productos", route: "/products" },
    { name: "Ofertas", route: "/special-offers" },
    { name: "Carrito", route: "/cart" },
    // { name: "Finalizar Compra", route: "/checkout" },
    // { name: "Mi Cuenta", route: "/my-account" },
    // { name: "Ayuda/Soporte", route: "/help" },
    // { name: "Seguimiento de Pedidos", route: "/order-tracking" },
    // { name: "Blog", route: "/blog" },
    { name: "Contacto", route: "/contact" },
  ];
  return (
    <footer>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-teal-600">
          <Shirt size={50} fill="currentColor" />
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
          consequuntur amet culpa cum itaque neque.
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {links.map((e) => (
            <li key={e.name}>
              <Link
                className="text-gray-700 transition hover:text-gray-700/75"
                href={e.route}
              >
                {e.name}
              </Link>
            </li>
          ))}
        </ul>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">Facebook</span>
              <Tooltip
                text="Facebook"
                icon={<Facebook />}
                alignment="top"
              />
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">Instagram</span>
              <Tooltip
                text="Instagram"
                icon={<Instagram />}
                alignment="top"
              />
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">Twitter</span>
              <Tooltip
                text="Twitter"
                icon={<Twitter />}
                alignment="top"
              />
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-gray-700 transition hover:text-gray-700/75"
            >
              <span className="sr-only">GitHub</span>
              <Tooltip
                text="GitHub"
                icon={<Github />}
                alignment="top"
              />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
