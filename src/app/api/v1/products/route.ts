import { baseProducts } from "@/data/products";
import prisma from "@/lib/prismadb";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");
    const gendersQuery = searchParams.get("genders");
    const tagsQuery = searchParams.get("tags");

    const genders = gendersQuery?.split("-");
    const tags = tagsQuery?.split("-");
    const itemsPerPage = 20;
    const productosFiltrados = baseProducts.filter((producto) => {
      const generoCoincide = !genders || genders.includes(producto.gender);
      const etiquetaCoincide =
        !tags || tags.some((tag) => producto.tags.includes(tag));
      return generoCoincide && etiquetaCoincide;
    });
    if (!productosFiltrados.length) {
      return Response.json("products not found", { status: 404 });
    }
    const totalPages = Math.ceil(productosFiltrados.length / itemsPerPage);
    const minItems = (Number(page) - 1) * itemsPerPage;
    const maxItems = Number(page) * itemsPerPage;
    const products = productosFiltrados.slice(minItems, maxItems);
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
