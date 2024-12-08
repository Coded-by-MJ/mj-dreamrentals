import SearchBar from "@/components/form/SearchBar";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import InfoBoxes from "@/components/home/InfoBoxes";
import RecentProperties from "@/components/home/RecentProperties";
import {
  HomeLoading,
  LoadingCardContainer,
} from "@/components/skeletons/Loadings";
import { Suspense } from "react";
export default function HomePage() {
  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center mb-20  w-full">
        <h1 className="text-balance delay-100 slide-in-from-bottom-8 fade-in-0 duration-300 animate-in font-bold z-10 text-center text-3xl md:text-6xl ">
          Find Your Dream Rental
        </h1>
        <p className="text-balance font-medium text-center delay-75 text-base duration-400  sm:text-lg slide-in-from-bottom-8 fade-in-0  animate-in">
          Explore exceptional properties tailored to your lifestyle and needs.
        </p>

        <div className="p-2 bg-muted rounded-md w-full max-w-[750px]">
          <Suspense
            fallback={
              <LoadingCardContainer
                cardAmount={3}
                className="flex items-center gap-4 flex-wrap"
              />
            }
          >
            <SearchBar />
          </Suspense>
        </div>
      </div>

      <InfoBoxes />
      <Suspense fallback={<HomeLoading />}>
        <FeaturedProperties />
      </Suspense>
      <Suspense fallback={<HomeLoading />}>
        <RecentProperties />
      </Suspense>
    </>
  );
}
