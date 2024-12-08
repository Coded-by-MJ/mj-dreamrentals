"use client";
import { dashboardLinks, onlyOwnersLinks } from "@/utils/links";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import RentalsMenubar from "@/components/dashboard/RentalsMenubar";

function Sidebar({ isUserOwner }: { isUserOwner: boolean }) {
  const pathname = usePathname();

  return (
    <aside>
      {dashboardLinks.map((link) => {
        const isActivePage = pathname.startsWith(link.href);
        const variant = isActivePage ? "default" : "ghost";
        if (onlyOwnersLinks.includes(link.href) && !isUserOwner) return null;
        if (link.href === "/dashboard/rentals") {
          return <RentalsMenubar variant={variant} key={link.href} />;
        }
        return (
          <Button
            asChild
            className="w-full mb-2 capitalize font-normal justify-start"
            variant={variant}
            key={link.href}
          >
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          </Button>
        );
      })}
    </aside>
  );
}
export default Sidebar;
