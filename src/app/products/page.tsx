import Breadcrumb from "@/components/Breadcrumb";
import Layout from "@/components/Layouts/Layout";

type Props = {};

const Products = (props: Props) => {
  return (
    <Layout>
      <div className="min-h-screen">
        Products
        <Breadcrumb />
      </div>
    </Layout>
  );
};

export default Products;
