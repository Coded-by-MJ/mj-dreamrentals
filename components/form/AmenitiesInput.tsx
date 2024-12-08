"use client";
import { useState } from "react";
import { amenities, Amenity } from "@/utils/options";
import { Checkbox } from "@/components/ui/checkbox";

function AmenitiesInput({ defaultValue }: { defaultValue?: Amenity[] }) {
  const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(() => {
    // Map through amenities and merge default values
    return amenities.map((amenity) => ({
      ...amenity,
      selected:
        defaultValue?.some((def) => def.name === amenity.name) ||
        amenity.selected,
    }));
  });
  const handleChange = (amenity: Amenity) => {
    setSelectedAmenities((prev) => {
      return prev.map((a) => {
        if (a.name === amenity.name) {
          return { ...a, selected: !a.selected };
        }
        return a;
      });
    });
  };

  return (
    <section>
      <input
        type="hidden"
        name="amenities"
        value={JSON.stringify(
          selectedAmenities.filter((amenity) => amenity.selected)
        )}
      />
      <div className="grid grid-cols-2 gap-4">
        {selectedAmenities.map((amenity) => {
          return (
            <label
              htmlFor={amenity.name}
              key={amenity.name}
              className="flex items-center cursor-pointer space-x-2"
            >
              <Checkbox
                id={amenity.name}
                checked={amenity.selected}
                onCheckedChange={() => handleChange(amenity)}
              />
              <span className="text-sm font-medium leading-none capitalize flex gap-x-2 items-center">
                {amenity.name}
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
export default AmenitiesInput;
