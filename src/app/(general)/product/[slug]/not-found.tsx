"use client";
import BackButton from "@/components/BackButton";
import NotFoundProducts from "@/components/Products/NotFound";
import { useRouter } from "next/navigation";
type Props = {};

const NotFoundProduct = (props: Props) => {
  const { back } = useRouter();
  return (
    <>
      <NotFoundProducts text="El producto que estás buscando no se ha encontrado." />
      <BackButton />
    </>
  );
};

export default NotFoundProduct;
