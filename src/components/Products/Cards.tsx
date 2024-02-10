import { useFetch } from "@/hooks/useFetch";
import { IProduct } from "@/shared/types";
import Card from "./Card";
import Pagination from "../Pagination";
type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

const Cards = async ({ searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const data = await useFetch<{
    totalPages: number;
    products: IProduct[];
  }>(`${process.env.BASE_URL}/api/v1/products?page=${currentPage}`);
  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        {data.products.map((product) => (
          <Card key={product.slug} product={product} />
        ))}
      </div>
      <Pagination totalPages={data.totalPages} />
    </>
  );
};

export default Cards;
