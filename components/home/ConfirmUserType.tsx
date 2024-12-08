"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { createUserProfile } from "@/utils/actions";
import { UserType } from "@/utils/types";
import { profileExists } from "@/utils/actions";
import { useUser } from "@clerk/nextjs";

function ConfirmUserType() {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { user } = useUser();

  const onClickBox = async (userType: UserType) => {
    setIsLoading(true);
    await createUserProfile(userType);
    setShowModal(false);
  };

  useEffect(() => {
    const profileChecker = async (userId: string) => {
      const userInDb = await profileExists(userId);
      setShowModal(!userInDb);
    };

    if (user) {
      profileChecker(user.id);
    }
  }, [user]);

  return (
    <Dialog modal open={showModal}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-semibold text-primary">
            🎉 Welcome {user?.firstName || ""}
          </DialogTitle>
          <DialogDescription className="text-sm">
            Please confirm if you are a Property Owner or a Renter ("Guest").
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          {isLoading ? (
            <Button disabled={isLoading} className="w-full">
              <ReloadIcon className="size-6  animate-spin" />
            </Button>
          ) : (
            <>
              <Button
                onClick={() => onClickBox(UserType.OWNER)}
                disabled={isLoading}
              >
                I'm a Property Owner
              </Button>

              <Button
                onClick={() => onClickBox(UserType.RENTER)}
                disabled={isLoading}
              >
                I'm a Renter
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
export default ConfirmUserType;
