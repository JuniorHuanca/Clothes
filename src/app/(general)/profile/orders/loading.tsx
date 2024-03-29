type Props = {};

const Product = (props: Props) => {
  return (
    <div className="flex">
      <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-emerald-200 w-32 h-32 aspect-square animate-pulse rounded-2xl" />

      <div className="flex-1 p-2">
        <div className="bg-slate-200 w-full animate-pulse h-4 rounded-2xl" />
        <p className="flex">
          <div className="bg-slate-400 w-28 animate-pulse h-4 rounded-2xl my-1" />
          <div className="bg-slate-200 w-full animate-pulse h-4 rounded-2xl my-1" />
        </p>
        <p className="flex">
          <div className="bg-slate-400 w-40 animate-pulse h-4 rounded-2xl my-1" />
          <div className="bg-slate-200 w-full animate-pulse h-4 rounded-2xl my-1" />
        </p>
        <p className="flex">
          <div className="bg-slate-400 w-32 animate-pulse h-4 rounded-2xl my-1" />
          <div className="bg-slate-200 w-full animate-pulse h-4 rounded-2xl my-1" />
        </p>
      </div>
    </div>
  );
};

const Card = () => {
  return (
    <div className="max-w-screen-xl w-full p-2 rounded overflow-hidden shadow-lg bg-slate-100">
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/3 lg:w-1/5 p-3">
          <div className="bg-gray-500 w-full max-w-24 animate-pulse h-4 rounded-2xl my-2" />
          <div className="bg-gray-300 w-full max-w-40 animate-pulse h-4 rounded-2xl my-2" />
          <div className="bg-gray-500 w-full max-w-24 animate-pulse h-4 rounded-2xl my-2" />
          <div className="bg-gray-300 w-full max-w-36 animate-pulse h-4 rounded-2xl my-2" />
        </div>
        <div className="w-full sm:w-1/3 lg:w-1/5 p-3">
          <div className="bg-gray-500 w-full max-w-24 animate-pulse h-4 rounded-2xl my-2" />
          <div className="bg-gray-300 w-full max-w-44 animate-pulse h-4 rounded-2xl my-2" />
          <div className="bg-gray-300 w-full max-w-40 animate-pulse h-4 rounded-2xl my-2" />
        </div>
        <div className="w-full sm:w-1/3 lg:w-1/5 p-3">
          <div className="bg-gray-500 w-full max-w-24 animate-pulse h-4 rounded-2xl my-2" />
          <div className="bg-gray-300 w-full max-w-44 animate-pulse h-4 rounded-2xl my-2" />
        </div>
        <div className="w-full lg:w-2/5 p-3 flex-1">
          <div className="bg-gray-500 w-full max-w-24 animate-pulse h-4 rounded-2xl my-2" />
          <Product />
        </div>
      </div>
    </div>
  );
};

const Loading = (props: Props) => {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Array.from({ length: 5 }, (_, index) => (
        <Card key={index} />
      ))}
    </div>
  );
};

export default Loading;
