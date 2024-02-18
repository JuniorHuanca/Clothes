type Props = {};

const CardSkeleton = (props: Props) => {
  return (
    <div className="flex flex-col justify-between gap-1 shadow-lg select-none w-64 max-[400px]:w-full rounded-md overflow-hidden bg-slate-100">
      <div className="bg-gray-200 w-full animate-pulse h-64" />
      <div className="p-4 flex flex-col gap-2">
        <div className="bg-rose-200 w-20 animate-pulse h-4 rounded-2xl" />
        <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" />
        <div className="bg-gray-200 w-2/3 animate-pulse h-3 rounded-2xl" />
        <div className="bg-gray-300 max-w-[60px] w-full animate-pulse h-5 rounded-2xl" />
      </div>
    </div>
  );
};

export default CardSkeleton;
