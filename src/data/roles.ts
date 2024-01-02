export const baseRoles = [
  { name: "Usuario", routes: [] },
  {
    name: "Administrador",
    routes: [
      "/dashboard",
      "/dashboard/users",
      "/dashboard/products",
      "/dashboard/orders",
    ],
  },
  {
    name: "Delivery",
    routes: ["/dashboard", "/dashboard/orders"],
  },
];
