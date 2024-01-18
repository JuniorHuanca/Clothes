import { Session } from "next-auth";
import Breadcrumb from "../Breadcrumb";
import {
  Bell,
  CircleUser,
  Menu,
  MessageSquareMore,
  Settings,
  MoonStar,
  Lightbulb,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Tooltip from "../Tooltip";
import { signOut } from "next-auth/react";

type Props = {
  session: Session;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

const Navbar = ({ setOpen, isOpen, session: { user } }: Props) => {
  return (
    <div className="flex flex-col p-2 sm:px-6">
      <div className="flex justify-between">
        {!isOpen && (
          <button type="button" onClick={() => setOpen(true)}>
            <Tooltip text="Abrir menú" icon={<Menu />} alignment="right" />
          </button>
        )}
        <div className="w-full flex justify-end">
          <div className="flex-1 flex justify-between items-center">
            <div>
              {/* <span className="text-xl font-extrabold px-2">Dashboard</span> */}
              <button type="button" className="px-2">
                <Tooltip
                  text="Modo oscuro"
                  icon={<MoonStar />}
                  alignment="right"
                />
              </button>
              <button type="button" className="px-2">
                <Tooltip
                  text="Configuración"
                  icon={<Settings />}
                  alignment="right"
                />
              </button>
            </div>
            <div className="flex gap-4 items-center px-2">
              <button type="button">
                <Tooltip text="Notificaciones" icon={<Bell />} />
              </button>
              <button type="button">
                <Tooltip text="Mensajes" icon={<MessageSquareMore />} />
              </button>
            </div>
          </div>
          <div className="flex gap-1 items-center bg-slate-100 px-1 rounded-md shadow-sm max-w-56">
            <div className="hidden sm:block flex-none">
              {!user.image && <CircleUser size={40} />}
              {user.image && (
                <Image
                  src={user.image}
                  height={40}
                  width={40}
                  alt={user.name}
                />
              )}
            </div>
            <div className="hidden sm:block">
              <p className="text-lg font-bold line-clamp-1">{user.name}</p>
              <p className="text-sm text-gray-600 line-clamp-1">
                {user.role.name}
              </p>
            </div>
            <button
              type="button"
              className="flex-none sm:p-2"
              onClick={() => signOut()}
            >
              <Tooltip
                text="Cerrar sesión"
                icon={<LogOut />}
                alignment="left"
              />
            </button>
          </div>
        </div>
      </div>
      <Breadcrumb />
    </div>
  );
};

export default Navbar;
