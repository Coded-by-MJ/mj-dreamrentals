import { Button } from "../ui/button";
import Link from "next/link";

function RentalsMenubar({ variant }: { variant: "default" | "ghost" }) {
  return (
    <div className="flex w-full flex-col gap-2 items-start justify-start">
      <Button
        className="w-full  capitalize font-normal justify-start"
        variant={variant}
        asChild
      >
        <Link href={`/dashboard/rentals`}>View Rentals</Link>
      </Button>

      <div className="px-2 w-full ml-2.5 border-l">
        <Button
          variant={"ghost"}
          className="w-full capitalize font-normal justify-start hover:text-primary"
          asChild
        >
          <Link href={`/dashboard/rentals/create`}>Create Rentals</Link>
        </Button>
      </div>
    </div>
  );
}
export default RentalsMenubar;
