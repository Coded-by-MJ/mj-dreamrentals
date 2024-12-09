import { Property } from "@prisma/client";

import PropertiesList from "./PropertiesList";
import PropertiesGrid from "./PropertiesGrid";
import LayoutButtons from "./LayoutButtons";
import PaginationContainer from "./PaginationContainer";
function PropertiesContainer({
  allProperties,
  layout,
  currentPage,
  totalPages,
  count,
}: {
  allProperties: Property[];
  layout: "Grid" | "List";
  currentPage: number;
  totalPages: number;
  count: number;
}) {
  return (
    <>
      <div className="flex justify-between items-center mb-12 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">
          {count} {count > 1 ? "properties" : "property"}
        </h4>
        <LayoutButtons layout={layout} />
      </div>

      {layout === "List" ? (
        <PropertiesList properties={allProperties} />
      ) : (
        <PropertiesGrid properties={allProperties} />
      )}

      {totalPages > 2 && (
        <div className="mt-4 flex justify-center items-center">
          <PaginationContainer
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      )}
    </>
  );
}
export default PropertiesContainer;
