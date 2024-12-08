import Image from "next/image";
import { BadgeCheck } from "lucide-react";

import ContactHost from "../form/ContactHost";
import { currentUser } from "@clerk/nextjs/server";

import { SignUpButton } from "../form/Buttons";
import { Profile } from "@prisma/client";

async function Host({
  owner,
  propertyId,
}: {
  owner: Profile;
  propertyId: string;
}) {
  const user = await currentUser();
  const showContactHost = user && user.id !== owner.clerkId;

  return (
    <>
      <h2 className="font-bold text-main text-3xl mb-5 capitalize">
        About the host("Owner")
      </h2>
      <article className="grid grid-cols-[auto,1fr] items-center gap-4 mt-4 mb-6">
        <Image
          src={owner.imageUrl}
          alt={owner.firstName}
          width={65}
          height={65}
          priority
          placeholder="empty"
          className="rounded w-16 h-16 object-cover"
        />
        <div className="space-y-1">
          <p>
            Hosted by{" "}
            <span className="font-bold capitalize">
              {" "}
              {owner.firstName} {owner.lastName}
            </span>
          </p>
          <p className="text-main text-[10px] w-[105px] flex gap-1 items-center px-2 py-1.5 rounded-2xl bg-primary/20 border border-primary font-medium">
            <BadgeCheck className="size-4 text-primary" />
            <span>Verified Host</span>
          </p>
        </div>
      </article>

      {!user && <SignUpButton text="Contact Host" />}
      {showContactHost && (
        <ContactHost propertyId={propertyId} ownerId={owner.clerkId} />
      )}
    </>
  );
}
export default Host;
