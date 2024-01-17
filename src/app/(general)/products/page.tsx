import Breadcrumb from "@/components/Breadcrumb";
import { Metadata } from "next";

type Props = {};

export const metadata: Metadata = {
  title: "Productos",
};

const Products = (props: Props) => {
  return (
    <div className="min-h-screen">
      Products
      <Breadcrumb />
    </div>
  );
};

export default Products;
