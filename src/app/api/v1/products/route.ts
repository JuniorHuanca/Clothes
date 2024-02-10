import { baseProducts } from "@/data/products";
import prisma from "@/lib/prismadb";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");
    const itemsPerPage = 20;
    const totalPages = Math.ceil(baseProducts.length / itemsPerPage);
    const minItems = (Number(page) - 1) * itemsPerPage;
    const maxItems = Number(page) * itemsPerPage;
    const products = baseProducts.slice(minItems, maxItems);
    return Response.json(
      {
        totalPages,
        products,
      },
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
