"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DateRange } from "react-day-picker";
import { useProperty } from "@/utils/store";
import { Calendar as CalendarIcon, CircleAlert } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  generateDisabledDates,
  generateDateRange,
  defaultSelected,
  generateBlockedPeriods,
} from "@/utils/calendar";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { useMediaQuery } from "react-responsive";

function BookingCalendar() {
  const currentDate = new Date();

  const { bookings, range: propertyRange } = useProperty((state) => state);

  const [range, setRange] = useState<DateRange | undefined>(propertyRange);

  const [openPopover, setOpenPopover] = useState(false);

  const blockedPeriods = generateBlockedPeriods({
    bookings,
    today: currentDate,
  });
  const isLargeScreen = useMediaQuery({
    query: "(min-width: 640px)",
  });

  const updateBookingState = () => {
    const unavailableDates = generateDisabledDates(blockedPeriods);

    const selectedRange = generateDateRange(range);
    const isDisabledDateIncluded = selectedRange.some((date) => {
      if (unavailableDates[date]) {
        setRange(defaultSelected);
        useProperty.setState({ range: defaultSelected });
        toast({
          description: "Some dates are booked. Please select again.",
          variant: "destructive",
        });
        return true;
      }
      return false;
    });

    if (!isDisabledDateIncluded) {
      useProperty.setState({ range });
    }
  };

  const resetBookingState = () => {
    setRange(defaultSelected);
    useProperty.setState({ range: defaultSelected });
    setOpenPopover(false);
  };

  useEffect(() => {
    updateBookingState();
  }, [range]);

  return (
    <>
      <div className={"grid gap-2 mb-2"}>
        {openPopover && (
          <div className="fixed inset-0 bg-secondary/10 z-[100]"></div>
        )}
        {!range?.from && !range?.to && (
          <p className="flex items-center gap-1 text-sm text-primary my-1">
            <CircleAlert className="size-4 text-primary" />{" "}
            <span>Select dates for total pricing</span>{" "}
          </p>
        )}
        <Popover open={openPopover}>
          <PopoverTrigger asChild>
            <div className="flex w-full items-center gap-3 justify-between">
              <button
                onClick={() => setOpenPopover(true)}
                id="booking-dates"
                className={
                  "border h-[48px] w-1/2 p-3 pt-1.5 flex gap-2 items-center  border-main outline-none text-main text-nowrap overflow-clip text-ellipsis  rounded-md  text-left font-normal"
                }
              >
                <CalendarIcon className="size-6 text-main mt-1.5 " />
                {range?.from ? (
                  <>
                    <div className="slide-in-from-bottom-2  fade-in-0 animate-in">
                      <span className="text-xs text-main">Check In</span>
                      <p className="text-base text-main text-ellipsis text-nowrap overflow-hidden">
                        {format(range.from, "LLL dd")}
                      </p>
                    </div>
                  </>
                ) : (
                  <span className="text-base mt-1.5 text-main text-ellipsis text-nowrap overflow-hidden">
                    Check In
                  </span>
                )}
              </button>

              <button
                id="booking-dates"
                onClick={() => setOpenPopover(true)}
                className={
                  "border h-[48px] w-1/2 p-3 pt-1.5 flex gap-2 items-center  border-main outline-none text-main text-nowrap overflow-hidden text-ellipsis  rounded-md  text-left font-normal"
                }
              >
                <CalendarIcon className="size-6 text-main mt-1.5" />
                {range?.to ? (
                  <>
                    <div className="slide-in-from-bottom-2  fade-in-0 animate-in">
                      <span className="text-xs text-main mb-1">Check Out</span>
                      <p className="text-base text-main text-ellipsis text-nowrap overflow-hidden">
                        {format(range.to, "LLL dd")}
                      </p>
                    </div>
                  </>
                ) : (
                  <span className="text-base mt-1.5  text-main text-ellipsis text-nowrap overflow-hidden">
                    Check Out
                  </span>
                )}
              </button>
            </div>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 z-[9999]"
            align="end"
            onInteractOutside={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={currentDate}
              selected={range}
              numberOfMonths={isLargeScreen ? 2 : 1}
              disabled={blockedPeriods}
              onSelect={setRange}
              classNames={{
                day_today: `!bg-transparent text-primary`,
                day_disabled: "bg-primary/50",
              }}
            />
            <div className="mt-3 p-3 flex items-center gap-4 justify-end">
              <Button
                onClick={resetBookingState}
                disabled={!range?.from && !range?.to}
                className="bg-transparent  text-main disabled:text-main/50"
              >
                Clear dates
              </Button>
              <Button
                onClick={() => {
                  updateBookingState();
                  setOpenPopover(false);
                }}
                className="bg-primary text-white"
              >
                Submit
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}

export default BookingCalendar;
