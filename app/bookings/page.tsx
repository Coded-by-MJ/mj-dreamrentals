import EmptyList from "@/components/home/EmptyList";
import Link from "next/link";
import { format } from "date-fns";
import { formatCurrencyWithSuffix } from "@/utils/format";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";
import { fetchBookings } from "@/utils/actions";
import { deleteBookingAction } from "@/utils/actions";
import Title from "@/components/properties/Title";
async function BookingsPage() {
  const bookings = await fetchBookings();
  if (bookings.length === 0) {
    return <EmptyList heading="You haven't booked any property yet." />;
  }

  return (
    <>
      <Title text="Your Bookings" />
      <div className="mt-4">
        <h4 className="mb-4 capitalize">total bookings : {bookings.length}</h4>
        <Table>
          <TableCaption>A list of your recent bookings.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Number of Guests</TableHead>
              <TableHead>Nights</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => {
              const { id, orderTotal, totalNights, checkIn, checkOut, guests } =
                booking;
              const { id: propertyId, name } = booking.property;
              const startDate = format(checkIn, "LLL dd, yy");
              const endDate = format(checkOut, "LLL dd, yy");
              return (
                <TableRow key={id}>
                  <TableCell>
                    <Link
                      href={`/properties/${propertyId}`}
                      className="underline text-muted-foreground tracking-wide"
                    >
                      {name}
                    </Link>
                  </TableCell>
                  <TableCell>{guests}</TableCell>
                  <TableCell>{totalNights}</TableCell>
                  <TableCell>{formatCurrencyWithSuffix(orderTotal)}</TableCell>
                  <TableCell>{startDate}</TableCell>
                  <TableCell>{endDate}</TableCell>
                  <TableCell>
                    <DeleteBooking bookingId={id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function DeleteBooking({ bookingId }: { bookingId: string }) {
  const deleteBooking = deleteBookingAction.bind(null, { bookingId });
  return (
    <FormContainer action={deleteBooking} className="">
      <IconButton actionType="delete" />
    </FormContainer>
  );
}

export default BookingsPage;
