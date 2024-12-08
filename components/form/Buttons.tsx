"use client";

import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { useFormStatus } from "react-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { SignInButton } from "@clerk/nextjs";
import { Square, SquareCheck, Trash2 } from "lucide-react";
import { LuTrash2, LuPenSquare } from "react-icons/lu";

type SubmitButtonProps = {
  text: string;
  className: string;
  optionText: string | undefined;
};
export function SubmitButton(props: SubmitButtonProps) {
  const { text, className, optionText } = props;
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className={className} disabled={pending}>
      {pending ? (
        <>
          <ReloadIcon className="size-6 text-white animate-spin" />
          {optionText && <span>{optionText}</span>}
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export const FavoriteSubmitButton = ({
  isFavorite,
}: {
  isFavorite: boolean;
}) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      size={"icon"}
      variant="outline"
      className="p-2 cursor-pointer bg-muted"
      disabled={pending}
    >
      {pending ? (
        <>
          <ReloadIcon className="animate-spin" />
        </>
      ) : isFavorite ? (
        <>
          <FaHeart className="text-main" />
        </>
      ) : (
        <>
          <FaRegHeart />
        </>
      )}
    </Button>
  );
};

export const CardSignInButton = () => {
  return (
    <SignInButton mode="modal">
      <Button
        type="button"
        size={"icon"}
        variant="outline"
        className="p-2 cursor-pointer"
      >
        <FaRegHeart />
      </Button>
    </SignInButton>
  );
};
export const SignUpButton = ({ text }: { text: string }) => {
  return (
    <SignInButton mode="modal">
      <Button type="button" className="p-2 cursor-pointer">
        {text}
      </Button>
    </SignInButton>
  );
};

export const CheckButton = ({ status }: { status: boolean }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    if (status) {
      return <SquareCheck className="text-primary" />;
    } else {
      return <Square className="text-muted-foreground" />;
    }
  };

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-1 size-[26px] cursor-pointer"
      disabled={pending}
    >
      {pending ? <ReloadIcon className="animate-spin" /> : renderIcon()}
    </Button>
  );
};

export const DeleteButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-1 size-[26px] cursor-pointer"
      disabled={pending}
    >
      {pending ? (
        <ReloadIcon className=" animate-spin" />
      ) : (
        <Trash2 className="text-red-500" />
      )}
    </Button>
  );
};

type actionType = "edit" | "delete";
export const IconButton = ({ actionType }: { actionType: actionType }) => {
  const { pending } = useFormStatus();

  const renderIcon = () => {
    switch (actionType) {
      case "edit":
        return <LuPenSquare />;
      case "delete":
        return <LuTrash2 />;
      default:
        const never: never = actionType;
        throw new Error(`Invalid action type: ${never}`);
    }
  };

  return (
    <Button
      type="submit"
      size="icon"
      variant="link"
      className="p-2 cursor-pointer"
    >
      {pending ? <ReloadIcon className=" animate-spin" /> : renderIcon()}
    </Button>
  );
};
