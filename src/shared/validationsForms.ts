import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  products: Yup.array()
    .of(
      Yup.object().shape({
        description: Yup.string().required("La descripción es requerida"),
        images: Yup.array().min(2, "Debe seleccionar al menos dos imagenes"),
        inStock: Yup.number()
          .required("La cantidad en stock es requerida")
          .min(0, "La cantidad en stock debe ser mayor o igual a cero"),
        price: Yup.number()
          .required("El precio es requerido")
          .min(0, "El precio debe ser mayor o igual a cero"),
        sizes: Yup.array().min(1, "Debe seleccionar al menos un tamaño"),
        type: Yup.string().required("El tipo es requerido"),
        tags: Yup.array().min(1, "Debe seleccionar al menos una etiqueta"),
        title: Yup.string().required("El título es requerido"),
        gender: Yup.string().required("El género es requerido"),
      })
    )
    .required("Debe agregar al menos un producto"),
});
