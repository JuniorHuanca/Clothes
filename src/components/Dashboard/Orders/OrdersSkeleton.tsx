import OrderSkeleton from "./OrderSkeleton";

type Props = {};

const OrdersSkeleton = (props: Props) => {
  const numberOfSkeletons = 20;

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Array.from({ length: numberOfSkeletons }, (_, index) => (
        <OrderSkeleton key={index} />
      ))}
    </div>
  );
};

export default OrdersSkeleton;
