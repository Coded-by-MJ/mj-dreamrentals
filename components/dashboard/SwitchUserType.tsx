import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import FormContainer from "../form/FormContainer";
import { updateUserTypeAction } from "@/utils/actions";
import { SubmitButton } from "../form/Buttons";
import { Button } from "../ui/button";

function SwitchUserType() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"}>Switch To Property Owner</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Switching to a Property Owner account will update your profile and
            preferences, granting you access to exclusive features designed for
            property owners. This action is irreversible. Please confirm if you
            wish to proceed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <FormContainer action={updateUserTypeAction} className="">
            <SubmitButton optionText="" className="" text="Confirm" />
          </FormContainer>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default SwitchUserType;
