import prisma from "@/lib/prismadb";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      return Response.json("Product not found", { status: 404 });
    }
    return Response.json(product, { status: 200 });
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
