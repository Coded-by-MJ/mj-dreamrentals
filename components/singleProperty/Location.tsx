import { LocationObj } from "@/utils/types";
import SinglePropertyMap from "./SinglePropertyMap";
import { findCountryByCode } from "@/utils/countries";

function Location({ locationObj }: { locationObj: LocationObj }) {
  const countryData = findCountryByCode(locationObj.country);

  const mapDataAvailable = countryData && countryData.location;

  return (
    <>
      <h2 className="font-bold text-main text-3xl mb-5">Location</h2>

      <div className="w-full h-[400px]">
        <div className="w-full bg-muted p-2 ">
          <p className="text-main capitalize">
            {locationObj.address}, {locationObj.city}, {locationObj.state},{" "}
            {locationObj.country}
          </p>
        </div>
        {mapDataAvailable ? (
          <SinglePropertyMap coords={countryData.location} />
        ) : (
          <p className="mt-4 text-base text-primary font-semibold">
            No map data available for this property
          </p>
        )}
      </div>
    </>
  );
}
export default Location;
