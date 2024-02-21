"use client";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import Form from "@/components/Dashboard/NewProduct/Form";

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
  images: File[] | null;
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
    images: null,
  };
  const initialValues: FormValues = {
    products: [initialValue],
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
        setFieldValue,
      }) => (
        <form onSubmit={handleSubmit}>
          <FieldArray
            name="products"
            render={(arrayHelpers) => (
              <div>
                <button
                  type="button"
                  onClick={() => arrayHelpers.push(initialValue)}
                  className="px-4 py-2 rounded bg-indigo-800 mb-2"
                >
                  Nuevo Producto
                </button>
                {values.products.map((product, index) => (
                  <Form
                    key={index}
                    product={product}
                    index={index}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    setFieldValue={setFieldValue}
                    arrayHelpers={arrayHelpers}
                  />
                ))}
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
