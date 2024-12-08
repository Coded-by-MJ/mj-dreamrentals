import { Button } from "../ui/button";
import Link from "next/link";

function RentalsMenubar({ variant }: { variant: "default" | "ghost" }) {
  return (
    <div className="flex flex-col gap-2 items-start justify-start">
      <Button
        className="w-full  capitalize font-normal justify-start"
        variant={variant}
      >
        Rentals
      </Button>

      <div className="pl-2 ml-2.5 border-l">
        <Button
          className="w-full mb-2 capitalize font-normal justify-start hover:text-primary "
          asChild
          variant={"ghost"}
        >
          <Link href={`/dashboard/rentals`}>View Rentals</Link>
        </Button>
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
