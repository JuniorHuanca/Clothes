import BackButton from "@/components/BackButton";
import Carrosel from "@/components/Carrosel";
import { useFetch } from "@/hooks/useFetch";
import { IProduct } from "@/shared/types";
import { formatPrice } from "@/shared/utils";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import { MinusSquare, PlusSquare } from "lucide-react";
type Props = {
  params: { slug: string };
};

const Detail = async ({ params }: Props) => {
  const product = await useFetch<IProduct>(`/api/v1/products/${params.slug}`);
  if (typeof product !== "object") {
    notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <BackButton />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-[1400px] flex-1">
        <div className="col-span-1 lg:col-span-2">
          <Carrosel slides={product.images} />
        </div>
        <div className="col-span-1 lg:col-span-2 p-2 md:p-4">
          <h1 className={`text-xl md:text-2xl font-bold`}>{product.title}</h1>
          <p className="text-lg mb-8">{formatPrice(product.price)}</p>
          <h3 className="font-bold text-sm">Descripción</h3>
          <p className="mb-4">{product.description}</p>
          <div>
            <div className="flex gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className="hover:underline text-lg"
                >
                  {size}
                </button>
              ))}
            </div>
            <div className="flex">
              <button type="button">
                <MinusSquare size={30} />
              </button>
              <span className="w-20 m-3 px-5 py-1 bg-gray-200 text-center rounded">
                {product.inStock}
              </span>
              <button type="button">
                <PlusSquare size={30} />
              </button>
            </div>
            <p className="text-lg mb-1">Stock: {product.inStock}</p>
            <button
              type="button"
              className="rounded-md bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const product = await useFetch<IProduct>(`/api/v1/products/${params.slug}`);

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      type: "website",
      url: "clothes.vercel.app",
      siteName: "Clothes",
      title: product.title,
      description: product.description,
      images: product.images,
    },
  };
}
