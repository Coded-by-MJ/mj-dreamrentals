"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaExclamationCircle } from "react-icons/fa";
function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="container bg-transparent min-h-screen ">
      <div className="px-6 py-24 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <div className="flex justify-center">
          <FaExclamationCircle className=" text-8xl text-yellow-400"></FaExclamationCircle>
        </div>
        <div className="text-center">
          <h1 className="text-3xl text-main font-bold mt-4 mb-2">
            Something went wrong
          </h1>
          <p className="text-gray-500 text-xl mb-10">{error.toString()}</p>

          <div className="flex gap-4 items-center justify-center w-full">
            <Button
              variant={"outline"}
              className="font-bold py-4 px-6 rounded"
              onClick={() => reset()}
            >
              Try again
            </Button>
            <Link
              href="/"
              className="bg-primary hover:bg-primary/50 text-main font-bold py-4 px-6 rounded"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ErrorPage;
