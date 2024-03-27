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
const Products = ({ searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const genders = searchParams?.genders;
  const tags = searchParams?.tags;
  const sort = searchParams?.sort;
  const url = `/api/v1/products?page=${currentPage}${
    genders ? "&genders=" + genders : ""
  }${tags ? "&tags=" + tags : ""}${sort ? "&sort=" + sort : ""}`;
  return (
    <>
      <h1 className="text-xl sm:text-3xl font-bold my-4">
        Todos los productos
      </h1>
      <Suspense
        key={`${searchParams?.page}_${searchParams?.genders}_${searchParams?.tags}_${searchParams?.sort}`}
        fallback={<CardsSkeleton />}
      >
        <Cards url={url} />
      </Suspense>
    </>
  );
};

export default Products;
