"use client";

import * as React from "react";
import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const cities = [
  { value: "marseille", label: "Marseille" },
  { value: "paris", label: "Paris" },
  { value: "rennes", label: "Rennes" },
];

export const useCity = () => {
  const [city, setCity] = React.useState<string | null>("paris");

  React.useEffect(() => {
    if (city) {
      // Here you would typically fetch and load data for the selected city
      console.log(`[DEBUG]: City set to ${city.charAt(0).toUpperCase() + city.slice(1)}`);
    }
  }, [city]);

  return { city, setCity };
};

const CityToggle: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { city, setCity } = useCity();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className=""
          aria-label="select-city"
          aria-labelledby="select-city"
        >
          <MapPin className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="City..." className="h-9" />
          <CommandEmpty>No city found.</CommandEmpty>
          <CommandGroup>
            {cities.map((c) => (
              <CommandItem
                key={c.value}
                value={c.value}
                onSelect={(currentValue) => {
                  setCity(currentValue === city ? null : currentValue);
                  setOpen(false);
                }}
              >
                {c.label}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    city === c.value ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CityToggle;
