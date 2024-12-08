import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
import { NextResponse, type NextRequest } from "next/server";
import db from "@/utils/db";
import { format } from "date-fns";

export const POST = async (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  const origin = requestHeaders.get("origin");
  const { bookingId } = await req.json();

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    include: {
      property: {
        select: {
          name: true,
          images: true,
        },
      },
      profile: {
        select: {
          email: true,
        },
      },
    },
  });
  if (!booking) {
    return Response.json(null, {
      status: 404,
      statusText: "Not Found",
    });
  }
  const {
    totalNights,
    checkIn,
    checkOut,
    orderTotal,
    property,
    profile: { email },
  } = booking;
  const images = property.images as string[];
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      customer_email: email,
      metadata: { bookingId: booking.id },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: `${property.name}`,
              images,
              description: `Stay in this wonderful place for ${totalNights} nights, from ${format(
                checkIn,
                "EEE LLL dd, yy"
              )} to ${format(checkOut, "EEE LLL dd, yy")}. Enjoy your stay!`,
            },
            unit_amount: orderTotal * 100,
          },
        },
      ],
      mode: "payment",
      return_url: `${origin}/api/confirm?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    return NextResponse.json(null, {
      status: 500,
      statusText: "Internal Server Error",
    });
  }
};
