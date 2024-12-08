"use client";

import { fetchPropertyRating } from "@/utils/actions";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
function PropertyRating({
  propertyId,
  inPage,
}: {
  propertyId: string;
  inPage: boolean;
}) {
  const [count, setCount] = useState<number>(0);
  const [rating, setRating] = useState<string | number>(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateRating = async (propertyId: string) => {
      setLoading(true);
      const ratingsObj = await fetchPropertyRating(propertyId);
      setRating(ratingsObj.rating);
      setCount(ratingsObj.count);
      setLoading(false);
    };
    updateRating(propertyId);
  }, []);
  if (loading) {
    return <Skeleton className="size-6" />;
  }
  if (!loading && count === 0) {
    return <span className="block text-sm font-light">No Reviews</span>;
  }
  const countText = count === 1 ? " review" : " reviews";
  const countValue = `${count}${inPage ? countText : ""}`;

  return (
    <div className="flex gap-1 items-center">
      <Star className="size-4 text-[#FFD700] fill-[#FFD700]" />
      <span className="block text-sm text-main">
        {rating} ({countValue})
      </span>
    </div>
  );
}

export default PropertyRating;
