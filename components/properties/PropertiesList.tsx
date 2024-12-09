import { Property } from "@prisma/client";
import CardCarousel from "./CardCarousel";
import { LocationObj } from "@/utils/types";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";
import PropertyRating from "../reviews/PropertyRating";

function PropertiesList({ properties }: { properties: Property[] }) {
  return (
    <div className="grid grid-cols-1 w-full gap-y-8 pr-3 py-3 max-h-[800px] overflow-y-auto scrollbar-thumb-primary scrollbar-track-muted scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-thin">
      {properties.map((property: Property) => {
        const { id, name, category, sleeps, bedrooms, bathrooms, price } =
          property;
        const locationObj = property.location as LocationObj;
        const imagesArr = property.images as string[];
        return (
          <article
            key={id}
            className="rounded-2xl border cursor-pointer flex gap-2 flex-col md:flex-row bg-card shadow-muted  hover:shadow-xl duration-300 group"
          >
            <CardCarousel
              propertyName={name}
              imagesArr={imagesArr}
              propertyId={id}
              layout="List"
            />

            <Link
              href={`/properties/${id}`}
              className="flex-grow flex p-2.5 gap-6  flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-sm capitalize">
                  {locationObj.city}, {locationObj.state}
                </span>
                <h3 className="font-bold text-ellipsis  text-nowrap overflow-hidden text-xl group-hover:underline capitalize">
                  {name}
                </h3>
                <div className="flex gap-2 flex-wrap items-center">
                  <span className=" font-light text-sm capitalize">
                    {category}
                  </span>
                  <Separator
                    className="bg-foreground size-[2px] rounded-full"
                    orientation="vertical"
                  />
                  <span className=" font-light text-sm capitalize">
                    sleeps {sleeps}
                  </span>
                  <Separator
                    className="bg-foreground size-[2px] rounded-full"
                    orientation="vertical"
                  />
                  <span className=" font-light text-sm capitalize">
                    {bedrooms} bedroom{bedrooms > 1 ? "s" : ""}
                  </span>
                  <Separator
                    className="bg-foreground size-[2px] rounded-full"
                    orientation="vertical"
                  />
                  <span className=" font-light text-sm capitalize">
                    {bathrooms} bathroom{bathrooms > 1 ? "s" : ""}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <PropertyRating inPage={false} propertyId={id} />
                <div className="space-y-1.5">
                  <span className="text-xl font-bold block">
                    {formatCurrency(price)}
                  </span>
                  <span className="text-xs font-light">avg per night</span>
                </div>
              </div>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
export default PropertiesList;
