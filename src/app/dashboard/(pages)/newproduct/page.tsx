"use client";
import { Formik, FieldArray } from "formik";
import Form from "@/components/Dashboard/NewProduct/Form";
import { FormDataNewProduct } from "@/shared/types";
import { validationSchema } from "@/shared/validationsForms";

type Props = {};

const NewProduct = (props: Props) => {
  const initialValue: FormDataNewProduct = {
    description: "",
    images: null,
    inStock: 0,
    price: 0,
    sizes: [],
    slug: "",
    type: "",
    tags: [],
    title: "",
    gender: "",
  };
  const initialValues = {
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
        <form onSubmit={handleSubmit} className="p-4">
          <FieldArray
            name="products"
            render={(arrayHelpers) => (
              <>
                <button
                  type="button"
                  onClick={() => arrayHelpers.push(initialValue)}
                  className="px-4 py-2 rounded bg-indigo-800 mb-2 w-max text-white"
                >
                  👚 Nuevo Producto
                </button>
                <div className="flex flex-col gap-1">
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
              </>
            )}
          />
          <button
            className="mt-4 text-white px-4 py-2 rounded bg-green-500 mb-2 w-max"
            type="submit"
          >
            Submit
          </button>
        </form>
      )}
    </Formik>
  );
};

export default NewProduct;
