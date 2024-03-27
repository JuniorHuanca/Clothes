import prisma from "../lib/prismadb";
import { baseRoles, baseProducts, baseUsers } from "../data/index";

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
    prisma.role.deleteMany(),
  ]);
  await prisma.role.createMany({
    data: baseRoles,
  });
  await Promise.all([
    prisma.user.createMany({
      data: baseUsers,
    }),
    prisma.product.createMany({
      data: baseProducts,
    }),
  ]);
}

(() => {
  main();
})();
