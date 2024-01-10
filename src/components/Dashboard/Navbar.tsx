type Props = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

const Navbar = ({ setOpen, isOpen }: Props) => {
  return (
    <div className="bg-blue-500">
      {!isOpen && (
        <button type="button" onClick={() => setOpen(true)}>
          Abrir
        </button>
      )}
      Navbar
    </div>
  );
};

export default Navbar;
