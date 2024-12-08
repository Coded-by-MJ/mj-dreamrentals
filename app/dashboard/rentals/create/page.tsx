import FormInput from "@/components/form/FormInput";
import FormContainer from "@/components/form/FormContainer";
import { createPropertyAction } from "@/utils/actions";
import { SubmitButton } from "@/components/form/Buttons";
import PriceInput from "@/components/form/PriceInput";
import CategoriesInput from "@/components/form/CategoriesInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import ImageInput from "@/components/form/ImageInput";
import CounterInput from "@/components/form/CounterInput";
import AmenitiesInput from "@/components/form/AmenitiesInput";
import CountriesInput from "@/components/form/CountriesInput";
import { DashboardLoading } from "@/components/skeletons/Loadings";
function CreatePropertyPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold mb-8 capitalize">
        create property
      </h1>
      <div className="border p-8 rounded">
        <h3 className="text-lg mb-4 font-medium">General Info</h3>
        <FormContainer action={createPropertyAction} className="">
          <div className="grid md:grid-cols-2 gap-8 mb-4">
            <FormInput
              name="name"
              type="text"
              label="Name (100 limit)"
              defaultValue="Cabin in Latvia"
            />
            <CategoriesInput />

            {/* price */}
            <PriceInput />
            {/* categories */}
            <FormInput
              name="squareFeet"
              type="number"
              label="Square Feet"
              defaultValue={"1"}
            />
          </div>
          {/* text area / description */}
          <TextAreaInput
            name="description"
            labelText="Description (10 - 1000 words)"
          />
          <div className="mt-4">
            <ImageInput propertyName="" required={true} />
          </div>
          <h3 className="text-lg mt-8 mb-4 font-medium">Location Details</h3>
          <FormInput
            name="address"
            type="text"
            defaultValue="24 Baldwin Street"
            placeholder="24 Baldwin Street"
          />
          <FormInput name="city" type="text" defaultValue="Miami" />
          <FormInput name="state" type="text" defaultValue="Florida" />
          <CountriesInput />

          <h3 className="text-lg mt-8 mb-4 font-medium">
            Accommodation Details
          </h3>
          <CounterInput detail="bedrooms" />
          <CounterInput detail="bathrooms" />
          <CounterInput detail="sleeps" />
          <CounterInput detail="beds" />
          <h3 className="text-lg mt-10 mb-6 font-medium">
            Amenities{" "}
            <span className="text-xs font-light after:content-['*'] after:ml-0.5 after:text-red-500">
              (minimum of 3 selected amenity is required)
            </span>
          </h3>
          <AmenitiesInput />
          <SubmitButton
            text="Create Rental"
            className="mt-12"
            optionText="Please wait..."
          />
        </FormContainer>
      </div>
    </section>
  );
}
export default CreatePropertyPage;
