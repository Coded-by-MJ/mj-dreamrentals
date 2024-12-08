import { calculateDaysBetween } from "@/utils/calendar";

type BookingDetails = {
  checkIn: Date;
  checkOut: Date;
  price: number;
};

export const calculateTotals = ({
  checkIn,
  checkOut,
  price,
}: BookingDetails) => {
  const { totalNights } = calculateDaysBetween({
    checkIn,
    checkOut,
  });
  const cleaning = 200;
  const discountRate = totalNights >= 30 ? 0.1 : 0;
  const discountPrice = price * discountRate;

  const subTotal = totalNights * price;
  const discountTotal = totalNights * discountPrice;
  const taxableAmount = subTotal + cleaning - discountTotal;
  const tax = Math.floor(taxableAmount * 0.12);
  const orderTotal = taxableAmount + tax;
  return {
    totalNights,
    discountTotal,
    cleaning,
    tax,
    subTotal,
    orderTotal,
    discountPrice,
  };
};
