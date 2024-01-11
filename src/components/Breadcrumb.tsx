"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

const Breadcrumb = (props: Props) => {
  const pathname = usePathname();
  const translations: { [key: string]: string } = {
    products: "productos",
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
      <ol className="flex items-center gap-1 text-sm">
        <li>
          <Link href="/" className="block">
            <span className="sr-only"> Home </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </li>
        {crumbs.map((crumb) => (
          <li key={crumb.title} className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 transform rotate-180"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
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
