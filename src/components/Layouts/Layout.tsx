import Footer from "../Footer";
import Navbar from "../Navbar";

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
