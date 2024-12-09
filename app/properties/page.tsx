import { SearchParamsType } from "@/utils/types";
import EmptyList from "@/components/home/EmptyList";
import { fetchAllProperties } from "@/utils/actions";
import SearchBar from "@/components/form/SearchBar";
import PropertiesContainer from "@/components/properties/PropertiesContainer";
import PropertiesMap from "@/components/properties/PropertiesMap";
async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<Partial<Record<keyof SearchParamsType, string>>>;
}) {
  const params = await searchParams;
  const searchParamsObj: SearchParamsType = {
    location: params.location || "",
    category: params.category || "All",
    layout: (params.layout as "List" | "Grid") || "List",
    page: Number(params.page) || 1,
  };
  const { properties, totalPages, count } = await fetchAllProperties(
    searchParamsObj
  );

  return (
    <>
      <div className="max-w-[750px] mb-12 mx-auto">
        <SearchBar />
      </div>

      <section className="gap-4 grid grid-cols-1 lg:grid-cols-70/30 w-full">
        {properties.length === 0 ? (
          <EmptyList
            heading="No results."
            message="Try changing or removing some of your filters."
            btnText="Clear Filters"
            link={`/properties?layout=${searchParamsObj.layout}`}
          />
        ) : (
          <PropertiesContainer
            allProperties={properties}
            layout={searchParamsObj.layout}
            currentPage={searchParamsObj.page}
            totalPages={totalPages}
            count={count}
          />
        )}
        <div className="w-full h-[400px]  hidden lg:block">
          <PropertiesMap propertiesLength={properties.length} />
        </div>
      </section>
    </>
  );
}
export default PropertiesPage;
