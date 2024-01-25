import { FormikProps } from "formik";
import { toast } from "sonner";

type Props<FormValues> = {
  formik: FormikProps<FormValues>;
  fieldName: keyof FormValues;
  fieldNameTranslate: string;
  icon?: React.ReactNode;
  customFuntion?: () => void;
  type?: "text" | "number" | "email" | "password";
};

const Input = <FormValues,>({
  formik,
  fieldName,
  fieldNameTranslate,
  icon,
  customFuntion,
  type = "text",
}: Props<FormValues>) => {
  return (
    <div>
      <label className="capitalize block text-gray-600">
        {fieldNameTranslate}:
      </label>
      <div className="relative">
        <input
          className={`block w-full px-5 py-3 text-black bg-white border rounded-lg font-semibold focus:border-green-500 focus:ring-green-600 focus:outline-none focus:ring focus:ring-opacity-80 ${
            formik.touched[fieldName] && formik.errors[fieldName]
              ? "border-red-500 placeholder:text-red-500"
              : "border-gray-700"
          }`}
          type={type}
          {...formik.getFieldProps(fieldName as string)}
          onBlur={(e) => {
            formik.handleBlur(e);
            if (formik.touched[fieldName] && formik.errors[fieldName])
              return toast.error(formik.errors[fieldName] as string);
          }}
        />
        {icon && (
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={customFuntion}
          >
            {icon}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
