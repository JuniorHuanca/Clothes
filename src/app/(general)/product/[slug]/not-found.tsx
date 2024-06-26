"use client";
import BackButton from "@/components/BackButton";
import NotFoundProducts from "@/components/Products/NotFound";
type Props = {};

const NotFoundProduct = (props: Props) => {
  return (
    <>
      <BackButton />
      <NotFoundProducts text="El producto que estás buscando no se ha encontrado." />
    </>
  );
};

export default NotFoundProduct;
