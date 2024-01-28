import prisma from "@/lib/prismadb";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get("userId");

    if (!userId) throw new Error("User ID not provided in the request parameters");

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        role: true,
      },
    });

    if (!user) throw new Error("User not found with the provided user ID");
    
    const orders = await prisma.order.findMany({
      ...(user.role.name === "Administrador"
        ? { include: { deliveryUser: true }, orderBy: { id: "asc" } }
        : {
            where: { deliveryUserId: userId },
            include: { deliveryUser: true },
            orderBy: { id: "asc" },
          }),
    });

    if (!orders.length)
      return Response.json(
        {
          message: "Orders not found",
        },
        { status: 404 }
      );
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
