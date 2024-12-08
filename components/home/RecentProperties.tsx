import CardCarousel from "@/components/properties/CardCarousel";
import { LocationObj } from "@/utils/types";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";
import PropertyRating from "../reviews/PropertyRating";
import { fetchRecentProperties } from "@/utils/actions";
import { Button } from "../ui/button";

async function RecentProperties() {
  const properties = await fetchRecentProperties();
  return (
    <section className="my-8 w-full p-6">
      <h2 className="text-3xl text-center mb-1 font-semibold">
        Recent Properties
      </h2>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 py-3 mb-2">
        {properties.map((property) => {
          const { id, name, category, sleeps, bedrooms, bathrooms, price } =
            property;
          const locationObj = property.location as LocationObj;
          const imagesArr = property.images as string[];
          return (
            <article
              key={id}
              className="rounded-2xl border relative cursor-pointer flex gap-2 flex-col bg-card  duration-300 group shadow-muted  hover:shadow-2xl"
            >
              <CardCarousel
                propertyName={name}
                imagesArr={imagesArr}
                propertyId={id}
                layout="Grid"
              />

              <Link
                href={`/properties/${id}`}
                className="flex-grow flex p-2.5 pt-0 gap-3 flex-col justify-between"
              >
                <div className="space-y-2">
                  <h3 className="font-semibold text-ellipsis text-nowrap overflow-hidden text-base group-hover:underline capitalize">
                    {name}
                  </h3>
                  <span className="text-sm capitalize">
                    {locationObj.city}, {locationObj.state}
                  </span>
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
                  <PropertyRating inPage={false} propertyId={id} />
                </div>

                <div className="flex justify-end items-center">
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

      <div className="flex items-center justify-center w-full">
        <Button
          className="max-w-[400px] w-full capitalize text-lg py-6"
          asChild
        >
          <Link href={"/properties"}>View All Properties</Link>
        </Button>
      </div>
    </section>
  );
}
export default RecentProperties;
