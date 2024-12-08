"use client";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { BsFillGridFill, BsList } from "react-icons/bs";
import { useSearchParams, useRouter } from "next/navigation";

function LayoutButtons({ layout }: { layout: "Grid" | "List" }) {
  const [initialLayout, setInitialLayout] = useState<"Grid" | "List">(layout);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  const updateLayout = (newLayout: "Grid" | "List") => {
    params.set("layout", newLayout);
    setInitialLayout(newLayout);
    router.push(`/properties?${params.toString()}`);
  };
  return (
    <div className="flex gap-x-2">
      <Button
        size={"icon"}
        variant={initialLayout === "Grid" ? "default" : "outline"}
        onClick={() => updateLayout("Grid")}
        className={cn("rounded-full")}
      >
        <BsFillGridFill />
      </Button>

      <Button
        size={"icon"}
        variant={initialLayout === "List" ? "default" : "outline"}
        onClick={() => updateLayout("List")}
        className={cn("rounded-full")}
      >
        <BsList />
      </Button>
    </div>
  );
}
export default LayoutButtons;
