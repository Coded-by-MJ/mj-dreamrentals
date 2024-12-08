import InfoBox from "./InfoBox";

function InfoBoxes() {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            heading="For Renters"
            buttonInfo={{
              link: "/properties",
              text: "Browse Properties",
              variant: "outline",
            }}
            cardColor="bg-primary"
            textColor="text-foreground"
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            cardColor="bg-muted"
            textColor="text-secondary-foreground"
            heading="For Property Owners"
            buttonInfo={{
              link: "/dashboard/rentals/create",
              text: "Add Properties",
              variant: "default",
            }}
          >
            List your properties and reach potential tenants. Rent as an
            vacation rental or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
}
export default InfoBoxes;
