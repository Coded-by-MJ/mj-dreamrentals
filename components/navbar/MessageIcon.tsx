import { Bell } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { fetchUnreadMessagesCount } from "@/utils/actions";

async function MessageIcon() {
  const count = await fetchUnreadMessagesCount();
  return (
    <Button className="relative" size={"icon"} variant={"outline"}>
      <Link href={"/dashboard/messages"}>
        <Bell className="h-[1.3rem] w-[1.3rem]  transition-colors fill-secondary-foreground" />
        <span
          className={cn(
            "absolute bg-red-500 rounded-full text-[10px] -top-0 right-1.5 text-white size-4 items-center justify-center",
            count > 0 ? "flex" : "hidden"
          )}
        >
          {count}
        </span>
      </Link>
    </Button>
  );
}
export default MessageIcon;
