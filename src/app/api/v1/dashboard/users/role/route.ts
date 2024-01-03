import prisma from "@/lib/prismadb";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      roleId,
    }: {
      roleId: number;
      email: string;
    } = body;
    if (!email || !roleId) {
      return Response.json(
        { message: "email and roleId required" },
        { status: 400 }
      );
    }
    const updateUser = await prisma.user.update({
      where: { email },
      data: { roleId },
    });
    return Response.json(
      { message: "role changed successfully", user: updateUser },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: "fail" });
  }
}
