"use client";
import { signIn } from "next-auth/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import { FormValues } from "@/shared/types";
import Input from "../Custom/Input";
import { useSearchParams, useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Tooltip from "../Tooltip";

type Props = {};

const EmailPasswordLogin = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [visibility, setVisibility] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl");
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
    validateOnMount: true,
    initialValues,
    validationSchema,
    onSubmit,
  });
  async function onSubmit(
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) {
    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });
      if (response?.ok) {
        resetForm();
        router.push(callbackUrl || "/");
      } else {
        toast.error(response?.error as string);
      }
    } catch (error) {
      toast.error("Ocurrió un error, por favor intente nuevamente.");
    }
  }
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 py-2">
      <Input formik={formik} fieldName="email" fieldNameTranslate="Email" />
      <Input
        formik={formik}
        fieldName="password"
        fieldNameTranslate="Contraseña"
        type={visibility ? "text" : "password"}
        icon={
          visibility ? (
            <Tooltip text="Ocultar" icon={<EyeOff />} alignment="top" />
          ) : (
            <Tooltip text="Mostrar" icon={<Eye />} alignment="top" />
          )
        }
        customFuntion={() => setVisibility(!visibility)}
      />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
        disabled={formik.isSubmitting}
      >
        Iniciar Sesión con credenciales
      </button>
    </form>
  );
};

export default EmailPasswordLogin;
