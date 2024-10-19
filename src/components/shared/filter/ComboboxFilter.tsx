"use client";

import React, { useState } from "react";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn, formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

import Image from "next/image";

interface Props {
  filters: {
    name: string;
    value: string;
  }[];
  otherClasses?: string;
  containerClasses?: string;
  imgSrc: string;
  paramsKey: string;
}

const ComboboxFilter = ({
  filters,
  otherClasses,
  containerClasses,
  imgSrc,
  paramsKey,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const paramFilter = searchParams.get(paramsKey);

  const handleUpdateParams = (value: string) => {
    if (value === "") {
      const newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: [`${paramsKey}`],
      });

      router.push(newUrl, { scroll: false });
      return;
    }

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: paramsKey,
      value,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      className={`background-light800_darkgradient flex min-h-[56px] items-center gap-4 rounded-[10px] px-4 ${containerClasses}`}
    >
      <Image
        src={imgSrc}
        alt="location icon"
        width={24}
        height={24}
        className="cursor-pointer"
      />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className={`${otherClasses} body-regular text-dark400_light500 border border-none py-2.5`}
        >
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[100px] justify-between px-1"
          >
            {paramFilter
              ? filters.find((filter) => filter.value === paramFilter)?.name
              : "Select Location"}
            <ChevronsUpDown className="text-dark400_light500 ml-2 size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="text-dark500_light700 small-regular w-[235px] translate-x-[-20px] border-none bg-light-900 p-0 dark:bg-dark-300 ">
          <Command>
            <CommandInput placeholder="Search location..." />
            <CommandList className="custom-scrollbar border-none dark:shadow-none">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {filters.map((filter) => (
                  <CommandItem
                    key={filter.value}
                    value={filter.name}
                    onSelect={(currentValue) => {
                      const returnValue = filters?.find(
                        (filter) => filter.name === currentValue
                      );

                      console.log(returnValue);

                      handleUpdateParams(
                        returnValue?.value !== paramFilter
                          ? returnValue?.value || ""
                          : ""
                      );

                      setOpen(false);
                    }}
                    className="cursor-pointer hover:bg-light-800 dark:hover:bg-dark-400"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        paramFilter === filter.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {filter.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ComboboxFilter;
