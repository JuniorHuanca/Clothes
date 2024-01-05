import { baseRoles } from "@/data/roles";
import prisma from "@/lib/prismadb";

export async function POST() {
  try {
    await prisma.role.createMany({
      data: baseRoles,
    });
    return Response.json({ message: "data is in app" });
  } catch (error) {
    return Response.json({ message: "fail" });
  }
}
