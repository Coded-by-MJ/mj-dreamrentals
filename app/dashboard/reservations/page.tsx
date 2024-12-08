import { fetchReservations } from "@/utils/actions";
import Link from "next/link";
import EmptyList from "@/components/home/EmptyList";

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
import ReservationsStats from "@/components/dashboard/ReservationsStats";
import { format } from "date-fns";
async function ReservationsPage() {
  const reservations = await fetchReservations();
  if (reservations.length === 0)
    return (
      <EmptyList
        heading="There has been no reservations on any of your rentals"
        message="Try creating more rentals"
        btnText="Create Rentals"
        link="/dashboard/rentals/create"
      />
    );

  return (
    <>
      <ReservationsStats />
      <div className="mt-16">
        <h4 className="mb-4 capitalize">
          total reservations : {reservations.length}
        </h4>
        <Table>
          <TableCaption>A list of recent reservations</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Property Name</TableHead>
              <TableHead>Number of Guests</TableHead>
              <TableHead>Nights</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Check In</TableHead>
              <TableHead>Check Out</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reservations.map((item) => {
              const { id, orderTotal, totalNights, checkIn, checkOut, guests } =
                item;
              const { id: propertyId, name } = item.property;

              const startDate = format(checkIn, "LLL dd, yyyy");
              const endDate = format(checkOut, "LLL dd, yyyy");
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
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
export default ReservationsPage;
