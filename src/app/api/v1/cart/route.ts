import prisma from "@/lib/prismadb";
import { IProductCartSimple } from "@/shared/types";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      product,
    }: {
      userId: string;
      product: IProductCartSimple;
    } = body;
    const [cart, productInStock] = await Promise.all([
      prisma.cart.upsert({
        where: { userId },
        create: {
          userId: userId,
        },
        update: {},
      }),
      prisma.product.findUnique({
        where: { slug: product.productSlug },
        select: { inStock: true },
      }),
    ]);
    if (productInStock && product.quantity > productInStock.inStock)
      throw new Error("Stock is less than the quantity requested");
    const updateCart = await prisma.cart.upsert({
      where: { userId: userId },
      create: {
        userId: userId,
        products: {
          create: {
            quantity: product.quantity,
            size: product.size,
            productSlug: product.productSlug,
          },
        },
      },
      update: {
        products: {
          upsert: {
            where: {
              productSlug_cartId: {
                cartId: cart.id,
                productSlug: product.productSlug,
              },
            },
            create: {
              quantity: product.quantity,
              size: product.size,
              productSlug: product.productSlug,
            },
            update: {
              quantity: product.quantity,
              size: product.size,
            },
          },
        },
      },
      include: {
        products: true,
      },
    });
    return Response.json(updateCart, { status: 200 });
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
