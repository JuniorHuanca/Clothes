"use client";
import {
  Formik,
  FieldArray,
  FormikErrors,
  getIn,
  FormikTouched,
  Field,
} from "formik";
import * as Yup from "yup";
import InputField from "@/components/Dashboard/NewProduct/InputField";

const validationSchema = Yup.object().shape({
  products: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required("El nombre del producto es requerido"),
        quantity: Yup.number()
          .required("La cantidad del producto es requerida")
          .positive("La cantidad debe ser un número positivo")
          .integer("La cantidad debe ser un número entero")
          .typeError("La cantidad debe ser un número"),
        price: Yup.number()
          .required("El precio del producto es requerido")
          .positive("El precio debe ser un número positivo")
          .typeError("El precio debe ser un número"),
        tags: Yup.array().of(Yup.string()),
      })
    )
    .required("Debe agregar al menos un producto"),
});

type Product = {
  name: string;
  quantity: string;
  price: string;
  gender: string;
  tags: string[];
};
type FormValues = {
  products: Product[];
};

type Props = {};

const NewProduct = (props: Props) => {
  const initialValue: Product = {
    name: "",
    quantity: "",
    price: "",
    gender: "",
    tags: [],
  };
  const initialValues: FormValues = {
    products: [initialValue],
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
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
      }) => (
        <form onSubmit={handleSubmit}>
          <FieldArray
            name="products"
            render={(arrayHelpers) => (
              <div>
                {values.products.map((product, index) => (
                  <div key={index}>
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
                        <div className="flex flex-col gap-1 bg-slate-200">
                          {["Tag1", "Tag2", "Tag3"].map((tagName, tagIndex) => (
                            <label key={tagIndex}>
                              <Field
                                type="checkbox"
                                name={`products.${index}.tags`}
                                value={tagName}
                              />
                              {tagName}
                            </label>
                          ))}
                          {product.tags}
                        </div>
                      )}
                    </FieldArray>
                    <FieldArray name={`products.${index}.gender`}>
                      {() => (
                        <div className="flex flex-col gap-1 bg-slate-300">
                          {["gender1", "gender2", "gender3"].map(
                            (tagName, genderIndex) => (
                              <label key={genderIndex}>
                                <Field
                                  type="radio"
                                  name={`products.${index}.gender`}
                                  value={tagName}
                                />
                                {tagName}
                              </label>
                            )
                          )}
                          {product.gender}
                        </div>
                      )}
                    </FieldArray>

                    <button
                      type="button"
                      onClick={() => arrayHelpers.remove(index)}
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => arrayHelpers.push(initialValue)}
                >
                  +
                </button>
              </div>
            )}
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </Formik>
  );
};

export default NewProduct;
