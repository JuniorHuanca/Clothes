import prisma from "@/lib/prismadb";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    if (!userId) return Response.json("userId is required", { status: 404 });
    const orders = await prisma.order.findMany({
      where: { userId: userId },
      include: {
        deliveryUser: true,
        user: true,
        products: { include: { product: true } },
      },
      orderBy: { id: "asc" },
    });
    return Response.json(orders, { status: 200 });
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
