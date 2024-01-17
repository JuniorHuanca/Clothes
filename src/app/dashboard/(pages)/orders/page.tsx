import Orders from "@/components/Dashboard/Orders/Orders";
import { useFetch } from "@/hooks/useFetch";
import { IOrder, IUser } from "@/shared/types";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Ordenes",
};

const DashboardOrders = async (props: Props) => {
  const data = await useFetch<IOrder[]>(
    `${process.env.BASE_URL}/api/v1/dashboard/orders`
  );
  return <Orders data={data} />;
};

export default DashboardOrders;
