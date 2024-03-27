"use client";
import BackButton from "@/components/BackButton";
import NotFoundProducts from "@/components/Products/NotFound";
type Props = {};

const NotFoundProduct = (props: Props) => {
  return (
    <>
      <BackButton />
      <NotFoundProducts text="A la fecha, aún no se han registrado pedidos en el sistema." />
    </>
  );
};

export default NotFoundProduct;
