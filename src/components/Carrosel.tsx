"use client";
import { useState } from "react";
import { MoveRight, MoveLeft, ChevronRight, ChevronLeft } from "lucide-react";
type Props = {
  slides: string[];
};

const Carrosel = ({ slides }: Props) => {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  const nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };
  return (
    <div className="overflow-hidden relative">
      <div
        className={`flex transition ease-out duration-40`}
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s) => {
          return (
            <img src={s} key={s} className="aspect-square object-scale-down" />
          );
        })}
      </div>

      <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-4 text-3xl">
        <button
          className="bg-black/30 rounded-full p-1"
          onClick={previousSlide}
          type="button"
        >
          <ChevronLeft />
        </button>
        <button
          className="bg-black/30 rounded-full p-1"
          onClick={nextSlide}
          type="button"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((_, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`rounded-full w-5 h-5 cursor-pointer  ${
                i == current ? "bg-rose-600" : "bg-gray-500"
              }`}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Carrosel;
