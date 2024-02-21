"use client";

import Tooltip from "@/components/Tooltip";
import {
  FieldArray,
  FormikErrors,
  getIn,
  FormikTouched,
  Field,
  FieldArrayRenderProps,
} from "formik";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import InputField from "./InputField";
type Product = {
  name: string;
  quantity: string;
  price: string;
  gender: string;
  tags: string[];
  images: File[] | null;
};
type FormValues = {
  products: Product[];
};
type Props = {
  product: Product;
  index: number;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
  ) => void;
  setFieldValue: (field: string, value: keyof Product | File[]) => void;
  arrayHelpers: FieldArrayRenderProps;
};

const Form = ({
  product,
  index,
  errors,
  touched,
  handleChange,
  handleBlur,
  setFieldValue,
  arrayHelpers,
}: Props) => {
  const [showForm, setShowForm] = useState(true);
  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };
  const getError = (
    errors: FormikErrors<FormValues>,
    index: number,
    field: keyof FormValues["products"][number]
  ) => {
    const error: string = getIn(errors, `products[${index}].${field}`);
    return error ?? "";
  };
  const getTouch = (
    touched: FormikTouched<FormValues>,
    index: number,
    field: keyof FormValues["products"][number]
  ) => {
    const touch = getIn(touched, `products[${index}].${field}`);
    return touch;
  };
  return (
    <div>
      {!showForm && (
        <button type="button" onClick={toggleForm}>
          <Tooltip
            text="Mostrar formulario"
            icon={
              <div className="flex items-center justify-center px-4 py-2 rounded bg-indigo-800 max-w-60">
                <span className="line-clamp-1">
                  {product.name || `Producto N° ${index}`}
                </span>
                <Plus className="flex-none" />
              </div>
            }
            alignment="top"
          />
        </button>
      )}

      {showForm && (
        <div className="relative">
          <button
            className="absolute top-0 right-0"
            type="button"
            onClick={toggleForm}
          >
            <Tooltip
              text="Ocultar formulario"
              icon={<Minus className="flex-none" />}
              alignment="left"
            />
          </button>
          <InputField
            name={`products.${index}.name`}
            value={product.name}
            fieldNameTranslate="Nombre"
            error={getError(errors, index, "name")}
            touch={getTouch(touched, index, "name")}
            placeholder="Nombre"
            onBlur={handleBlur}
            onChange={handleChange}
          />

          <InputField
            type="number"
            name={`products.${index}.price`}
            value={product.price}
            fieldNameTranslate="Precio"
            error={getError(errors, index, "price")}
            touch={getTouch(touched, index, "price")}
            placeholder="12.99"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <InputField
            type="number"
            name={`products.${index}.quantity`}
            value={product.quantity}
            fieldNameTranslate="Cantidad"
            error={getError(errors, index, "quantity")}
            touch={getTouch(touched, index, "quantity")}
            placeholder="99"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <FieldArray name={`products.${index}.tags`}>
            {() => (
              <div className="flex flex-col gap-1 bg-slate-200 p-4 mt-4">
                {["Tag1", "Tag2", "Tag3"].map((tagName, tagIndex) => (
                  <label key={tagIndex} className="inline-flex items-center">
                    <Field
                      type="checkbox"
                      name={`products.${index}.tags`}
                      value={tagName}
                      className="form-checkbox h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700">{tagName}</span>
                  </label>
                ))}
              </div>
            )}
          </FieldArray>
          <FieldArray name={`products.${index}.gender`}>
            {() => (
              <div className="flex flex-col gap-1 bg-slate-300 p-4 mt-4">
                {["gender1", "gender2", "gender3"].map(
                  (tagName, genderIndex) => (
                    <label
                      key={genderIndex}
                      className="inline-flex items-center"
                    >
                      <Field
                        type="radio"
                        name={`products.${index}.gender`}
                        value={tagName}
                        className="form-radio h-5 w-5 text-indigo-600"
                      />
                      <span className="ml-2 text-gray-700">{tagName}</span>
                    </label>
                  )
                )}
              </div>
            )}
          </FieldArray>
          <div className="mt-4">
            <label
              htmlFor={`products.${index}.images`}
              className="block text-sm font-medium text-gray-700"
            >
              Images:
            </label>
            <input
              id={`products.${index}.images`}
              name={`products.${index}.images`}
              type="file"
              accept="image/*"
              multiple
              onChange={(event) => {
                if (event.currentTarget.files)
                  setFieldValue(
                    `products.${index}.images`,
                    Array.from(event.currentTarget.files)
                  );
              }}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mt-4">
            {product.images?.map((e, index) => (
              <img
                src={URL.createObjectURL(e)}
                key={index}
                alt={"preview" + index}
                className="h-20 w-20 object-cover rounded-md mr-2"
              />
            ))}
          </div>
          <button type="button" onClick={() => arrayHelpers.remove(index)}>
            -
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
