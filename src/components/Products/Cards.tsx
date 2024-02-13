import { useFetch } from "@/hooks/useFetch";
import { IProduct } from "@/shared/types";
import Card from "./Card";
import Pagination from "../Pagination";
import NotFoundProducts from "./NotFound";
type Props = {
  searchParams?: {
    page?: string;
    genders?: string;
    tags?: string;
  };
};

const Cards = async ({ searchParams }: Props) => {
  const currentPage = Number(searchParams?.page) || 1;
  const genders = searchParams?.genders;
  const tags = searchParams?.tags;
  const data = await useFetch<{
    totalPages: number;
    products: IProduct[];
  }>(
    `${process.env.BASE_URL}/api/v1/products?page=${currentPage}${
      genders ? "&genders=" + genders : ""
    }${tags ? "&tags=" + tags : ""}`
  );
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
