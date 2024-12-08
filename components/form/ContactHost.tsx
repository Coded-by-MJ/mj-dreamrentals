"use client";
import { useState } from "react";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import { Card } from "@/components/ui/card";
import TextAreaInput from "@/components/form/TextAreaInput";
import { Button } from "@/components/ui/button";
import { createMessageAction } from "@/utils/actions";
import FormInput from "./FormInput";
import { useUser } from "@clerk/nextjs";
function ContactHost({
  propertyId,
  ownerId,
}: {
  propertyId: string;
  ownerId: string;
}) {
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const { user } = useUser();
  return (
    <div className="mt-8">
      <Button onClick={() => setIsReviewFormVisible((prev) => !prev)}>
        Contact Host
      </Button>
      {isReviewFormVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createMessageAction} className="">
            <input type="hidden" name="propertyId" value={propertyId} />
            <input type="hidden" name="recipientId" value={ownerId} />
            <FormInput
              type="email"
              name="email"
              label="email address"
              placeholder="your email address"
              defaultValue={user?.emailAddresses[0].emailAddress || ""}
            />
            <FormInput
              type="tel"
              name="phone"
              label="phone number"
              placeholder="your phone number"
            />
            <TextAreaInput
              name="body"
              labelText="message"
              defaultValue="Amazing place !!!"
            />
            <SubmitButton text="Submit" className="mt-4" optionText="" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
}

export default ContactHost;
