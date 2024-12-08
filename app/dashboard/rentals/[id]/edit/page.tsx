import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/FormContainer";
import { fetchRentalDetails, updatePropertyAction } from "@/utils/actions";
import { SubmitButton } from "@/components/form/Buttons";
import PriceInput from "@/components/form/PriceInput";
import CategoriesInput from "@/components/form/CategoriesInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import ImageInput from "@/components/form/ImageInput";
import CounterInput from "@/components/form/CounterInput";
import AmenitiesInput from "@/components/form/AmenitiesInput";
import { type Amenity } from "@/utils/options";
import { redirect } from "next/navigation";
import { LocationObj } from "@/utils/types";
import CountriesInput from "@/components/form/CountriesInput";
async function EditPropertyPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  const property = await fetchRentalDetails(id);

  if (!property) redirect("/");

  const defaultAmenities = property.amenities as Amenity[];
  const oldImages = property.images as string[];
  const location = property.location as LocationObj;

  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">edit property</h1>
      <div className="border p-8 rounded">
        <h3 className="text-lg mb-4 font-medium">General Info</h3>
        <FormContainer action={updatePropertyAction} className="">
          <input type="hidden" name="id" value={property.id} />
          <input type="hidden" name="oldImages" value={oldImages} />
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <FormInput
              name="name"
              type="text"
              label="Name (100 limit)"
              defaultValue={property.name}
            />
            <CategoriesInput defaultValue={property.category} />

            {/* price */}
            <PriceInput defaultValue={property.price} />
            {/* categories */}
            <FormInput
              name="squareFeet"
              type="number"
              label="Square Feet"
              defaultValue={String(property.squareFeet)}
            />
          </div>
          {/* text area / description */}
          <TextAreaInput
            name="description"
            labelText="Description (10 - 1000 words)"
            defaultValue={property.description}
          />
          <div className="mt-4">
            <ImageInput
              propertyName={property.name}
              required={false}
              oldImages={oldImages}
            />
          </div>
          <h3 className="text-lg mt-8 mb-4 font-medium">Location Details</h3>
          <FormInput
            name="address"
            type="text"
            defaultValue={location.address}
            placeholder="24 Baldwin Street"
          />
          <FormInput name="city" type="text" defaultValue={location.city} />
          <FormInput name="state" type="text" defaultValue={location.state} />
          <CountriesInput defaultValue={location.country} />
          <h3 className="text-lg mt-8 mb-4 font-medium">
            Accommodation Details
          </h3>
          <CounterInput detail="bedrooms" defaultValue={property.bedrooms} />
          <CounterInput detail="bathrooms" defaultValue={property.bathrooms} />
          <CounterInput detail="sleeps" defaultValue={property.sleeps} />
          <CounterInput detail="beds" defaultValue={property.beds} />
          <h3 className="text-lg mt-10 mb-6 font-medium">
            Amenities{" "}
            <span className="text-xs font-light after:content-['*'] after:ml-0.5 after:text-red-500">
              (minimum of 3 selected amenity is required)
            </span>
          </h3>
          <AmenitiesInput defaultValue={defaultAmenities} />
          <SubmitButton
            text="Update Rental"
            className="mt-12"
            optionText="Please wait..."
          />
        </FormContainer>
      </div>
    </section>
  );
}
export default EditPropertyPage;
