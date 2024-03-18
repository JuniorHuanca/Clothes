import Cards from "@/components/Products/Cards";
import CardsSkeleton from "@/components/Products/CardsSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: { search: string };
  searchParams?: {
    page?: string;
    genders?: string;
    tags?: string;
    sort?: string;
  };
};

const Search = ({ params, searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const genders = searchParams?.genders;
  const tags = searchParams?.tags;
  const sort = searchParams?.sort;
  const url = `/api/v1/products/search?page=${currentPage}&search=${params.search}${
    genders ? "&genders=" + genders : ""
  }${tags ? "&tags=" + tags : ""}${sort ? "&sort=" + sort : ""}`;
  return (
    <>
      <h1 className="text-xl sm:text-3xl font-bold my-4">
        Productos encontrados
      </h1>
      <Suspense key={`${params.search}`} fallback={<CardsSkeleton />}>
        <Cards url={url} />
      </Suspense>
    </>
  );
};

export default Search;
