import BackButton from "@/components/BackButton";
import Carrosel from "@/components/Carrosel";
import { useFetch } from "@/hooks/useFetch";
import { IProduct } from "@/shared/types";
import { formatPrice } from "@/shared/utils";
import { notFound } from "next/navigation";
import { Metadata, ResolvingMetadata } from "next";
import CartLogic from "@/components/Detail/CartLogic";
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
          <CartLogic product={product} />
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
