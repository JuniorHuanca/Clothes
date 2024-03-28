import prisma from "../lib/prismadb";
import { baseRoles, baseProducts, baseUsers } from "../data/index";

async function main() {
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();

  await prisma.orderItem.deleteMany();
  await prisma.cartItem.deleteMany();

  await prisma.order.deleteMany();
  await prisma.cart.deleteMany();

  await prisma.user.deleteMany();
  await prisma.product.deleteMany();
  await prisma.role.deleteMany();
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
