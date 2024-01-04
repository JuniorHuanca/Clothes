import prisma from "@/lib/prismadb";

export async function GET() {
  try {
    const roles = await prisma.user.findMany({
      include: {
        role: true,
      },
    });
    if (!roles.length)
      return Response.json(
        {
          message: "Users not found",
        },
        { status: 404 }
      );
    return Response.json(roles, { status: 200 });
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
