import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true,
      },
      orderBy: { name: "asc" },
    });
    if (!users.length)
      return Response.json(
        {
          message: "Users not found",
        },
        { status: 404 }
      );
    return Response.json(users, { status: 200 });
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
