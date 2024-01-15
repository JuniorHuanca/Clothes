import { Menu } from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Package, ShoppingBag } from "lucide-react";
import Tooltip from "../Tooltip";
type Props = {
  session: Session;
  setOpen: (value: boolean) => void;
};

const Sidebar = ({ session, setOpen }: Props) => {
  const pathname = usePathname();
  const routes = [
    { name: "Panel de control", route: "/dashboard", icon: <Home /> },
    { name: "Usuarios", route: "/dashboard/users", icon: <Users /> },
    { name: "Productos", route: "/dashboard/products", icon: <Package /> },
    { name: "Pedidos", route: "/dashboard/orders", icon: <ShoppingBag /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 sm:sticky h-screen min-h-screen sm:min-h-0 z-10 flex flex-col gap-4 p-3 pr-0 min-w-72 bg-indigo-800 text-white`}
    >
      <div className="flex justify-between pr-2 z-10">
        <span className="text-xl font-extrabold">E-commerce</span>
        <button type="button" onClick={() => setOpen(false)}>
          <Tooltip text="Cerrar menú" icon={<Menu />} alignment="right"/>
        </button>
      </div>
      <div className="h-full flex flex-col gap-4 overflow-y-auto">
        {routes.map(
          (e) =>
            session.user.role.routes.includes(e.route) && (
              <Link
                key={e.name}
                className={`p-3 rounded-l-2xl relative ${
                  pathname === e.route
                    ? "bg-white text-indigo-800 after:content-[''] after:absolute after:top-12 after:shadow-[0_-40px_0px_0px_rgba(255,255,255)] after:right-0 after:h-20 after:w-8 after:rounded-tr-2xl after:origin-[rotateZ(360deg)] before:content-[''] before:absolute before:-top-20 before:shadow-[0_40px_0px_0px_rgba(255,255,255)] before:right-0 before:h-20 before:w-8 before:rounded-br-2xl before:origin-[rotateZ(360deg)] font-bold"
                    : "z-10 hover:font-bold transition-all hover:bg-white hover:text-indigo-800"
                }`}
                href={e.route}
              >
                <div className="flex gap-2">
                  {e.icon}
                  {e.name}
                </div>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default Sidebar;
