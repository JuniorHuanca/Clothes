import Cards from "@/components/Products/Cards";
import CardsSkeleton from "@/components/Products/CardsSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  searchParams?: {
    page?: string;
    genders?: string;
    tags?: string;
    sort?: string;
  };
};

export const metadata: Metadata = {
  title: "Productos",
};

const Products = async ({ searchParams }: Props) => {
  return (
    <>
      <h1 className="text-xl sm:text-3xl font-bold my-4">
        Todos los productos
      </h1>
      <Suspense
        key={`${searchParams?.page}_${searchParams?.genders}_${searchParams?.tags}_${searchParams?.sort}`}
        fallback={<CardsSkeleton />}
      >
        <Cards searchParams={searchParams} />
      </Suspense>
    </>
  );
};

export default Products;
