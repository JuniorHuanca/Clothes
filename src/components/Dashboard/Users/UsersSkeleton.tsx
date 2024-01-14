import UserSkeleton from "./UserSkeleton";

type Props = {};

const UsersSkeleton = (props: Props) => {
  const numberOfSkeletons = 20;

  return (
    <div className="flex flex-wrap justify-center gap-2 p-2">
      {Array.from({ length: numberOfSkeletons }, (_, index) => (
        <UserSkeleton key={index} />
      ))}
    </div>
  );
};

export default UsersSkeleton;
