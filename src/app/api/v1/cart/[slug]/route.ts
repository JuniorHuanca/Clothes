import prisma from "@/lib/prismadb";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    if (!userId)
      return Response.json("userId and slug is required", { status: 400 });
    const item = await prisma.cartItem.findFirst({
      where: { cart: { userId: userId }, productSlug: params.slug },
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
