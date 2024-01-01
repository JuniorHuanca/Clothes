import Navbar from "../Dashboard/Navbar";
import Sidebar from "../Dashboard/Sidebar";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <main className="flex h-screen w-screen bg-red-500">
      <Sidebar />
      <div className="w-full">
        <Navbar />
        {children}
      </div>
    </main>
  );
};

export default DashboardLayout;
