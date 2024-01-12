import Users from "@/components/Dashboard/Users/Users";
import UsersSkeleton from "@/components/Dashboard/Users/UsersSkeleton";
import { Suspense } from "react";

type Props = {};

const DashboardUsers = (props: Props) => {
  return (
    <Suspense fallback={<UsersSkeleton />}>
      <Users />
    </Suspense>
  );
};

export default DashboardUsers;
