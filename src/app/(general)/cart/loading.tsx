type Props = {};

const Card = () => {
  return (
    <div className="flex flex-col h-auto md:flex-row md:flex-wrap max-[365px]:border-b-2 border-black p-2 md:p-4 gap-4 w-full">
      <div className="bg-gray-300 w-full animate-pulse rounded-2xl md:w-36 aspect-square"></div>
      <div className="flex flex-col flex-1 relative  w-full">
        <div className="md:max-w-[50%] w-full flex flex-col md:absolute top-0 left-0 gap-2">
          <div className="bg-gray-400 w-2/3 animate-pulse h-4 rounded-2xl" />
          <div className="bg-gray-200 w-1/12 animate-pulse h-4 rounded-2xl" />
          <div className="bg-gray-200 w-2/12 animate-pulse h-3 rounded-2xl" />
          <div className="bg-gray-200 w-3/12 animate-pulse h-3 rounded-2xl" />
        </div>
        <div className="md:max-w-[50%] md:absolute bottom-0 right-0 bg-gray-200 w-1/6 mt-2 animate-pulse h-4 rounded-2xl" />
        <div className="self-center md:max-w-[50%] items-center md:absolute top-0 right-0 border-2 rounded-md border-gray-200 flex gap-1 p-1">
          <div className="bg-gray-300 w-7 animate-pulse h-7 rounded-md" />
          <div className="bg-slate-200 w-14 animate-pulse h-7 rounded-md" />
          <div className="bg-gray-300 w-7 animate-pulse h-7 rounded-md" />
        </div>
        <div className="mt-6 md:m-0 self-center md:max-w-[50%] w-full md:absolute bottom-0 left-0">
          <div className="bg-slate-200 w-28 animate-pulse h-5 rounded-md" />
        </div>
      </div>
    </div>
  );
};

const Summary = () => {
  return (
    <div className="p-6 flex flex-col text-gray-600 bg-gray-50">
      <div>
        <p className="flex justify-between my-4 text-base">
          <span className="bg-gray-200 w-24 animate-pulse h-4 rounded-2xl" />
          <span className="bg-gray-200 w-28 animate-pulse h-4 rounded-2xl" />
        </p>
        <p className="flex justify-between my-4">
          <span className="bg-gray-200 w-24 animate-pulse h-4 rounded-2xl" />
          <span className="bg-gray-200 w-24 animate-pulse h-4 rounded-2xl" />
        </p>
        <hr className="my-4" />
        <p className="flex justify-between my-5 text-base">
          <span className="bg-gray-200 w-20 animate-pulse h-4 rounded-2xl" />
          <span className="bg-gray-200 w-24 animate-pulse h-4 rounded-2xl" />
        </p>
      </div>
      <div className="bg-rose-200 animate-pulse h-14" />
    </div>
  );
};

const Loading = (props: Props) => {
  return (
    <div className="max-w-screen-xl mx-auto w-full lg:flex gap-4">
      <div className="flex-1 bg-gray-50">
        <h2 className="text-2xl font-bold p-4">Carrito de Compras</h2>
        <hr />
        <div className="flex-1 flex flex-col gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index}>
              <Card />
              <hr />
            </div>
          ))}
        </div>
      </div>
      <div className="lg:w-1/4 relative">
        <div className="flex flex-col gap-y-8 sticky top-0">
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default Loading;
