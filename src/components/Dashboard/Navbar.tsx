import { Session } from "next-auth";
import Breadcrumb from "../Breadcrumb";

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
            Abrir
          </button>
        )}
        <div className="w-full flex justify-between">
          <ul className="flex gap-4 items-center px-2">
            <li>icon 1</li>
            <li>icon 2</li>
            <li>icon 3</li>
            <li>icon 4</li>
            <li>icon 5</li>
          </ul>
          <div className="flex items-center">
            <div className="h-10 w-10 bg-red-500 rounded-full"></div>
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
