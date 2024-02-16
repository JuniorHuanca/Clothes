"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Registrar el error en un servicio de reporte de errores
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col h-screen bg-white">
      <img
        src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80"
        alt=""
        className="object-cover h-64 w-full"
      />

      <div className="flex items-center justify-center flex-1">
        <div className="mx-auto max-w-xl px-4 py-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Algo salió mal
          </h1>

          <p className="mt-4 text-gray-500">Reintenta o vuelve más tarde</p>

          <button
            type="button"
            className="inline-block px-5 py-3 mt-6 font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring"
            onClick={() => reset()}
          >
            Volver a intentar
          </button>
        </div>
      </div>
    </div>
  );
}
