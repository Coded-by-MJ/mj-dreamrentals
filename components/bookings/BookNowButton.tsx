"use client";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useProperty } from "@/utils/store";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import { createBookingAction } from "@/utils/actions";

function BookNowButton() {
  const { userId } = useAuth();
  const { propertyId, range, allGuests } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;
  if (!userId)
    return (
      <section className="flex items-center justify-center px-4">
        <SignInButton mode="modal">
          <Button type="button" className="w-full">
            Sign In to Complete Booking
          </Button>
        </SignInButton>
      </section>
    );

  const createBooking = createBookingAction.bind(null, {
    propertyId,
    checkIn,
    checkOut,
    allGuests,
  });
  return (
    <section className="flex items-center justify-center px-4">
      <FormContainer action={createBooking} className="w-full">
        <SubmitButton
          text="Book Now"
          className="w-full"
          optionText="Please wait..."
        />
      </FormContainer>
    </section>
  );
}
export default BookNowButton;
