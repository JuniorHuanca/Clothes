"use client";
import { CircleUser, LogOut, Menu, Search, Shirt } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Tooltip from "./Tooltip";
import { useState } from "react";

type Props = {};

const Navbar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(true);
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

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSearch(!isSearch)}
              className=""
            >
              <Search size={40} />
            </button>
            {!session && (
              <div className="sm:flex sm:gap-4">
                <button
                  type="button"
                  className="rounded-md bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow"
                  onClick={() => signIn()}
                >
                  Iniciar sesión
                </button>

                <div className="hidden sm:flex">
                  <Link
                    className="rounded-md bg-rose-100 px-5 py-2.5 text-sm font-medium text-rose-600"
                    href="/auth/register"
                  >
                    Registrarse
                  </Link>
                </div>
              </div>
            )}
            {session && (
              <details className="relative flex flex-col">
                <summary className="block cursor-pointer">
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
                </summary>
                <div className="absolute flex flex-col gap-2 top-10 z-10 right-0 bg-white p-2 border-2 rounded-md w-72">
                  {session.user.role.routes.includes("/dashboard") && (
                    <Link
                      href="/dashboard"
                      className="rounded-md bg-indigo-100 px-5 py-2.5 text-sm text-center font-medium text-indigo-800"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    type="button"
                    className="rounded-md bg-rose-100 px-5 py-2.5 text-sm font-medium text-rose-600"
                    onClick={() => signOut()}
                  >
                    Cerrar sesión
                  </button>
                </div>
              </details>
            )}
            <div className="block md:hidden">
              <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
              >
                <Menu />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${
          isSearch ? "flex" : "hidden"
        } gap-1 justify-center p-2 w-full`}
      >
        <input
          type="text"
          placeholder="Search for..."
          className="w-full sm:w-auto border p-2"
        />
        <button type="button" className="border p-2">
          Buscar
        </button>
      </div>

      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col p-4 gap-4 text-sm">
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
    </header>
  );
};

export default Navbar;
