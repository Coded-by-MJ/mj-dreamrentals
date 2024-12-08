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

// import { SpeedInsights } from "@vercel/speed-insights/next";
// import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dream Rentals",
  description: "Generated by create next app",
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
