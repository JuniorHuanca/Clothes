import { useFetch } from "@/hooks/useFetch";
import { authOptions } from "@/shared/authOptions";
import { IProduct, IProductCart } from "@/shared/types";
import { getServerSession } from "next-auth";
import Logic from "./Logic";

type Props = {
  product: IProduct;
};

const CartLogic = async ({ product }: Props) => {
  const session = await getServerSession(authOptions);
  const item = await useFetch<IProductCart>(
    `/api/v1/cart/${product.slug}?userId=${session?.user.id}`
  );

  return (
    <div>
      <Logic product={product} item={item} session={session} />
    </div>
  );
};

export default CartLogic;
