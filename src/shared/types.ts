export interface IProduct {
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  type: string;
  tags: string[];
  title: string;
  gender: string;
}

export interface IProductCart {
  id: number;
  quantity: number;
  size: string;
  productSlug: string;
  cartId: number;
  product: IProduct;
  createdAt: string;
  updatedAt: string;
}

export interface IProductCartSimple {
  quantity: number;
  size: string;
  productSlug: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified: null;
  image: null;
  password: string;
  roleId: number;
  role: IRole;
}

export interface IRole {
  id: number;
  name: string;
  routes: string[];
}

export interface IOrder {
  id: number;
  description: string;
  deliveryUserId: string;
  deliveryUser: IUser;
}

export interface FormValues {
  [key: string]: string;
}

export interface FormDataNewProduct {
  description: string;
  images: File[] | null;
  inStock: number;
  price: number;
  sizes: string[];
  slug: string;
  type: string;
  tags: string[];
  title: string;
  gender: string;
}
