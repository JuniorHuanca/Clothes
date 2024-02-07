"use client";

import Tooltip from "@/components/Tooltip";
import { FormDataNewProduct } from "@/shared/types";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

type Props = {
  formData: FormDataNewProduct;
  onChange: (data: FormDataNewProduct) => void;
  formKey: number;
};

const Form = ({ formData, onChange, formKey }: Props) => {
  const [showForm, setShowForm] = useState(true);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const imageArray: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const imageURL = URL.createObjectURL(files[i]);
        imageArray.push(imageURL);
      }
      onChange({ ...formData, [name]: imageArray });
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const sizeArray = value.split(",").map((size) => size.trim());
    onChange({ ...formData, [name]: sizeArray });
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const tagArray = value.split(",").map((tag) => tag.trim());
    onChange({ ...formData, [name]: tagArray });
  };
  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
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
                  {formData.title || `Producto N° ${formKey}`}
                </span>
                <Plus className="flex-none" />
              </div>
            }
            alignment="top"
          />
        </button>
      )}

      {showForm && (
        <form className="relative bg-slate-500">
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
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="images">Images:</label>
            <input
              type="file"
              id="images"
              name="images"
              onChange={handleImageChange}
              multiple
              accept="image/*"
              required
            />
          </div>
          <div>
            <label htmlFor="inStock">In Stock:</label>
            <input
              type="number"
              id="inStock"
              name="inStock"
              value={formData.inStock}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="sizes">Sizes (comma-separated):</label>
            <input
              type="text"
              id="sizes"
              name="sizes"
              // value={formData.sizes.join(", ")}
              onChange={handleSizeChange}
              required
            />
          </div>
          <div>
            <label htmlFor="slug">Slug:</label>
            <input
              type="text"
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="type">Type:</label>
            <input
              type="text"
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="tags">Tags (comma-separated):</label>
            <input
              type="text"
              id="tags"
              name="tags"
              // value={formData.tags.join(", ")}
              onChange={handleTagChange}
              required
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <input
              type="text"
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* <button type="submit">Submit</button> */}
        </form>
      )}
    </div>
  );
};

export default Form;

// "use client";

// import Input from "@/components/Custom/Input";
// import { FormDataNewProduct } from "@/shared/types";
// import { useFormik } from "formik";
// import { Minus, Plus } from "lucide-react";
// import { useState } from "react";
// import * as Yup from "yup";

// type Props = {
//   formData: FormDataNewProduct;
//   onChange: (data: FormDataNewProduct) => void;
//   formKey: number;
// };

// const Form = ({ formData, onChange, formKey }: Props) => {
//   const [showForm, setShowForm] = useState(true);
//   const validationSchema = Yup.object().shape({
//     description: Yup.string().required("La descripción es requerida"),
//     images: Yup.array().min(1, "Debe seleccionar al menos una imagen"),
//     inStock: Yup.number()
//       .required("La cantidad en stock es requerida")
//       .min(0, "La cantidad en stock debe ser mayor o igual a cero"),
//     price: Yup.number()
//       .required("El precio es requerido")
//       .min(0, "El precio debe ser mayor o igual a cero"),
//     sizes: Yup.array().min(1, "Debe seleccionar al menos un tamaño"),
//     slug: Yup.string().required("El slug es requerido"),
//     type: Yup.string().required("El tipo es requerido"),
//     tags: Yup.array().min(1, "Debe seleccionar al menos una etiqueta"),
//     title: Yup.string().required("El título es requerido"),
//     gender: Yup.string().required("El género es requerido"),
//   });
//   const formik = useFormik({
//     initialValues: formData,
//     validationSchema,
//     onSubmit,
//   });
//   async function onSubmit(
//     values: FormDataNewProduct,
//     { resetForm }: { resetForm: () => void }
//   ) {
//     console.log(values);
//     resetForm();
//   }
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     formik.handleChange(e);
//     onChange({ ...formData, [name]: value });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, files } = e.target;
//     if (files && files.length > 0) {
//       const imageArray: string[] = [];
//       for (let i = 0; i < files.length; i++) {
//         const imageURL = URL.createObjectURL(files[i]);
//         imageArray.push(imageURL);
//       }
//       onChange({ ...formData, [name]: imageArray });
//     }
//   };

//   const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const sizeArray = value.split(",").map((size) => size.trim());
//     onChange({ ...formData, [name]: sizeArray });
//   };

//   const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     const tagArray = value.split(",").map((tag) => tag.trim());
//     onChange({ ...formData, [name]: tagArray });
//   };
//   const toggleForm = () => {
//     setShowForm((prevState) => !prevState);
//   };

//   return (
//     <div className="p-2">
//       <button
//         type="button"
//         onClick={toggleForm}
//         className="flex items-center justify-center px-4 py-2 rounded bg-indigo-800 max-w-60"
//       >
//         {showForm ? (
//           <Minus className="flex-none" />
//         ) : (
//           <Plus className="flex-none" />
//         )}
//         <span className="line-clamp-1">
//           {formData.title || `Producto N° ${formKey}`}
//         </span>
//       </button>

//       {showForm && (
//         <form className="">
//           <Input
//             formik={formik}
//             fieldName="title"
//             fieldNameTranslate="Titulo"
//           />
//           {/* <Input formik={formik} fieldName="description" fieldNameTranslate="description" /> */}
//           <Input
//             formik={formik}
//             fieldName="inStock"
//             fieldNameTranslate="Stock"
//           />
//           <Input formik={formik} fieldName="price" fieldNameTranslate="price" />
//           <Input formik={formik} fieldName="type" fieldNameTranslate="type" />
//           <Input
//             formik={formik}
//             fieldName="gender"
//             fieldNameTranslate="gender"
//           />
//           <div>
//             <label htmlFor="description">Description:</label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="images">Images:</label>
//             <input
//               type="file"
//               id="images"
//               name="images"
//               onChange={handleImageChange}
//               multiple
//               accept="image/*"
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="sizes">Sizes (comma-separated):</label>
//             <input
//               type="text"
//               id="sizes"
//               name="sizes"
//               // value={formData.sizes.join(", ")}
//               onChange={handleSizeChange}
//               required
//             />
//           </div>
//           <div>
//             <label htmlFor="tags">Tags (comma-separated):</label>
//             <input
//               type="text"
//               id="tags"
//               name="tags"
//               // value={formData.tags.join(", ")}
//               onChange={handleTagChange}
//               required
//             />
//           </div>
//         </form>
//       )}
//     </div>
//   );
// };

// export default Form;
