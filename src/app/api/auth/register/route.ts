import prisma from "@/lib/prismadb";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      password,
    }: {
      name: string;
      email: string;
      password: string;
    } = body;
    if (!name || !email || !password) {
      return Response.json(
        { message: "name, email and password required" },
        { status: 400 }
      );
    }
    // check duplicate users
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExist) {
      return Response.json(
        { message: "The account has already been created before" },
        { status: 400 }
      );
    }
    const passwordhash = await hash(password, 5);
    await prisma.user.create({
      data: {
        name: name,
        email,
        password: passwordhash,
        roleId: 1,
      },
    });
    return Response.json(
      { message: "user created successfully" },
      { status: 201 }
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
