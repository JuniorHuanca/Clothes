import { Session } from "next-auth";
import Breadcrumb from "../Breadcrumb";
import {
  Bell,
  CircleUser,
  Menu,
  MessageSquareMore,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Tooltip from "../Tooltip";

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
            <Tooltip text="Abrir menú" icon={<Menu />} alignment="left" />
          </button>
        )}
        <div className="w-full flex justify-end">
          <div className="flex gap-4 items-center px-2">
            <button type="button">
              <Tooltip text="Notificaciones" icon={<Bell />} />
            </button>
            <button type="button">
              <Tooltip text="Configuración" icon={<Settings />} />
            </button>
            <button type="button">
              <Tooltip
                text="Mensajes"
                icon={<MessageSquareMore />}
                alignment="right"
              />
            </button>
          </div>
          <div className="flex gap-1 items-center bg-gray-200 px-1 rounded-md shadow-md max-w-48">
            <div className="min-w-10">
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
            <div>
              <p className="text-lg font-bold line-clamp-1">{user.name}</p>
              <p className="text-sm text-gray-600 line-clamp-1">
                {user.role.name}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Breadcrumb />
    </div>
  );
};

export default Navbar;
