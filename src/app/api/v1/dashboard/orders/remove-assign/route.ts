import prisma from "@/lib/prismadb";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { ordersIds }: { ordersIds: string[] } = body;
    if (!ordersIds.length)
      return Response.json(
        {
          message: "ordersIds are required",
        },
        { status: 400 }
      );
    ordersIds.map(async (e) => {
      await prisma.order.update({
        where: { id: e },
        data: {
          deliveryUserId: null,
        },
      });
    });
    return Response.json(
      { message: "Orders unassigned successfully" },
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
