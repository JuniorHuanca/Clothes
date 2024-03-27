export const baseRoles = [
  {
    id: 1,
    name: "Usuario",
    routes: [],
  },
  {
    id: 2,
    name: "Administrador",
    routes: [
      "/dashboard",
      "/dashboard/users",
      "/dashboard/products",
      "/dashboard/newproduct",
      "/dashboard/orders",
    ],
  },
  {
    id: 3,
    name: "Delivery",
    routes: ["/dashboard", "/dashboard/orders"],
  },
];
