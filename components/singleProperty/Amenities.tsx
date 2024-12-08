import { FolderCheck } from "lucide-react";
import { Property } from "@prisma/client";
import { Amenity } from "@/utils/options";

function Amenities({ property }: { property: Property }) {
  const { beds, bathrooms } = property;
  const amenities = (property.amenities as Amenity[]).filter(
    (amenity) => amenity.selected
  );

  return (
    <>
      <h2 className="font-bold text-main text-3xl mb-5">Amenities</h2>
      <h3 className="font-semibold text-main text-2xl mb-3">Rooms & Beds</h3>
      <div className="flex flex-col gap-2 mb-5 ">
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-1.5">
          <span className="text-main block font-semibold  text-base">
            Beds:{" "}
          </span>

          <span className="text-main block capitalize text-sm">
            {beds} {beds > 1 ? "beds" : "bed"}
          </span>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:items-center  gap-1.5">
          <span className="text-main block font-semibold  text-base">
            Baths:{" "}
          </span>
          <span className="text-main capitalize block text-sm">
            {bathrooms} bathroom{bathrooms > 1 ? "s" : ""} {""}(Toilet & Shower)
          </span>
        </div>
      </div>

      <h3 className="font-semibold text-main text-2xl mb-3">Features</h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 justify-between">
        {amenities.map((amenity) => (
          <li key={amenity.name} className="flex items-center gap-3">
            <FolderCheck className="size-6 text-primary" />
            <span className="text-sm text-main">{amenity.name}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
export default Amenities;
