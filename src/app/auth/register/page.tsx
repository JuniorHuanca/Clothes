"use client";
import Link from "next/link";
import { toast } from "sonner";
import { FormValues } from "@/shared/types";
import * as Yup from "yup";
import { useFormik } from "formik";
import Input from "@/components/Custom/Input";
import { useRouter } from "next/navigation";
type Props = {};

const Register = (props: Props) => {
  const router = useRouter();
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("El nombre es requerido"),
    email: Yup.string()
      .email("Ingrese un correo válido")
      .required("El correo es requerido"),
    password: Yup.string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("La contraseña es requerida"),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), undefined],
        "Las contraseñas deben coincidir"
      )
      .required("Confirme su contraseña"),
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
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        resetForm();
        toast.success("Cuenta creada.");
        router.push("/auth/login");
      } else {
        toast.error(response.statusText);
      }
    } catch (error) {
      toast.error("Ocurrió un error, por favor intente nuevamente.");
    }
  }
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-4">Registro</h1>
        <form onSubmit={formik.handleSubmit}>
          <Input
            formik={formik}
            fieldName="name"
            fieldNameTranslate="Nombre de usuario"
          />
          <Input
            formik={formik}
            fieldName="email"
            fieldNameTranslate="Correo electrónico"
          />
          <Input
            formik={formik}
            fieldName="password"
            fieldNameTranslate="Contraseña"
          />
          <Input
            formik={formik}
            fieldName="confirmPassword"
            fieldNameTranslate="Confirmar contraseña"
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 transition"
          >
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-600">
          ¿Ya tienes una cuenta? <Link href="/auth/login">Inicia Sesión</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
