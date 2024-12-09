import EmptyList from "@/components/home/EmptyList";
import { fetchFavorites } from "@/utils/actions";
import CardCarousel from "@/components/properties/CardCarousel";
import { LocationObj } from "@/utils/types";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { formatCurrency } from "@/utils/format";
import PropertyRating from "@/components/reviews/PropertyRating";
import React from "react";
import Title from "@/components/properties/Title";
async function FavoritesPage() {
  const favorites = await fetchFavorites();

  if (favorites.length === 0) {
    return <EmptyList heading="You don't have any favorites yet." />;
  }

  return (
    <>
      <Title text="Your Favorites" />

      <div className="grid grid-cols-1 gap-y-8 pr-3 mt-4 py-3 flex-grow max-h-[800px] overflow-y-auto scrollbar-thumb-primary scrollbar-track-muted scrollbar-thumb-rounded-md scrollbar-track-rounded-md scrollbar-thin">
        {favorites.map((property) => {
          const { id, name, category, sleeps, bedrooms, bathrooms, price } =
            property;
          const locationObj = property.location as LocationObj;
          const imagesArr = property.images as string[];
          return (
            <article
              key={id}
              className="rounded-2xl  border cursor-pointer flex gap-4 flex-col md:flex-row bg-card shadow-muted  hover:shadow-xl duration-300 group"
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
                  <h3 className="font-bold text-xl text-ellipsis  text-nowrap overflow-hidden group-hover:underline capitalize">
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
    </>
  );
}
export default FavoritesPage;
