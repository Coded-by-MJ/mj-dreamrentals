import { SignUp } from "@clerk/nextjs";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Dream Rentals",
};

function SignUpPage() {
  return (
    <section className="container pt-6 flex items-center justify-center">
      <SignUp />
    </section>
  );
}
export default SignUpPage;
