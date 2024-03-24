import prisma from "@/lib/prismadb";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number(searchParams.get("page"));
    const gendersQuery = searchParams.get("genders");
    const search = searchParams.get("search");
    const tagsQuery = searchParams.get("tags");
    const sort = searchParams.get("sort");
    const genders = gendersQuery?.split("-");
    const tags = tagsQuery?.split("-");
    const itemsPerPage = 20;

    let orderBy: { [key: string]: "asc" | "desc" } = {};
    switch (sort) {
      case "ascPrice":
        orderBy.price = "asc";
        break;
      case "descPrice":
        orderBy.price = "desc";
        break;
      case "descName":
        orderBy.title = "desc";
        break;
      default:
        orderBy.title = "asc";
    }
    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where: {
          AND: [
            { gender: { in: genders } },
            {
              tags: tags ? { hasSome: tags } : undefined,
            },
          ],
          OR: [
            {
              title: {
                contains: search ? search : undefined,
                mode: "insensitive",
              },
            },
            {
              type: {
                contains: search ? search : undefined,
                mode: "insensitive",
              },
            },
          ],
        },
        take: itemsPerPage,
        skip: itemsPerPage * (page - 1),
        orderBy,
      }),
      prisma.product.count({
        where: {
          AND: [
            { gender: { in: genders } },
            { tags: tags ? { hasSome: tags } : undefined },
          ],
          OR: [
            {
              title: {
                contains: search ? search : undefined,
                mode: "insensitive",
              },
            },
            {
              type: {
                contains: search ? search : undefined,
                mode: "insensitive",
              },
            },
          ],
        },
      }),
    ]);
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    if (totalPages === 0) {
      return Response.json("products not found", { status: 404 });
    }
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
