import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Link from "next/link";
import Image from "next/image";
import placeHolderImage from "@/assets/images/blurhouse.jpg";
import { cn } from "@/lib/utils";
import FavoriteToggleButton from "../singleProperty/FavoriteToggleButton";

function CardCarousel({
  imagesArr,
  propertyId,
  propertyName,
  layout,
}: {
  imagesArr: string[];
  propertyId: string;
  propertyName: string;
  layout: "List" | "Grid";
}) {
  return (
    <Carousel
      className={cn(
        "relative flex-shrink-0",
        layout === "List"
          ? "h-[250px] md:h-[220px] md:w-[320px] w-full "
          : "h-[200px] w-full"
      )}
    >
      <CarouselContent className="m-0">
        {imagesArr.map((image, index) => {
          return (
            <CarouselItem key={index} className="pl-0">
              <Link href={`/properties/${propertyId}`} className="block">
                <Image
                  alt={propertyName}
                  src={image}
                  placeholder="blur"
                  priority
                  width={320}
                  height={250}
                  quality={90}
                  blurDataURL={placeHolderImage.blurDataURL}
                  className={cn(
                    "object-cover w-full",
                    layout === "List"
                      ? "rounded-t-2xl md:rounded-l-2xl md:rounded-r-none h-[250px] md:h-[220px]"
                      : "rounded-t-2xl h-[200px]"
                  )}
                />
              </Link>
            </CarouselItem>
          );
        })}
      </CarouselContent>

      <div className="absolute top-3 right-3 z-10">
        <FavoriteToggleButton propertyId={propertyId} />
      </div>
      <CarouselPrevious className=" text-white border-transparent bg-black/50 size-8  absolute left-2" />
      <CarouselNext className=" text-white border-transparent bg-black/50 size-8 absolute right-2" />
    </Carousel>
  );
}
export default CardCarousel;
