type Props = {};

const UserSkeleton = (props: Props) => {
  return (
    <div className="flex flex-col justify-between gap-2 bg-white shadow-lg rounded-lg p-2 select-none w-64 max-[400px]:w-full">
      <div className="bg-gray-200 w-full animate-pulse h-3 rounded-2xl" />
      <div className="bg-gray-300 w-full animate-pulse h-4 rounded-2xl" />
      <div className="bg-gradient-to-r from-indigo-200 via-purple-200 to-emerald-200 w-full animate-pulse h-12 rounded-2xl" />
    </div>
  );
};

export default UserSkeleton;
