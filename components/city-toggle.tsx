"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const { city, setCity } = useCity();
  const selectRef = React.useRef<HTMLSelectElement>(null);

  return (
    <div className="relative">
      <select
        ref={selectRef}
        value={city || ""}
        onChange={(e) => setCity(e.target.value)}
        className={cn(
          "w-full min-w-[110px] appearance-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        )}
        aria-label="Select city"
      >
        {cities.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>
      <ChevronsUpDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />
    </div>
  );
};

export default CityToggle;
