import Orders from "@/components/Dashboard/Orders/Orders";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { useFetch } from "@/hooks/useFetch";
import { IOrder, IUser } from "@/shared/types";
import { Suspense } from "react";

type Props = {};

const DashboardOrders = async (props: Props) => {
  const data = await useFetch<IOrder[]>(
    `${process.env.BASE_URL}/api/v1/dashboard/orders`
  );
  return (
    <DashboardLayout>
      <nav>
        <div>
          <h2>Tickets</h2>
          <p>
            <small>Currently open tickets.</small>
          </p>
        </div>
      </nav>
      <Suspense
        fallback={
          <div>
            <span>squeleton here loading...</span>
          </div>
        }
      >
        <Orders data={data} />
      </Suspense>
    </DashboardLayout>
  );
};

export default DashboardOrders;
