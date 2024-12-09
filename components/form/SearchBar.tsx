"use client";

import {
  searchPropertyFormSchema,
  SearchPropertyFormSchemaType,
} from "@/utils/schema";

import { Search as SearchIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "../ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useSearchParams, useRouter } from "next/navigation";
import { categories } from "@/utils/options";

function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const form = useForm<SearchPropertyFormSchemaType>({
    resolver: zodResolver(searchPropertyFormSchema),
    defaultValues: {
      location: searchParams.get("location") || "",
      category: searchParams.get("category") || "All",
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit = (data: SearchPropertyFormSchemaType) => {
    for (const [key, value] of Object.entries(data)) {
      params.set(key, value.toString());
    }

    router.push(`/properties?${params.toString()}`);
  };

  useEffect(() => {
    const initialCategory = searchParams.get("category") || "All";
    const initialLocation = searchParams.get("location") || "";

    setValue("location", initialLocation);
    setValue("category", initialCategory);
  }, [searchParams]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col md:flex-row items-center gap-4 bg-transparent"
      >
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="md:w-1/2 w-full ">
              <Input
                id="location"
                placeholder="Enter Location (City, State, Zip, etc)"
                {...field}
                defaultValue={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                className="flex-grow border border-foreground h-12 text-ellipsis  text-base bg-transparent  outline-none"
              />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="md:w-1/2 w-full">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full h-12 border border-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[9998]">
                  <SelectItem value="All" className="p-2 text-primary">
                    All
                  </SelectItem>
                  {categories.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option}
                      className="p-2 text-primary"
                    >
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        <Button
          disabled={isSubmitting}
          type="submit"
          aria-label="submit search property"
          className="text-base self-center w-full md:self-end md:w-auto capitalize font-normal h-12 text-main disabled:bg-primary/50 bg-primary"
        >
          {isSubmitting ? (
            <ReloadIcon className="!size-[2.5rem] text-white  animate-spin" />
          ) : (
            <>
              <SearchIcon className="!size-[1.5rem] md:!size-[2rem]  text-white" />
              <span className="md:hidden text-white">search</span>
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}

export default SearchBar;
