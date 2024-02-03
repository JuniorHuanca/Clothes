"use client";
import { ChevronLeft, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Tooltip from "./Tooltip";

type Props = {};

const Breadcrumb = (props: Props) => {
  const pathname = usePathname();
  const translations: { [key: string]: string } = {
    products: "Productos",
    newproduct: "Nuevo Producto",
    dashboard: "Panel de control",
    orders: "Pedidos",
    users: "Usuarios",
  };
  // Divide la ruta en segmentos
  const segments = pathname.split("/").filter((segment) => segment !== "");
  // Construye las migas de pan
  const crumbs = segments.map((segment, index) => {
    const translatedSegment = translations[segment] || segment;
    const url = `/${segments.slice(0, index + 1).join("/")}`;
    return { title: translatedSegment, url };
  });

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm z-0">
        <li>
          <Link href="/" className="block">
            <span className="sr-only"> Home </span>
            <Tooltip text="Inicio" icon={<Home size={20} />} />
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.title} className="flex items-center gap-1">
            <ChevronLeft size={20} />
            <Link
              href={crumb.url}
              className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
            >
              {crumb.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
