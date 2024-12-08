import ProfileImage from "@/components/dashboard/ProfileImage";
import SwitchUserType from "@/components/dashboard/SwitchUserType";
import { SubmitButton } from "@/components/form/Buttons";
import FormContainer from "@/components/form/FormContainer";
import FormInput from "@/components/form/FormInput";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { fetchUserProfile, updateUserProfile } from "@/utils/actions";
import { BadgeCheck } from "lucide-react";

async function ProfilePage() {
  const profile = await fetchUserProfile();
  return (
    <Card className="p-8  w-full">
      <FormContainer action={updateUserProfile} className="">
        <ProfileImage
          profileImage={profile.imageUrl}
          name={profile.firstName}
        />

        <div className="text-xs w-[170px] my-4 flex gap-1 justify-center items-center px-2 py-1.5 rounded-2xl bg-primary/20 border border-primary font-medium">
          <BadgeCheck className="size-5 text-primary" />
          <span className="font-bold uppercase text-nowrap">
            property {profile.userType}
          </span>
        </div>
        <div className="flex flex-col w-full lg:w-[60%] gap-2.5 mt-6">
          <Input
            type="hidden"
            name="oldImage"
            defaultValue={profile.imageUrl}
          />
          <FormInput
            type="text"
            name="firstName"
            label="First Name"
            placeholder="Your First Name"
            defaultValue={profile.firstName}
          />
          <FormInput
            type="text"
            name="lastName"
            label="Last Name"
            placeholder="Your Last Name"
            defaultValue={profile.lastName}
          />
          <FormInput
            type="email"
            name="email"
            label="Email Address"
            readOnly={true}
            placeholder="Enter your email address"
            defaultValue={profile.email}
          />

          <div className="justify-end flex items-center gap-3">
            {profile.userType !== "OWNER" && <SwitchUserType />}
            <SubmitButton
              optionText="Please wait..."
              text="Update Profile"
              className=""
            />
          </div>
        </div>
      </FormContainer>
    </Card>
  );
}
export default ProfilePage;
