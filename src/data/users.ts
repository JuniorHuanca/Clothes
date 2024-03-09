import { hashSync } from "bcryptjs";

export const baseUsers = [
  {
    email: "user21@gmail.com",
    name: "Usuario Junior Huanca",
    password: hashSync("123456789", 5),
    roleId: 1,
  },
  {
    email: "admin21@gmail.com",
    name: "Administrador Junior Huanca",
    password: hashSync("123456789", 5),
    roleId: 2,
  },
  {
    email: "delivery21@gmail.com",
    name: "Repartidor Junior Huanca",
    password: hashSync("123456789", 5),
    roleId: 3,
  },
];
