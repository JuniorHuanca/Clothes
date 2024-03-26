"use client";
import { CircleUser, Menu, Search, Shirt } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { linksNavAndFooter } from "@/shared/data";
import UserActions from "./UserActions";

type Props = {};

const Navbar = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const { data: session } = useSession();
  return (
    <header>
      <div className="mx-auto max-w-screen-xl">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="block text-rose-600" href="/">
              <span className="sr-only">Home</span>
              <Shirt size={48} />
            </Link>
          </div>

          <div className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {linksNavAndFooter.map((e) => (
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
            {session && <UserActions session={session} />}
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
      <SearchBar isSearch={isSearch} />
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <ul className="flex flex-col p-4 gap-4 text-sm">
          {linksNavAndFooter.map((e) => (
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
