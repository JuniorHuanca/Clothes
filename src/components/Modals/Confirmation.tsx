import { useState, useEffect } from "react";

type Props = {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
};
const Confirmation = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: Props) => {
  const [isIn, setIsIn] = useState(true);
  const animationClass = isIn ? "animate-jump-in" : "animate-jump-out";
  return (
    <div className="flex justify-center items-center fixed top-0 right-0 w-screen h-screen bg-black/30 z-50">
      <div
        className={`w-full xs:w-[60%] ss:w-[50%] sm:w-[40%] max-w-[500px] h-auto bg-white p-6 rounded-lg ${animationClass}`}
      >
        <div className="flex flex-col items-center gap-2">
          <h2 className="text-xl font-semibold">
            <span className="underline">{title}</span>
          </h2>
          <p>{message}</p>
          <div className="w-full flex justify-evenly">
            <button
              className="rounded-md bg-rose-600 px-5 py-2.5 text-sm font-medium text-white shadow"
              type="button"
              onClick={() => {
                setIsIn(false);
                setTimeout(() => {
                  onConfirm();
                  onCancel();
                }, 500);
              }}
            >
              {confirmText}
            </button>
            <button
              className="rounded-md bg-rose-100 px-5 py-2.5 text-sm font-medium text-rose-600"
              type="button"
              onClick={() => {
                setIsIn(false);
                setTimeout(() => {
                  onCancel();
                }, 500);
              }}
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
