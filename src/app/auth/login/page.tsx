"use client";
import Providers from "@/components/Auth/Providers";
import Input from "@/components/Custom/Input";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { FormValues } from "@/shared/types";
import EmailLogin from "@/components/Auth/EmailLogin";
type Props = {};

const Login = (props: Props) => {
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un correo válido")
      .required("El correo es requerido"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  async function onSubmit(
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) {
    try {
      // setIsLoggingIn(true);
      const response = await signIn("email", {
        redirect: false,
        email: values.email,
      });
      if (response?.ok) {
        resetForm();
        toast.loading("Redirigiendo...", { duration: 3000 });
        // router.push((router.query.callbackUrl as string) || "/");
      } else {
        toast.error(response?.error as string);
      }
    } catch (error) {
      toast.error("Ocurrió un error, por favor intente nuevamente.");
    }
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Inicio de Sesión</h1>
        <Providers />
        <EmailLogin />
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Input
              formik={formik}
              fieldName="email"
              fieldNameTranslate="Email"
            />
          </div>
          <div className="mb-4">
            <Input
              formik={formik}
              fieldName="password"
              fieldNameTranslate="Contraseña"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            Iniciar Sesión con credenciales
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          ¿No tienes una cuenta? <Link href="/auth/register">Regístrate</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
