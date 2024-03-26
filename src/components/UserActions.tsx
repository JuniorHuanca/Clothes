import { CircleUser, LineChart, Ticket, UserCheck } from "lucide-react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
type Props = {
  session: Session;
};

const UserActions = ({ session }: Props) => {
  const links = [
    {
      name: "Perfil",
      path: "/profile",
      icon: <UserCheck />,
    },
    {
      name: "Pedidos",
      path: "/profile/orders",
      icon: <Ticket />,
    },
  ];
  return (
    <details className="relative flex flex-col">
      <summary className="block cursor-pointer">
        {!session.user.image && <CircleUser size={40} />}
        {session.user.image && (
          <Image
            src={session.user.image}
            height={40}
            width={40}
            alt={session.user.name}
            className="rounded-full"
          />
        )}
      </summary>
      <div className="absolute flex flex-col gap-2 top-10 z-10 right-0 bg-white p-2 border-2 rounded-md w-72">
        {links.map((link) => (
          <Link
            key={link.path}
            href={link.path}
            className="flex justify-center items-center gap-1 rounded-md bg-indigo-100 px-5 py-2.5 text-sm text-center font-medium text-indigo-800"
          >
            {link.icon} {link.name}
          </Link>
        ))}
        {session.user.role.routes.includes("/dashboard") && (
          <Link
            href="/dashboard"
            className="flex justify-center items-center gap-1 rounded-md bg-green-100 px-5 py-2.5 text-sm text-center font-medium text-green-800"
          >
            <LineChart /> Dashboard
          </Link>
        )}
        <button
          type="button"
          className="rounded-md bg-rose-100 px-5 py-2.5 text-sm font-medium text-rose-600"
          onClick={() => signOut()}
        >
          Cerrar sesión
        </button>
      </div>
    </details>
  );
};

export default UserActions;
