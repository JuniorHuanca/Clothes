import React from "react";
import CardSkeleton from "./CardSkeleton";

type Props = {};

const CardsSkeleton = (props: Props) => {
  const numberOfSkeletons = 20;

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {Array.from({ length: numberOfSkeletons }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
};

export default CardsSkeleton;
