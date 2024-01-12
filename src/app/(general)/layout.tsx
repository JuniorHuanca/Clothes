import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col h-full w-full bg-white">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
