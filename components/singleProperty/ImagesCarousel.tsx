import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Image from "next/image";
import placeHolderImage from "@/assets/images/blurhouse.jpg";

function ImagesCarousel({
  toggleDialogImages,
  children,
  propertyName,
}: {
  toggleDialogImages: string[];
  propertyName: string;
  children: React.ReactNode;
}) {
  return (
    <div className="sm:hidden w-full relative">
      <Carousel>
        <CarouselContent className="m-0">
          {toggleDialogImages.map((image, index) => {
            return (
              <CarouselItem key={index} className="pl-0">
                <figure className="h-[400px] block w-full relative">
                  <Image
                    alt={propertyName}
                    src={image}
                    placeholder="blur"
                    fill
                    sizes="90vw"
                    quality={90}
                    blurDataURL={placeHolderImage.blurDataURL}
                    className="object-cover "
                  />
                </figure>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="text-white border-transparent z-50 bg-black/50 size-8  absolute left-2" />
        <CarouselNext className="text-white z-50 border-transparent bg-black/50 size-8 absolute right-2" />
      </Carousel>
      {children}
    </div>
  );
}
export default ImagesCarousel;
