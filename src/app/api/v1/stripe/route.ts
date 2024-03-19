import prisma from "@/lib/prismadb";
import { IProductCart } from "@/shared/types";
import { NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { Session } from "next-auth";
import { calcularSubtotal } from "@/shared/utils";
import { orderStatuses } from "@/data";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});
export async function POST(request: NextRequest) {
  try {
    const headersList = headers();
    const body = await request.json();
    const { cart, session }: { cart: IProductCart[]; session: Session } = body;
    const checkoutSession = await stripe.checkout.sessions.create({
      submit_type: "pay",
      customer_email: session.user.email,
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: [
          "US",
          "AE",
          "AG",
          "AL",
          "AM",
          "AR",
          "AT",
          "AU",
          "BA",
          "BE",
          "BG",
          "BH",
          "BO",
          "CA",
          "CH",
          "CI",
          "CL",
          "CO",
          "CR",
          "CY",
          "CZ",
          "DE",
          "DK",
          "DO",
          "EC",
          "EE",
          "EG",
          "ES",
          "ET",
          "FI",
          "FR",
          "GB",
          "GH",
          "GM",
          "GR",
          "GT",
          "GY",
          "HK",
          "HR",
          "HU",
          "ID",
          "IE",
          "IL",
          "IS",
          "IT",
          "JM",
          "JO",
          "JP",
          "KE",
          "KH",
          "KR",
          "KW",
          "LC",
          "LI",
          "LK",
          "LT",
          "LU",
          "LV",
          "MA",
          "MD",
          "MG",
          "MK",
          "MN",
          "MO",
          "MT",
          "MU",
          "MX",
          "MY",
          "NA",
          "NG",
          "NL",
          "NO",
          "NZ",
          "OM",
          "PA",
          "PE",
          "PH",
          "PL",
          "PT",
          "PY",
          "QA",
          "RO",
          "RS",
          "RW",
          "SA",
          "SE",
          "SG",
          "SI",
          "SK",
          "SN",
          "SV",
          "TH",
          "TN",
          "TR",
          "TT",
          "TZ",
          "UY",
          "UZ",
          "VN",
          "ZA",
          "BD",
          "BJ",
          "MC",
          "NE",
          "SM",
          "AZ",
          "BN",
          "BT",
          "AO",
          "DZ",
          "TW",
          "BS",
          "BW",
          "GA",
          "LA",
          "MZ",
        ],
      },
      shipping_options: [
        { shipping_rate: "shr_1N1HF5K9GNzBJvolaqFlPJ0H" },
        { shipping_rate: "shr_1N1HGJK9GNzBJvol0uXFKlnp" },
      ],
      line_items: cart.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.product.title,
              images: [item.product.images[0]],
            },
            unit_amount: item.product.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${headersList.get(
        "origin"
      )}/success?checkoutSession={CHECKOUT_SESSION_ID}`,
      cancel_url: `${headersList.get("origin")}/`,
    });
    const totalPrice = calcularSubtotal(cart);
    const [order, cartDeleted] = await Promise.all([
      prisma.order.create({
        data: {
          id: checkoutSession.id,
          userId: session.user.id,
          description: "",
          products: {
            createMany: {
              data: cart.map((product) => ({
                productSlug: product.productSlug,
                quantity: product.quantity,
                size: product.size,
              })),
            },
          },
          totalPrice,
          status: orderStatuses.Pending,
        },
      }),
      prisma.cart.delete({
        where: { userId: session.user.id },
      }),
      ...cart.map(async (e) => {
        await prisma.product.update({
          where: {
            slug: e.productSlug,
          },
          data: {
            inStock: {
              decrement: e.quantity,
            },
          },
        });
      }),
    ]);

    return Response.json(
      { checkoutSession, order, cartDeleted },
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
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id") as string;
    const transaction = await stripe.checkout.sessions.retrieve(id);
    return Response.json(transaction, { status: 200 });
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
