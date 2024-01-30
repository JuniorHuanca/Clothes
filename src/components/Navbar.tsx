"use client";
import { CircleUser, LogOut, Menu, Shirt } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "./Tooltip";

type Props = {};

const Navbar = (props: Props) => {
  const { data: session } = useSession();
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
    <header>
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-rose-600" href="/">
              <span className="sr-only">Home</span>
              <Shirt size={48} />
            </Link>
          </div>

          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {links.map((e) => (
                <li key={e.name}>
                  <Link
                    title={`Ir a ${e.name}`}
                    className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-rose-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left hover:text-rose-600 text-base text-gray-700"
                    href={e.route}
                  >
                    {e.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {!session && (
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <button
                  type="button"
                  className="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  onClick={() => signIn()}
                >
                  Iniciar sesión
                </button>

                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600"
                    href="/auth/register"
                  >
                    Registrarse
                  </Link>
                </div>
              </div>

              <div className="block md:hidden">
                <button
                  type="button"
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                >
                  <Menu />
                </button>
              </div>
            </div>
          )}
          {session && (
            <div>
              {!session.user.image && <CircleUser size={40} />}
              {session.user.image && (
                <Image
                  src={session.user.image}
                  height={40}
                  width={40}
                  alt={session.user.name}
                  className="rounded-full"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
