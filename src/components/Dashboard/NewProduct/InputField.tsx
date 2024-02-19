import { toast } from "sonner";

type Props = {
  fieldNameTranslate: string;
  placeholder: string;
  name: string;
  value: string;
  error?: string;
  touch?: boolean;
  type?: "text" | "number" | "email" | "password";
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField = ({
  name,
  error,
  touch,
  value,
  type = "text",
  fieldNameTranslate,
  placeholder,
  onChange,
  onBlur,
}: Props) => {
  return (
    <div>
      <label className="capitalize block text-gray-600">
        {fieldNameTranslate}:
      </label>
      <div className="relative">
        <input
          className={`block w-full px-5 py-3 text-black bg-white border rounded-lg font-semibold focus:border-indigo-500 focus:ring-indigo-600 focus:outline-none focus:ring focus:ring-opacity-80 ${
            touch && error
              ? "border-red-500 placeholder:text-red-500"
              : "border-gray-700"
          }`}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={(touch && error) || placeholder}
          onBlur={(e) => {
            onBlur(e);
            if (error) return toast.error(error);
          }}
        />
      </div>
    </div>
  );
};

export default InputField;
