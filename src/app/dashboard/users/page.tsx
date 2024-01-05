import Users from "@/components/Dashboard/Users/Users";
import DashboardLayout from "@/components/Layouts/DashboardLayout";
import { Suspense } from "react";

type Props = {};

const DashboardUsers = (props: Props) => {
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
      <Suspense fallback={<div><span>squeleton here loading...</span></div>}>
        <Users />
      </Suspense>
    </DashboardLayout>
  );
};

export default DashboardUsers;
