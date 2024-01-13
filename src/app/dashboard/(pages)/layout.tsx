"use client";
import Navbar from "@/components/Dashboard/Navbar";
import Sidebar from "@/components/Dashboard/Sidebar";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(true);
  if (status === "unauthenticated" || !session) return;
  return (
    <main className="flex h-screen w-full">
      {open && <Sidebar session={session} setOpen={setOpen} />}
      <div className="w-full">
        <Navbar setOpen={setOpen} isOpen={open} session={session} />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
