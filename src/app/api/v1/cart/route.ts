import prisma from "@/lib/prismadb";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: { [key: string]: string } = await request.json();
    const { userId, productSlug } = body;
    // console.log(userId, productSlug);
    const item = await prisma.cartItem.findFirst({
      where: { cart: { userId } },
    });
    const cart = await prisma.cart.upsert({
      where: {
        userId,
      },
      update: {},
      create: {
        userId,
        products: {
          create: {
            quantity: 1,
            size: "M",
            productSlug,
          },
        },
      },
    });
    const carts = await prisma.cart.findMany({
      include: { products: true },
    });
    return Response.json({ cart, carts }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const slug = searchParams.get("slug");
    if (!userId || !slug)
      return Response.json("userId and slug is required", { status: 400 });
    const item = await prisma.cartItem.findFirst({
      where: { cart: { userId: userId }, productSlug: slug },
    });
    if (!item)
      return Response.json("product not found in cart", { status: 200 });
    return Response.json(item, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
  }
}
