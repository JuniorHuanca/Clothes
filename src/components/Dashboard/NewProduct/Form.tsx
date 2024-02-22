"use client";

import Tooltip from "@/components/Tooltip";
import {
  FormikErrors,
  getIn,
  FormikTouched,
  FieldArrayRenderProps,
} from "formik";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import InputField from "./InputField";
import Genders from "./Genders";
import Tags from "./Tags";
import { FormDataNewProduct } from "@/shared/types";
import Types from "./Types";
import Sizes from "./Sizes";

type FormValues = {
  products: FormDataNewProduct[];
};

type Props = {
  product: FormDataNewProduct;
  index: number;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>
  ) => void;
  setFieldValue: (
    field: string,
    value: keyof FormDataNewProduct | File[]
  ) => void;
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
        <div className="w-max flex bg-indigo-800 rounded p-2 text-white">
          <button type="button" onClick={toggleForm}>
            <Tooltip
              text="Mostrar formulario"
              icon={
                <div className="flex items-center justify-center max-w-60">
                  <span className="line-clamp-1">
                    {product.title || `Producto N° ${index}`}
                  </span>
                  <Plus className="flex-none" />
                </div>
              }
              alignment="top"
            />
          </button>
          <button type="button" onClick={() => arrayHelpers.remove(index)} className="text-red-500">
            <Tooltip
              text="Eliminar formulario"
              icon={<Trash2 className="flex-none" />}
              alignment="top"
            />
          </button>
        </div>
      )}

      {showForm && (
        <div className="relative w-full sm:p-4 grid gap-3 justify-center [grid-template-areas:'title_selectors_selector''description_description_priceandstock''images_images_images'] [grid-template-columns:1fr_repeat(2,300px)]">
          <button
            className="absolute -top-2 right-0"
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
            className="[grid-area:title]"
            name={`products.${index}.title`}
            value={product.title}
            fieldNameTranslate="Nombre"
            error={getError(errors, index, "title")}
            touch={getTouch(touched, index, "title")}
            placeholder="Nombre"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="[grid-area:selectors] grid grid-cols-2 gap-2">
            <Tags index={index} />
            <Sizes index={index} />
          </div>
          <div className="[grid-area:selector] grid grid-cols-2 gap-2">
            <Genders index={index} />
            <Types index={index} />
          </div>
          <InputField
            className="[grid-area:description]"
            name={`products.${index}.description`}
            value={product.description}
            fieldNameTranslate="Descripcion"
            error={getError(errors, index, "description")}
            touch={getTouch(touched, index, "description")}
            placeholder="Descripcion"
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <div className="[grid-area:priceandstock] grid grid-cols-2 gap-2">
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
              name={`products.${index}.inStock`}
              value={product.inStock}
              fieldNameTranslate="Cantidad"
              error={getError(errors, index, "inStock")}
              touch={getTouch(touched, index, "inStock")}
              placeholder="99"
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          <div className="[grid-area:images]">
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
                className=""
              />
            </div>
            <div className="flex flex-wrap justify-center">
              {product.images?.map((e, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(e)}
                  alt={"preview" + index}
                  className="w-72 h-72 object-scale-down rounded-md mr-2"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
