import Providers from "@/components/Auth/Providers";
import Link from "next/link";
import EmailLogin from "@/components/Auth/EmailLogin";
import EmailPasswordLogin from "@/components/Auth/EmailPasswordLogin";
import { authOptions } from "@/shared/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
type Props = {};

const Login = async (props: Props) => {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-2 sm:p-8 rounded shadow-md sm:w-96">
        <h1 className="text-2xl font-semibold mb-4">Inicio de Sesión</h1>
        <Providers />
        <EmailLogin />
        <EmailPasswordLogin />
        <p className="text-sm font-bold text-center">
          ¿No tienes una cuenta?{" "}
          <Link href="/auth/register" className="underline">
            Regístrate
          </Link>
        </p>
        <p>Administrador: &quot;admin21@gmail.com&quot;.</p>
      </div>
    </main>
  );
};

export default Login;
