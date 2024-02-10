import Breadcrumb from "@/components/Breadcrumb";
import Cards from "@/components/Products/Cards";
import CardsSkeleton from "@/components/Products/CardsSkeleton";
import SideMenu from "@/components/Products/SideMenu";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export const metadata: Metadata = {
  title: "Productos",
};

const Products = async ({ searchParams }: Props) => {
  return (
    <div className="min-h-screen sm:p-3">
      <div className="flex">
        <SideMenu />
        <div className="flex-1">
          <Breadcrumb />
          <h1 className="text-xl sm:text-3xl font-bold mb-4">
            Todos los productos
          </h1>
          <Suspense fallback={<CardsSkeleton />}>
            <Cards searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Products;
