import prisma from "@/lib/prismadb";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { ordersIds, userId }: { ordersIds: number[]; userId: string } = body;
    if (!ordersIds.length || !userId)
      return Response.json(
        {
          message: "ordersIds and userId are required",
        },
        { status: 400 }
      );
    const deliveryUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        assignedOrders: {
          connect: ordersIds.map((orderId) => ({ id: orderId })),
        },
      },
      include: {
        assignedOrders: true,
      },
    });
    return Response.json(
      { message: "Orders were assigned correctly", user: deliveryUser },
      { status: 200 }
    );
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
