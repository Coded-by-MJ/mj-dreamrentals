"use client";

import { SignOutButton } from "@clerk/nextjs";
import { toast } from "@/hooks/use-toast";

function SignOutLink() {
  const handleLogout = () => {
    toast({ description: "You have been signed out." });
  };

  return (
    <SignOutButton redirectUrl="/">
      <button
        className="w-full text-left hover:text-primary transition-colors"
        onClick={handleLogout}
      >
        Logout
      </button>
    </SignOutButton>
  );
}
export default SignOutLink;
