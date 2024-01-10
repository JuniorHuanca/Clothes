"use client";
import { useSession } from "next-auth/react";
import Navbar from "../Dashboard/Navbar";
import Sidebar from "../Dashboard/Sidebar";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(true);
  if (status === "unauthenticated" || !session) return;
  return (
    <main className="flex h-screen w-full bg-white">
      {open && <Sidebar session={session} setOpen={setOpen} />}
      <div className="w-full bg-red-500">
        <Navbar setOpen={setOpen} isOpen={open} />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
