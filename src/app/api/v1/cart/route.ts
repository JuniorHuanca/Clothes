import prisma from "@/lib/prismadb";
import { IProductCartSimple } from "@/shared/types";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
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
      throw new Error("El stock es menor que la cantidad solicitada");
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
              productSlug_size_cartId: {
                cartId: cart.id,
                productSlug: product.productSlug,
                size: product.size,
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
    if (!userId) return Response.json("userId", { status: 400 });
    const cart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        products: {
          include: { product: true },
          orderBy: { product: { title: "asc" } },
        },
      },
    });
    if (!cart) return Response.json("cart not found", { status: 404 });
    return Response.json(cart, { status: 200 });
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

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    const itemId = searchParams.get("itemId");
    if (!userId || !itemId)
      return Response.json("userId and slug is required", { status: 400 });
    const item = await prisma.cartItem.delete({
      where: {
        id: Number(itemId),
        cart: { userId: userId },
      },
    });
    if (!item)
      return Response.json("product not found in cart", { status: 404 });
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
