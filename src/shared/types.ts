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
