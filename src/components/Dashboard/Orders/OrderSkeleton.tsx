type Props = {};

const OrderSkeleton = (props: Props) => {
  return (
    <div className="flex flex-col justify-between gap-2 m-4 bg-indigo-200 shadow-lg rounded-lg p-2 select-none w-80">
      <div className="bg-slate-50 w-full animate-pulse h-3 rounded-2xl" />
      <div className="bg-slate-50  w-full animate-pulse h-3 rounded-2xl" />
      <div className="bg-slate-100 w-full animate-pulse h-5 rounded-2xl" />
      {/* <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-emerald-200 w-full animate-pulse h-12 rounded-2xl" /> */}
    </div>
  );
};

export default OrderSkeleton;
