"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import defaultImg from "@/shared/default.jpg";
import { IProduct } from "@/shared/types";
interface Props {
  product: IProduct;
}

const Card = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);
  return (
    <div className="rounded-md overflow-hidden w-full sm:w-64 bg-slate-100">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={displayImage || defaultImg}
          alt={product.title}
          className="w-full object-cover rounded-md"
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <span className="bg-rose-200 text-rose-800 text-sm font-medium px-2 rounded-full w-min">
          {product.gender}
        </span>
        <Link
          className="hover:text-rose-600 transition-all"
          href={`/product/${product.slug}`}
        >
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  );
};

export default Card;
