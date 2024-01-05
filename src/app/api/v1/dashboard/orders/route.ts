import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        deliveryUser: true,
      },
      orderBy: {
        id: "asc",
      },
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
