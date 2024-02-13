import Breadcrumb from "@/components/Breadcrumb";
import SideMenu from "@/components/Products/SideMenu";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen sm:p-3">
      <div className="flex">
        <SideMenu />
        <div className="flex-1">
          <Breadcrumb />
          {children}
        </div>
      </div>
    </div>
  );
};

export default layout;
