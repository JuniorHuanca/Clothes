"use client"
import { IProduct } from "@/shared/types";
import { formatPrice } from "@/shared/utils";
import Link from "next/link";
import React, { useState } from "react";

const ProductCollection = (props: IProduct) => {
  const [displayImage, setDisplayImage] = useState(props.images[0]);
  return (
    <li key={props.slug}>
      <Link
        href={`/product/${props.slug}`}
        className="group block overflow-hidden"
      >
        <img
          src={displayImage}
          alt={props.title}
          className="h-[350px] w-full object-cover transition duration-500 group-hover:scale-105 sm:h-[450px]"
          onMouseEnter={() => setDisplayImage(props.images[1])}
          onMouseLeave={() => setDisplayImage(props.images[0])}
        />

        <div className="relative bg-white pt-3">
          <h3 className="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4">
            {props.title}
          </h3>

          <p className="mt-2">
            <span className="sr-only"> Regular Price </span>

            <span className="tracking-wider text-gray-900">
              {formatPrice(props.price)}
            </span>
          </p>
        </div>
      </Link>
    </li>
  );
};

export { ProductCollection };
