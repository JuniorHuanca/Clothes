import { useFetch } from "@/hooks/useFetch";
import { IProduct } from "@/shared/types";
import Card from "./Card";
import Pagination from "../Pagination";
import NotFoundProducts from "./NotFound";

type Props = {
  url: string;
};

const Cards = async ({ url }: Props) => {
  const data = await useFetch<{
    totalPages: number;
    products: IProduct[];
  }>(url);
  return (
    <>
      {data.products ? (
        <>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {data.products.map((product) => (
              <Card key={product.slug} product={product} />
            ))}
          </div>
          <Pagination totalPages={data.totalPages} />
        </>
      ) : (
        <NotFoundProducts />
      )}
    </>
  );
};

export default Cards;
