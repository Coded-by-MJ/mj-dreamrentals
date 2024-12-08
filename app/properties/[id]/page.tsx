import BreadCrumbs from "@/components/singleProperty/Breadcrumbs";
import BookingWrapper from "@/components/bookings/BookingWrapper";
import PropertyImages from "@/components/singleProperty/PropertyImages";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "@/components/singleProperty/Overview";
import Amenities from "@/components/singleProperty/Amenities";
import HouseRules from "@/components/singleProperty/HouseRules";
import Location from "@/components/singleProperty/Location";
import Host from "@/components/singleProperty/Host";
import Reviews from "@/components/singleProperty/Reviews";
import { LocationObj } from "@/utils/types";
import { fetchSingleProperty } from "@/utils/actions";
import FavoriteToggleButton from "@/components/singleProperty/FavoriteToggleButton";
import type { Metadata, ResolvingMetadata } from "next";
import ShareButton from "@/components/singleProperty/ShareButton";
import {
  PropertiesLoading,
  SinglePropertyLoading,
} from "@/components/skeletons/Loadings";

// export async function generateMetadata(
//   { params }: { params: Promise<{ id: string }> },
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const { id } = await params;
//   const property = await fetchSingleProperty(id);

//   const imageUrl =
//     (property.images as ImageObj[])[3].url ||
//     "https://opengraph.b-cdn.net/production/images/1a8d4eae-5b6e-4080-8592-dc9d7c476928.png?token=odBlQwQs2d07Ja1ctqBqqvQZCdAZbjCd1D1ZNMf00Lo&height=500&width=500&expires=33268785186";
//   const description =
//     property.description.slice(0, 160) ||
//     "Explore the best vacation rentals in Florida. From beachfront escapes to cozy family stays, plan your next trip with a seamless booking experience. No fees, just memories!";

//   return {
//     title: property.name,
//     description: property.description,
//     keywords:
//       "Florida vacation rentals, beachfront homes, Florida getaways, family-friendly stays, no booking fees, Florida vacation homes, vacation rentals Florida, Florida beach rentals",
//     openGraph: {
//       title: property.name,
//       description,
//       url: `https://floridagetawaysrentals.com/properties/${id}`,
//       siteName: "Florida Getaways Rentals",
//       images: [
//         {
//           url: imageUrl,
//           secureUrl: imageUrl, // URL to a preview image
//           width: 1200,
//           height: 642,
//           alt: `${property.name} - Florida Getaways Rentals`,
//         },
//       ],
//       locale: "en_US",
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: property.name,
//       description: property.description,
//       images: [imageUrl],
//     },
//   };
// }

async function PropertyPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const property = await fetchSingleProperty(id);

  const images = property.images as string[];
  const location = property.location as LocationObj;

  return (
    <section>
      <div className="flex flex-col sm:flex-row items-start gap-3 mb-2 justify-between">
        <BreadCrumbs propertyName={property.name} />

        <div className="flex-shrink-0 flex items-center gap-2">
          <ShareButton name={property.name} propertyId={property.id} />
          <FavoriteToggleButton propertyId={property.id} />
        </div>
      </div>
      <PropertyImages images={images} propertyName={property.name} />
      {/* tab  */}
      <section className="grid w-full  items-start grid-cols-1 gap-7 lg:grid-cols-12  mb-40">
        <Tabs
          defaultValue="overview"
          className="w-full lg:col-span-8 flex flex-col gap-4"
        >
          <TabsList className="w-full bg-transparent  py-3 h-auto gap-y-1 rounded-none flex-wrap justify-start items-center">
            <TabsTrigger
              className="hover:bg-muted data-[state=active]:bg-primary/20 data-[state=active]:border-primary data-[state=active]:border"
              value="overview"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              className="hover:bg-muted data-[state=active]:bg-primary/20 data-[state=active]:border-primary data-[state=active]:border"
              value="amenities"
            >
              Amenities
            </TabsTrigger>
            <TabsTrigger
              className="hover:bg-muted data-[state=active]:bg-primary/20 data-[state=active]:border-primary data-[state=active]:border"
              value="rules"
            >
              House Rules
            </TabsTrigger>
            <TabsTrigger
              className="hover:bg-muted data-[state=active]:bg-primary/20 data-[state=active]:border-primary data-[state=active]:border"
              value="location"
            >
              Location
            </TabsTrigger>
            <TabsTrigger
              className="hover:bg-muted data-[state=active]:bg-primary/20 data-[state=active]:border-primary data-[state=active]:border"
              value="host"
            >
              Host
            </TabsTrigger>
            <TabsTrigger
              className="hover:bg-muted data-[state=active]:bg-primary/20 data-[state=active]:border-primary data-[state=active]:border"
              value="reviews"
            >
              Reviews
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Overview property={property} />
          </TabsContent>
          <TabsContent value="amenities">
            <Amenities property={property} />
          </TabsContent>
          <TabsContent value="rules">
            <HouseRules />
          </TabsContent>
          <TabsContent value="location">
            <Location locationObj={location} />
          </TabsContent>
          <TabsContent value="host">
            <Host owner={property.profile} propertyId={property.id} />
          </TabsContent>
          <TabsContent value="reviews">
            <Reviews owner={property.profile} propertyId={property.id} />
          </TabsContent>
        </Tabs>
        <BookingWrapper
          propertyId={property.id}
          price={property.price}
          maxGuests={property.sleeps}
          bookings={property.bookings}
        />
      </section>
    </section>
  );
}
export default PropertyPage;
