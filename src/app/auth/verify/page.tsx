import { MailCheck } from "lucide-react";
import Link from "next/link";

type Props = {};

const Verify = (props: Props) => {
  return (
    <div className="flex h-screen flex-col bg-white">
      <img
        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
        alt=""
        className="h-64 w-full object-cover"
      />

      <div className="flex flex-1 items-center justify-center">
        <div className="mx-auto max-w-xl px-4 py-8 text-center flex flex-col items-center">
          <p className="text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl">
            Correo enviado.
          </p>
          <p className="mt-4 text-gray-500">Puedes cerrar esta pestaña ahora</p>
          <MailCheck size={128} className="text-indigo-600" />
        </div>
      </div>
    </div>
  );
};

export default Verify;
