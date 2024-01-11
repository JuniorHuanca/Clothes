import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  session: Session;
  setOpen: (value: boolean) => void;
};

const Sidebar = ({ session, setOpen }: Props) => {
  const pathname = usePathname();
  const routes = [
    { name: "Panel de control", route: "/dashboard" },
    { name: "Usuarios", route: "/dashboard/users" },
    { name: "Productos", route: "/dashboard/products" },
    { name: "Pedidos", route: "/dashboard/orders" },
  ];
  return (
    <div className={`flex flex-col gap-3 p-2 min-w-72 bg-white`}>
      <div className="flex justify-between">
        Clothes E-commerce
        <button type="button" onClick={() => setOpen(false)}>
          Cerrar
        </button>
      </div>
      {routes.map(
        (e) =>
          session.user.role.routes.includes(e.route) && (
            <Link
              key={e.name}
              className={`p-2 ring-offset-2 ring-offset-white rounded-lg ${
                pathname === e.route
                  ? "bg-purple-500 ring-2 ring-purple-500 font-bold"
                  : "bg-blue-500"
              }`}
              href={e.route}
            >
              <div>{e.name}</div>
            </Link>
          )
      )}
    </div>
  );
};

export default Sidebar;
