import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GuestsObj } from "@/utils/types";
import * as SupportPopover from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { Minus, Plus, Users } from "lucide-react";
import { Button } from "../ui/button";

function GuestsInput({
  guests,
  updateGuests,
  className,
  maxGuests = 20,
}: {
  guests: GuestsObj;
  updateGuests: (newGuests: GuestsObj) => void;
  className: string;
  maxGuests?: number;
}) {
  const increaseAdults = () => {
    if (guests.adults + guests.children === maxGuests) return;
    const adults: number = (guests.adults += 1);
    updateGuests({
      ...guests,
      adults,
    });
  };

  const decreaseAdults = () => {
    if (guests.adults === 1) return;
    const adults: number = (guests.adults -= 1);
    updateGuests({
      ...guests,
      adults,
    });
  };

  const increaseChildren = () => {
    if (guests.adults + guests.children === maxGuests) return;
    const children: number = (guests.children += 1);
    updateGuests({
      ...guests,
      children,
    });
  };
  const decreaseChildren = () => {
    if (guests.children === 0) return;
    const children: number = (guests.children -= 1);
    updateGuests({
      ...guests,
      children,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button id="guests" className={className}>
          <Users
            className={cn("text-main size-6 flex-shrink-0 transition-colors")}
          />
          <div
            className={cn(
              "w-full flex-grow border-none outline-none h-full rounded-none text-main text-base  text-left font-normal"
            )}
          >
            {guests.adults + guests.children} guests
          </div>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[300px] sm:w-[350px] px-3 py-6 z-[9999]"
        align="center"
      >
        <div className="w-full flex flex-col gap-4">
          {/* adults increment */}
          <div
            className="flex items-center justify-between"
            role="group"
            aria-label="Number of adults"
          >
            <span className="text-sm text-main capitalize font-normal">
              adults
            </span>

            <div className="flex items-center gap-3.5">
              <Button
                disabled={guests.adults <= 1}
                onClick={decreaseAdults}
                aria-label="Decrease number of adults"
                className="rounded-full disabled:border-main/50 disabled:text-main/50 text-main size-8 bg-transparent border-main border"
                size="icon"
              >
                <Minus className="size-4" />
              </Button>

              <span
                className="text-base text-main w-6 block text-center"
                aria-live="polite"
                aria-atomic="true"
              >
                {guests.adults}
              </span>

              <Button
                onClick={increaseAdults}
                disabled={guests.adults + guests.children === maxGuests}
                aria-label="Increase number of adults"
                className="rounded-full disabled:border-main/50 disabled:text-main/50 text-main size-8 bg-transparent border-main border"
                size="icon"
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          {/* children increment */}
          <div
            className="flex items-center justify-between"
            role="group"
            aria-label="Number of children"
          >
            <span className="text-sm text-main capitalize font-normal">
              children <br />
              <span className="text-[11px] text-main font-normal">
                (Ages 0 to 17)
              </span>
            </span>

            <div className="flex items-center gap-3.5">
              <Button
                onClick={decreaseChildren}
                disabled={guests.children <= 0}
                aria-label="Decrease number of children"
                className="rounded-full disabled:border-main/50 disabled:text-main/50 text-main size-8 bg-transparent border-main border"
                size="icon"
              >
                <Minus className="size-4" />
              </Button>

              <span
                className="text-base text-main w-6  text-center block"
                aria-live="polite"
                aria-atomic="true"
              >
                {guests.children}
              </span>

              <Button
                onClick={increaseChildren}
                aria-label="Increase number of children"
                className="rounded-full disabled:border-main/50 disabled:text-main/50 text-main size-8 bg-transparent border-main border"
                size="icon"
                disabled={guests.adults + guests.children === maxGuests}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6  flex items-center justify-end">
          <SupportPopover.Close asChild>
            <Button className="text-white bg-primary">Done</Button>
          </SupportPopover.Close>
        </div>
      </PopoverContent>
    </Popover>
  );
}
export default GuestsInput;
