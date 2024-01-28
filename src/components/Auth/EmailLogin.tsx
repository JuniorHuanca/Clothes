"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormValues } from "@/shared/types";
import { signIn } from "next-auth/react";
import Input from "../Custom/Input";

type Props = {};

const EmailLogin = (props: Props) => {
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Ingrese un correo válido")
      .required("El correo es requerido"),
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
    await signIn("email", {
      email: values.email,
    });
    resetForm();
  }
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 py-2">
      <Input formik={formik} fieldName="email" fieldNameTranslate="Email" />
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition disabled:opacity-50"
        disabled={formik.isSubmitting}
      >
        Iniciar Sesión con correo electrónico
      </button>
    </form>
  );
};

export default EmailLogin;
