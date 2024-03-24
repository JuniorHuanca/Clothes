import { IProductCart } from "./types";

export const formatPrice = (price: number) => {
  // return price.toLocaleString("es-PE", {
  //   style: "currency",
  //   currency: "PEN",
  // });
  return price.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

export const calcularSubtotal = (items: IProductCart[]): number => {
  let subtotalTotal = 0;
  for (const producto of items) {
    subtotalTotal += calcularSubtotalItem(producto);
  }
  return subtotalTotal;
};

export const calcularSubtotalItem = (producto: IProductCart): number => {
  const float = (producto.quantity * producto.product.price).toFixed(2);
  return parseFloat(float);
};

export const formatDate = (
  date: string,
  locale: Intl.LocalesArgument = "es",
  options: Intl.DateTimeFormatOptions = {
    dateStyle: "medium",
    timeStyle: "short",
  }
) => {
  const newDate = new Date(date);
  return new Intl.DateTimeFormat(locale, options).format(newDate);
};
