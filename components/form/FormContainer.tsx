"use client";

import { useEffect, useActionState } from "react";
import { toast } from "@/hooks/use-toast";
import { actionFunction } from "@/utils/types";

const initialState = {
  message: "",
  variant: "default",
};

function FormContainer({
  action,
  children,
  className,
}: {
  action: actionFunction;
  children: React.ReactNode;
  className: string | undefined;
}) {
  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message) {
      const variant = state.variant as "destructive" | "default";
      toast({ description: state.message, variant });
    }
  }, [state]);

  return (
    <form action={formAction} className={className}>
      {children}
    </form>
  );
}

export default FormContainer;
