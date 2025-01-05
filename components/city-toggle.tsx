"use client";

import * as React from "react";
import { MapPin, Check } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const CityToggle: React.FC = () => {
  const { city, setCity } = useCity()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <MapPin className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MapPin className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle city</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="space-x-2" onClick={() => setCity("marseille")}>
          {city === "marseille" && <Check className="h-4 w-4" /> || <span className="h-4 w-4" />}
          <span>Marseille</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="space-x-2" onClick={() => setCity("paris")}>
          {city === "paris" && <Check className="h-4 w-4" /> || <span className="h-4 w-4" />}
          <span>Paris</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="space-x-2" onClick={() => setCity("rennes")}>
          {city === "rennes" && <Check className="h-4 w-4" /> || <span className="h-4 w-4" />}
          <span>Rennes</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CityToggle;

const useCity = () => {
  const [city, setCity] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (city) {
      // Here you would typically fetch and load data for the selected city
      console.log(`City changed to: ${city}`);
    }
  }, [city]);

  return { city, setCity };
};