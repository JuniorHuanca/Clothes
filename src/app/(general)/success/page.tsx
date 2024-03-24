import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = { searchParams: { checkoutSession: string } };
async function patchOrderData(id: string) {
  const res = await fetch(`${process.env.BASE_URL}/api/v1/stripe?id=${id}`, {
    method: "PATCH",
  });
  return res.json();
}
const Success = async ({ searchParams }: Props) => {
  if (!searchParams.checkoutSession) redirect("/");
  await patchOrderData(searchParams.checkoutSession);
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-rose-600 p-8 rounded-lg text-center text-white shadow-xl animate-jump-in">
        <CheckCircle
          size={64}
          className="mx-auto mb-4 animate-jump-in animate-delay-1000"
        />
        <h2 className="text-3xl font-semibold animate-flip-up animate-delay-1000">
          ¡Pago exitoso!
        </h2>
        <p className="text-lg animate-flip-up animate-delay-1000">
          Su pago se ha procesado correctamente.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded bg-rose-100 px-5 py-3 text-sm font-medium text-rose-600 hover:bg-rose-200 focus:outline-none focus:ring animate-flip-up animate-delay-1000"
        >
          Volver a Inicio
        </Link>
      </div>
    </div>
  );
};

export default Success;
