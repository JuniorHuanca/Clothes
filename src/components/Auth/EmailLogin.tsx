import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
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
    try {
      const response = await signIn("email", {
        redirect: false,
        email: values.email,
      });
      if (response?.ok) {
        resetForm();
        toast.loading("Redirigiendo...");
        // router.push((router.query.callbackUrl as string) || "/");
      } else {
        toast.error(response?.error as string);
      }
    } catch (error) {
      toast.error("Ocurrió un error, por favor intente nuevamente.");
    }
  }
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <Input formik={formik} fieldName="email" fieldNameTranslate="Email" />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          Iniciar Sesión con correo electrónico
        </button>
      </div>
    </form>
  );
};

export default EmailLogin;
