import { Facebook, Github, Instagram, Shirt, Twitter } from "lucide-react";
import Link from "next/link";
import Tooltip from "./Tooltip";
import { linksNavAndFooter } from "@/shared/data";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center text-rose-600">
          <Shirt size={50} fill="currentColor" />
        </div>

        <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
          Explora nuestra selección de prendas de alta calidad y encuentra lo
          último en tendencias de moda para esta temporada.
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {linksNavAndFooter.map((e) => (
            <li key={e.name}>
              <Link
                className="relative w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-rose-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left hover:text-rose-600 text-base text-gray-700"
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
              className="text-rose-700 transition hover:text-rose-700/75"
            >
              <span className="sr-only">Facebook</span>
              <Tooltip text="Facebook" icon={<Facebook />} alignment="top" />
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-rose-700 transition hover:text-rose-700/75"
            >
              <span className="sr-only">Instagram</span>
              <Tooltip text="Instagram" icon={<Instagram />} alignment="top" />
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-rose-700 transition hover:text-rose-700/75"
            >
              <span className="sr-only">Twitter</span>
              <Tooltip text="Twitter" icon={<Twitter />} alignment="top" />
            </Link>
          </li>

          <li>
            <Link
              href="/"
              rel="noreferrer"
              target="_blank"
              className="text-rose-700 transition hover:text-rose-700/75"
            >
              <span className="sr-only">GitHub</span>
              <Tooltip text="GitHub" icon={<Github />} alignment="top" />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
