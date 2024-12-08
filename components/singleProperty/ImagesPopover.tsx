import Image from "next/image";

import { Gallery, Item } from "react-photoswipe-gallery";

function ImagesPopover({
  images,
  propertyName,
}: {
  images: string[];
  propertyName: string;
}) {
  return (
    <Gallery withCaption>
      <div className="h-full px-2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto  scrollbar-thumb-main scrollbar-track-transparent scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-thin">
        {images.map((image, index) => (
          <figure key={index}>
            <Item
              original={image}
              thumbnail={image}
              caption={propertyName}
              width={1000}
              height={600}
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={image}
                  priority
                  alt={propertyName}
                  quality={90}
                  width={1800}
                  height={400}
                  className="object-cover h-[250px] md:h-[215px] w-full cursor-pointer"
                />
              )}
            </Item>
          </figure>
        ))}
      </div>
    </Gallery>
  );
}
export default ImagesPopover;
