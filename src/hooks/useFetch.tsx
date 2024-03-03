export async function useFetch<T>(url: string): Promise<T> {
  // emulate delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await fetch(`${process.env.BASE_URL}${url}`, {
    next: {
      revalidate: 0, // use 0 to opt out of using cache
    },
  });

  // if (!res.ok) {
  //   throw new Error(
  //     `¡Error al procesar la solicitud! Estado: ${res.status}. Por favor, inténtalo de nuevo más tarde.`
  //   );
  // }

  return res.json();
}
