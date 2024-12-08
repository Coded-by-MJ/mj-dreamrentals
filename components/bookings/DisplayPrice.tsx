import { calculateTotals } from "@/utils/calculateTotals";
import { formatCurrency } from "@/utils/format";
import { useProperty } from "@/utils/store";
import { useEffect, useState } from "react";

function DisplayPrice({ price }: { price: number }) {
  const { range } = useProperty((state) => state);

  const [discount, setDiscount] = useState(0);
  const [monthlyDiscount, setMonthlyDiscount] = useState(0);

  useEffect(() => {
    if (
      !range ||
      !(range?.from instanceof Date) ||
      !(range?.to instanceof Date)
    ) {
      setDiscount(0);
    } else if (range.to.getTime() === range.from.getTime()) {
      setDiscount(0);
    } else {
      const checkIn = range?.from as Date;
      const checkOut = range?.to as Date;
      const { discountPrice, discountTotal } = calculateTotals({
        checkIn,
        checkOut,
        price,
      });
      setDiscount(discountPrice);
      setMonthlyDiscount(discountTotal);
    }
  }, [range]);

  return (
    <div className="flex gap-1 flex-col mb-4 items-start border-b pb-3">
      {discount > 0 ? (
        <>
          <span className="inline-flex items-center font-semibold self-end rounded-md p-2 bg-primary/10 text-primary text-xs">
            Monthly discount: {formatCurrency(monthlyDiscount)}
          </span>
          <span className="line-through text-base">
            {formatCurrency(price)}
          </span>
          <span className="text-main text-2xl font-semibold">
            {formatCurrency(price - discount)}
          </span>
        </>
      ) : (
        <span className="text-main text-2xl font-semibold">
          {formatCurrency(price)}
        </span>
      )}
      <span className="inline text-sm font-normal text-main">
        avg per night
      </span>
    </div>
  );
}
export default DisplayPrice;
