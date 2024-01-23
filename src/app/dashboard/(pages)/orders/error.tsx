"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      {!error.message.includes("404") && <h2>Something went wrong!</h2>}
      {error.message.includes("404") && (
        <h2>Usted no tiene ordenes asignadas aun </h2>
      )}
      <button onClick={() => reset()}>Refrescar</button>
    </div>
  );
}
