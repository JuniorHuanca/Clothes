import Orders from "@/components/Dashboard/Orders/Orders";
import { useFetch } from "@/hooks/useFetch";
import { authOptions } from "@/shared/authOptions";
import { IOrder, IUser } from "@/shared/types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Ordenes",
};

const DashboardOrders = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const data = await useFetch<IOrder[]>(
    `/api/v1/dashboard/orders?userId=${session?.user.id}`
  );
  return <Orders data={data} />;
};

export default DashboardOrders;
