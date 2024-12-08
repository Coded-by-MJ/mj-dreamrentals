import { SignIn } from "@clerk/nextjs";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Dream Rentals",
};

function SignInPage() {
  return (
    <section className="container pt-6 flex items-center justify-center">
      <SignIn />
    </section>
  );
}
export default SignInPage;
