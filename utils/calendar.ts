import { DateRange } from "react-day-picker";
import { Booking, DueDateObj } from "@/utils/types";

export const defaultSelected: DateRange = {
  from: undefined,
  to: undefined,
};

export const generateBlockedPeriods = ({
  bookings,
  today,
}: {
  bookings: Booking[];
  today: Date;
}) => {
  today.setHours(0, 0, 0, 0); // Set the time to 00:00:00.000

  const disabledDays: DateRange[] = [
    ...bookings.map((booking) => ({
      from: booking.checkIn,
      to: booking.checkOut,
    })),
    {
      from: new Date(0), // This is 01 January 1970 00:00:00 UTC.
      to: today, // This is yesterday.
    },
  ];
  return disabledDays;
};

export const generateDateRange = (range: DateRange | undefined): string[] => {
  if (!range || !range.from || !range.to) return [];

  const currentDate = new Date(range.from);
  const endDate = new Date(range.to);
  const dateRange: string[] = [];

  while (currentDate <= endDate) {
    const dateString = currentDate.toISOString().split("T")[0];
    dateRange.push(dateString);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateRange;
};

export const generateDisabledDates = (
  disabledDays: DateRange[]
): { [key: string]: boolean } => {
  if (disabledDays.length === 0) return {};

  const disabledDates: { [key: string]: boolean } = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0); // set time to 00:00:00 to compare only the date part

  disabledDays.forEach((range) => {
    if (!range.from || !range.to) return;

    const currentDate = new Date(range.from);
    const endDate = new Date(range.to);

    while (currentDate <= endDate) {
      if (currentDate < today) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
      }
      const dateString = currentDate.toISOString().split("T")[0];
      disabledDates[dateString] = true;
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });

  return disabledDates;
};

export function calculateDaysBetween({
  checkIn,
  checkOut,
}: {
  checkIn: Date;
  checkOut: Date;
}) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Calculate days until check-in
  const daysUntilCheckIn = Math.floor(
    (checkIn.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Determine dueDate based on the condition
  const dueDate =
    daysUntilCheckIn >= 60
      ? subtractDays(checkIn, 30) // 30 days before check-in
      : today; // Immediate due date

  // Calculate the difference in milliseconds
  const diffInMs = Math.abs(checkOut.getTime() - checkIn.getTime());

  // Convert the difference in milliseconds to days
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  // Helper function to compare dates (ignoring time)
  const areDatesEqual = (date1: Date, date2: Date): boolean =>
    date1.toISOString().split("T")[0] === date2.toISOString().split("T")[0];

  const dueDateObj: DueDateObj = {
    dueDate,
    isDueDateToday: areDatesEqual(dueDate, today),
  };

  return {
    totalNights: diffInDays,
    dueDateObj,
  };
}

const subtractDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  result.setHours(0, 0, 0, 0); // Normalize the result to midnight
  return result;
};
