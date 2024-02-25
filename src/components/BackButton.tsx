"use client";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  children?: string;
};

const BackButton = ({ children = "Regresar" }: Props) => {
  const router = useRouter();
  return (
    <button
      className="self-start font-bold m-4 relative w-fit after:block after:content-[''] after:absolute after:h-[3px] after:bg-rose-600 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left hover:text-rose-600 text-base"
      onClick={() => router.back()}
    >
      <div className="inline-flex">
        <ChevronLeft />
        {children}
      </div>
    </button>
  );
};

export default BackButton;
