import { baseProducts } from "@/data/products";
import prisma from "@/lib/prismadb";
import { IProduct } from "@/shared/types";
import { NextRequest } from "next/server";

//  temp
function compareByPriceAsc(a: IProduct, b: IProduct): number {
  return a.price - b.price;
}

function compareByPriceDesc(a: IProduct, b: IProduct): number {
  return b.price - a.price;
}

function compareByNameAsc(a: IProduct, b: IProduct): number {
  return a.title.localeCompare(b.title);
}

function compareByNameDesc(a: IProduct, b: IProduct): number {
  return b.title.localeCompare(a.title);
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get("page");
    const gendersQuery = searchParams.get("genders");
    const tagsQuery = searchParams.get("tags");
    const sort = searchParams.get("sort");
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
    if (sort === "ascPrice") {
      productosFiltrados.sort(compareByPriceAsc);
    } else if (sort === "descPrice") {
      productosFiltrados.sort(compareByPriceDesc);
    } else if (sort === "descName") {
      productosFiltrados.sort(compareByNameDesc);
    } else {
      productosFiltrados.sort(compareByNameAsc);
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
