"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useCallback, Suspense } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { PageLoading } from "@/components/skeletons/Loadings";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

function CheckoutContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId");

  const fetchClientSecret = useCallback(async () => {
    const response = await axios.post("/api/payment", {
      bookingId: bookingId,
    });
    return response.data.clientSecret;
  }, []);

  const options = { fetchClientSecret };

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}

function CheckoutPage() {
  return (
    <div id="checkout">
      <Suspense fallback={<PageLoading />}>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}

export default CheckoutPage;
