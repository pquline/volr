"use client";

import * as React from "react";
import { Check, MapPin } from "lucide-react";
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
  const [city, setCity] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Load city from localStorage on mount
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
      setCity(savedCity);
    } else {
      // If no saved city, set default to paris and save it
      setCity("paris");
      localStorage.setItem("selectedCity", "paris");
    }
    setIsLoading(false);
  }, []);

  const updateCity = React.useCallback((newCity: string) => {
    if (newCity === city) return; // Don't update if city hasn't changed
    setCity(newCity);
    localStorage.setItem("selectedCity", newCity);
    // Refresh the page to load new data
    window.location.reload();
  }, [city]);

  // Return loading state
  if (isLoading) {
    return { city: null, setCity: updateCity, isLoading: true };
  }

  // Return the current city state
  return { city, setCity: updateCity, isLoading: false };
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
          <span className="ml-2">{cities.find(c => c.value === city)?.label || "Select City"}</span>
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
                  setCity(currentValue);
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
