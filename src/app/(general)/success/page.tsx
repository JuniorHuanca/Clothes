import { CheckCircle } from "lucide-react";

type Props = {};

const Success = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-rose-600 p-8 rounded-lg text-center text-white shadow-xl animate-jump-in">
        <CheckCircle size={64} className="mx-auto mb-4 animate-jump-in animate-delay-1000" />
        <h2 className="text-3xl font-semibold animate-flip-up animate-delay-1000">
          ¡Pago exitoso!
        </h2>
        <p className="text-lg animate-flip-up animate-delay-1000">
          Su pago se ha procesado correctamente.
        </p>
      </div>
    </div>
  );
};

export default Success;
