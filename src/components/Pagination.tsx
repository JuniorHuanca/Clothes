"use client";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type Props = {
  totalPages: number;
};
const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const currentPage = Number(searchParams.get("page")) || 1;

  const handlePage = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    push(`${pathname}?${params.toString()}`);
  };

  const maxPageNumbersToShow = 5;
  const getNumbersPages = () => {
    const halfMaxPageNumbersToShow = Math.floor(maxPageNumbersToShow / 2);
    let startPage = Math.max(currentPage - halfMaxPageNumbersToShow, 1);
    let endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages);

    if (endPage - startPage + 1 < maxPageNumbersToShow) {
      startPage = Math.max(endPage - maxPageNumbersToShow + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    );
  };
  const pages = getNumbersPages();

  const nextPage = () => {
    handlePage(currentPage + 1);
  };

  const previousPage = () => {
    handlePage(currentPage - 1);
  };

  return (
    <div className="flex w-full justify-center items-center text-xl py-2 gap-2">
      <button
        disabled={currentPage === 1}
        onClick={previousPage}
        className="disabled:opacity-50 text-rose-600"
      >
        <ArrowLeftCircle className="sm:size-10 hover:fill-rose-200" />
      </button>
      {pages.map((number, index) => (
        <button
          type="button"
          key={index}
          className={`px-2 py-0 sm:px-4 sm:py-2 rounded-full  hover:text-rose-600 hover:bg-rose-200 ${
            number === currentPage ? "bg-rose-600 text-white" : "text-rose-600 "
          }`}
          onClick={() => handlePage(number)}
        >
          {number}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages || !totalPages}
        onClick={nextPage}
        className="disabled:opacity-50 text-rose-600"
      >
        <ArrowRightCircle className="sm:size-10 hover:fill-rose-200" />
      </button>
    </div>
  );
};

export default Pagination;
