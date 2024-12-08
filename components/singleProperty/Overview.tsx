import { BedSingle, Bath, Users, Ruler } from "lucide-react";
import { Property } from "@prisma/client";
import PropertyRatingTrigger from "./PropertyRatingTrigger";

function Overview({ property }: { property: Property }) {
  const {
    squareFeet,
    bathrooms,
    bedrooms,
    category,
    sleeps,
    name,
    description,
  } = property;

  return (
    <>
      <span className="text-main text-sm mb-1 capitalize">{category}</span>
      <h2 className="font-bold capitalize text-primary text-3xl">{name}</h2>

      <PropertyRatingTrigger propertyId={property.id} />

      <div className="flex my-5 flex-row flex-wrap gap-x-10 gap-y-2 justify-start items-center">
        <div className="flex items-center gap-1.5">
          <BedSingle className="size-5 text-main" />
          <span className="text-main block text-sm">
            {bedrooms} bedroom{bedrooms > 1 ? "s" : ""}
          </span>
        </div>

        <div className=" flex items-center gap-1.5">
          <Bath className="size-5 text-main" />
          <span className="text-main block text-nowrap  text-sm">
            {bathrooms} bathroom{bathrooms > 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <Users className="size-5 text-main" />
          <span className="text-main block  text-sm">Sleeps {sleeps}</span>
        </div>

        {squareFeet > 1 && (
          <div className=" flex items-center gap-1.5">
            <Ruler className="size-5 text-main" />
            <span className="text-main block  text-sm">{squareFeet} sq ft</span>
          </div>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-main text-2xl mb-3">
          About this property
        </h3>
        <p className="text-main text-sm whitespace-pre-line py-1 pr-3 max-h-[400px] overflow-y-auto scrollbar-thumb-primary scrollbar-track-muted scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-thin">
          {description}
        </p>
      </div>
    </>
  );
}
export default Overview;
