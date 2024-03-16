import BackButton from "@/components/BackButton";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full flex flex-col items-center">
      <BackButton />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-[1400px] w-full">
        <div className="col-span-1 lg:col-span-2">
          <div className="bg-gray-300 w-full animate-pulse aspect-square rounded-2xl" />
        </div>
        <div className="col-span-1 lg:col-span-2 p-2 md:p-4">
          <div className="flex flex-col justify-between gap-2 rounded-lg select-none w-full">
            <div className="bg-gray-300 w-full animate-pulse h-6 rounded-2xl" />
            <div className="bg-gray-100 w-28 animate-pulse h-4 rounded-2xl" />
            <div className="bg-gray-300 w-24 animate-pulse h-3 rounded-2xl mt-8" />

            <div className="bg-slate-200 w-full animate-pulse h-3 rounded-2xl" />
            <div className="bg-slate-200 w-11/12 animate-pulse h-3 rounded-2xl" />
            <div className="bg-slate-200 w-full animate-pulse h-3 rounded-2xl" />
            <div className="bg-slate-200 w-11/12 animate-pulse h-3 rounded-2xl" />
            <div className="bg-slate-200 w-full animate-pulse h-3 rounded-2xl" />
            <div className="bg-slate-200 w-6/12 animate-pulse h-3 rounded-2xl" />

            <div className="flex gap-2 mt-3">
              <div className="bg-slate-200 w-11 animate-pulse h-12 rounded-md" />
              <div className="bg-slate-200 w-11 animate-pulse h-12 rounded-md" />
              <div className="bg-slate-200 w-11 animate-pulse h-12 rounded-md" />
              <div className="bg-slate-200 w-11 animate-pulse h-12 rounded-md" />
              <div className="bg-slate-200 w-11 animate-pulse h-12 rounded-md" />
            </div>
            <div className="flex gap-2">
              <div className="bg-gray-300 w-7 animate-pulse h-7 rounded-md" />
              <div className="bg-slate-200 w-24 animate-pulse h-7 rounded-md" />
              <div className="bg-gray-300 w-7 animate-pulse h-7 rounded-md" />
            </div>
            <div className="bg-gray-100 w-28 animate-pulse h-4 rounded-2xl my-2" />
            <div className="bg-rose-200 w-40 animate-pulse h-10 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
