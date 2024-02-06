"use client";
import { useState } from "react";
import Form from "@/components/Dashboard/NewProduct/Form";
import { FormDataNewProduct } from "@/shared/types";

type Props = {};

const NewProduct = (props: Props) => {
  const [numProducts, setNumProducts] = useState(1);
  const [formDataList, setFormDataList] = useState<FormDataNewProduct[]>([]);

  const handleFormChange = (index: number, data: FormDataNewProduct) => {
    const newFormDataList = [...formDataList];
    newFormDataList[index] = data;
    setFormDataList(newFormDataList);
  };

  const handleSave = () => {
    console.log(formDataList);
    // Aquí puedes enviar formDataList al servidor o realizar otras operaciones
  };

  return (
    <div>
      <h2>Add New Products</h2>
      <z className="flex flex-col gap-2 p-2">
        {Array.from({ length: numProducts }, (_, index) => (
          <Form
            key={index}
            formKey={index + 1}
            formData={formDataList[index] || {}}
            onChange={(data) => handleFormChange(index, data)}
          />
        ))}
      </z>
      <button onClick={() => setNumProducts(numProducts + 1)}>
        Add Another Product
      </button>
      <button onClick={handleSave}>Guardar</button>
    </div>
  );
};

export default NewProduct;
