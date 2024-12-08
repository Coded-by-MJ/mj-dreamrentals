import { fetchPropertyRating } from "@/utils/actions";
import { TabsList, TabsTrigger } from "../ui/tabs";
import { Star } from "lucide-react";

async function PropertyRatingTrigger({ propertyId }: { propertyId: string }) {
  const { rating, count } = await fetchPropertyRating(propertyId);
  if (count === 0) return null;
  return (
    <TabsList className="flex group cursor-pointer gap-1 h-auto px-0 mt-3 w-[138px] bg-transparent rounded-none justify-start items-center ">
      <Star className="size-4 text-[#FFD700] fill-[#FFD700]" />
      <TabsTrigger
        value="reviews"
        className="inline-block px-0 group-hover:underline text-base text-main"
      >
        {rating} ({`${count} ${count > 1 ? "reviews" : "review"}`})
      </TabsTrigger>
    </TabsList>
  );
}
export default PropertyRatingTrigger;
