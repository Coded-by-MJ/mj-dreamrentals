import LinksDropdown from "./LinksDropdown";
import DarkMode from "./DarkMode";

import Logo from "./Logo";
import MessageIcon from "./MessageIcon";
import { currentUser } from "@clerk/nextjs/server";
import { confirmUserIsOwner } from "@/utils/actions";

async function Navbar() {
  const user = await currentUser();
  const isUserOwner = user && (await confirmUserIsOwner(user.id));
  return (
    <nav className="border-b bg-background">
      <div className="container flex flex-col sm:flex-row items-start justify-between sm:items-center  gap-4 py-4">
        <Logo />
        <div className="flex gap-2.5 items-center">
          <DarkMode />
          {isUserOwner && <MessageIcon />}
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
