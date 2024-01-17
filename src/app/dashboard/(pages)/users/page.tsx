import Users from "@/components/Dashboard/Users/Users";
import UsersSkeleton from "@/components/Dashboard/Users/UsersSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {};

export const metadata: Metadata = {
  title: "Usuarios",
};
const DashboardUsers = (props: Props) => {
  return (
    <Suspense fallback={<UsersSkeleton />}>
      <Users />
    </Suspense>
  );
};

export default DashboardUsers;
