import type { Metadata } from "next";

import { Inter } from "next/font/google";
import "./globals.css";

import Providers from "./providers";

import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";

import "leaflet/dist/leaflet.css";
import "photoswipe/dist/photoswipe.css";

import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import ConfirmUserType from "@/components/home/ConfirmUserType";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dream Rentals",
  description:
    "Discover your perfect Florida getaway! Book vacation rentals with ease, enjoy no booking fees, and choose from stunning beachfront homes, family-friendly stays, and more. Start your stress-free vacation planning today!",
  keywords:
    "Rentals, beachfront homes, Properties, family-friendly stays, no booking fees",
  openGraph: {
    title: "Dream Rentals - Book Your Dream Vacation Home",
    description:
      "Discover your perfect getaway with Dream Rentals! Book unique vacation homes and rentals directly with property owners. Enjoy no booking fees, transparent pricing, and a seamless vacation planning experience.",
    url: "https://mj-dreamrentals.vercel.app/",
    siteName: "Dream Rentals",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/deb3eaf8-9213-4c4e-af0e-8de80aa42510.png?token=DHLPBicb7XKezsWQZC6hTHwfLjWNf5ges4fBvyFEhHU&height=1067&width=1200&expires=33269743467", // URL to a preview image
        width: 1200,
        height: 642,
        alt: "Dream Rentals",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dream Rentals - Book Your Dream Vacation Home",
    description:
      "Discover your perfect getaway with Dream Rentals! Book unique vacation homes and rentals directly with property owners. Enjoy no booking fees, transparent pricing, and a seamless vacation planning experience.",
    images: [
      "https://opengraph.b-cdn.net/production/images/deb3eaf8-9213-4c4e-af0e-8de80aa42510.png?token=DHLPBicb7XKezsWQZC6hTHwfLjWNf5ges4fBvyFEhHU&height=1067&width=1200&expires=33269743467",
    ], // URL to a preview image optimized for Twitter
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={"/"}>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <Providers>
            <Navbar />
            <main className="py-6 min-h-screen container">{children}</main>
            <Footer />
            <ConfirmUserType />
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
