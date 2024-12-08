import { calculateTotals } from "@/utils/calculateTotals";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProperty } from "@/utils/store";
import { formatCurrency } from "@/utils/format";

function BookingSummary() {
  const { range, price } = useProperty((state) => state);
  const checkIn = range?.from as Date;
  const checkOut = range?.to as Date;

  const {
    totalNights,
    subTotal,
    cleaning,
    discountTotal,
    discountPrice,
    tax,
    orderTotal,
  } = calculateTotals({
    checkIn,
    checkOut,
    price,
  });

  return (
    <Card className="p-4 border-0 rounded-none my-4">
      <CardTitle className="mb-8">Summary </CardTitle>
      <FormRow
        label={`$${
          discountPrice > 0 ? price - discountPrice : price
        } x ${totalNights} nights`}
        amount={discountTotal > 0 ? subTotal - discountTotal : subTotal}
      />
      <FormRow label="Cleaning Fee" amount={cleaning} />
      <FormRow label="Tax" amount={tax} />
      <Separator className="mt-4" />
      <CardTitle className="mt-8">
        <FormRow label="Booking Total" amount={orderTotal} />
      </CardTitle>
      {discountTotal > 0 && (
        <p className="flex justify-between text-primary text-[15px] mb-2">
          <span>Monthly discount: {formatCurrency(discountTotal)}</span>
        </p>
      )}
    </Card>
  );
}

function FormRow({ label, amount }: { label: string; amount: number }) {
  return (
    <p className="flex justify-between text-[15px] mb-2">
      <span>{label}</span>
      <span>{formatCurrency(amount)}</span>
    </p>
  );
}

export default BookingSummary;
