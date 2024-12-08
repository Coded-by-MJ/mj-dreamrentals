"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import placeHolderImage from "@/assets/images/blurhouse.jpg";
import { cn } from "@/lib/utils";
import { Images as ImagesIcon } from "lucide-react";
import { useState } from "react";
import ImagesPopover from "./ImagesPopover";
import ImagesCarousel from "./ImagesCarousel";

function PropertyImages({
  images,
  propertyName,
}: {
  images: string[];
  propertyName: string;
}) {
  const [toggleDialogImages] = useState<Array<string>>(
    images?.slice(0, 5) || []
  );

  return (
    <Dialog modal>
      <DialogTrigger className="w-full mb-1" asChild>
        <div>
          <ImagesCarousel
            toggleDialogImages={images}
            propertyName={propertyName}
          >
            <div className="absolute flex gap-1 items-center justify-center  py-2 px-6 bottom-2.5 right-2.5 text-sm z-10 bg-black/60 rounded-3xl text-white">
              <span>{images.length}</span>
              <ImagesIcon className="size-4" />
            </div>
          </ImagesCarousel>
          <GridToggleButton
            toggleDialogImages={toggleDialogImages}
            numOfTotalImages={images.length}
            propertyName={propertyName}
          />
        </div>
      </DialogTrigger>
      <DialogContent
        className="max-w-[600px] px-0 pb-2 h-[500px] "
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader className="border-b h-[40px] block px-6 mb-2 pb-2">
          <DialogTitle className="font-bold text-main text-2xl">
            All Photos
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          all photos of property
        </DialogDescription>

        <ImagesPopover images={images} propertyName={propertyName} />
        <DialogFooter className="border-t h-[60px] items-center justify-end px-6  pt-2">
          <DialogClose
            asChild
            className="bg-primary text-white hover:bg-primary/50"
          >
            <Button type="button" variant="secondary">
              Return to property
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const GridToggleButton = ({
  toggleDialogImages,
  numOfTotalImages,
  propertyName,
}: {
  toggleDialogImages: string[];
  numOfTotalImages: number;
  propertyName: string;
}) => {
  return (
    <div className="w-full cursor-pointer relative hidden sm:grid sm:gap-0.5 sm:grid-cols-5 sm:grid-rows-2 h-[288px]">
      <div className="absolute flex gap-1 items-center justify-center  py-2 px-6 bottom-2.5 right-2.5 text-sm z-10 bg-black/60 rounded-3xl text-white">
        <span>{numOfTotalImages - toggleDialogImages.length}+</span>
        <ImagesIcon className="size-4" />
      </div>
      {toggleDialogImages.map((image, index) => {
        return (
          <figure
            className={cn(
              "relative",
              index === 0
                ? "row-span-2 col-span-3"
                : "col-span-2 lg:col-span-1",
              index > 2 && "max-lg:hidden"
            )}
            key={index}
          >
            <Image
              alt={propertyName}
              src={image}
              placeholder="blur"
              fill
              sizes="90vw"
              quality={100}
              blurDataURL={placeHolderImage.blurDataURL}
              className="object-cover !w-full"
            />
          </figure>
        );
      })}
    </div>
  );
};

export default PropertyImages;
