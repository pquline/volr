"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CityToggle = () => {
  return (
    <Select>
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="City" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="marseille">Marseille</SelectItem>
        <SelectItem value="paris">Paris</SelectItem>
        <SelectItem value="rennes">Rennes</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default CityToggle;