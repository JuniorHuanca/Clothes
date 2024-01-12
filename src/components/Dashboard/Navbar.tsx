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

type Props = {
  session: Session;
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

const Navbar = ({ setOpen, isOpen, session: { user } }: Props) => {
  return (
    <div className="flex flex-col bg-white p-2">
      <div className="flex justify-between">
        {!isOpen && (
          <button type="button" onClick={() => setOpen(true)}>
            <Menu />
          </button>
        )}
        <div className="w-full flex justify-end">
          <ul className="flex gap-4 items-center px-2">
            <li>
              <Bell />
            </li>
            <li>
              <Settings />
            </li>
            <li>
              <MessageSquareMore />
            </li>
          </ul>
          <div className="flex items-center">
            {!user.image && <CircleUser size={48} />}
            {user.image && (
              <Image src={user.image} height={48} width={48} alt={user.name} />
            )}
            <div>
              <p>{user.name}</p>
              <p>{user.role.name}</p>
            </div>
          </div>
        </div>
      </div>
      <Breadcrumb />
    </div>
  );
};

export default Navbar;
