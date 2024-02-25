import { baseGenders } from "@/data/general";
import { Field, FieldArray } from "formik";
import { ChevronDown } from "lucide-react";

type Props = {
  index: number;
};

const Genders = ({ index }: Props) => {
  return (
    <details className="group h-min mt-4">
      <summary className="flex cursor-pointer items-center justify-between gap-2 p-4 rounded-lg border border-gray-700 text-gray-900 transition">
        <span className="text-sm font-medium"> Genero </span>
        <span className="transition group-open:-rotate-180">
          <ChevronDown />
        </span>
      </summary>
      <FieldArray name={`products.${index}.gender`}>
        {() => (
          <div className="flex flex-col gap-1 border border-t-transparent border-gray-700 p-2">
            {baseGenders.map((gender, genderIndex) => (
              <label key={genderIndex} className="inline-flex items-center">
                <Field
                  type="radio"
                  name={`products.${index}.gender`}
                  value={gender.name}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">{gender.name}</span>
              </label>
            ))}
          </div>
        )}
      </FieldArray>
    </details>
  );
};

export default Genders;
