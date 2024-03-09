import prisma from "../lib/prismadb";
import { baseRoles, baseProducts, baseOrders, baseUsers } from "../data/index";

async function main() {
  await Promise.all([
    prisma.session.deleteMany(),
    prisma.account.deleteMany(),
    prisma.cart.deleteMany(),

    prisma.orderItem.deleteMany(),
    prisma.cartItem.deleteMany(),

    prisma.order.deleteMany(),
    prisma.user.deleteMany(),
    prisma.product.deleteMany(),
  ]);

  await Promise.all([
    prisma.role.createMany({
      data: baseRoles,
    }),
    prisma.user.createMany({
      data: baseUsers,
    }),
    prisma.product.createMany({
      data: baseProducts,
    }),
  ]);
}

(() => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
