import Orders from "@/components/Dashboard/Orders/Orders";
import { useFetch } from "@/hooks/useFetch";
import { authOptions } from "@/shared/authOptions";
import { IOrder } from "@/shared/types";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

type Props = {};

export const metadata: Metadata = {
  title: "Ordenes",
};

const DashboardOrders = async (props: Props) => {
  const session = await getServerSession(authOptions);
  const data = await useFetch<IOrder[]>(
    `/api/v1/dashboard/orders?userId=${session?.user.id}`
  );
  return typeof data === "object" ? (
    <Orders data={data} />
  ) : (
    <h2>Usted no tiene ordenes asignadas aun </h2>
  );
};

export default DashboardOrders;
