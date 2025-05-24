"use client";

import * as React from "react";
import ModeToggle from "./mode-toggle";
import Branding from "./branding";
import CityToggle from "./city-toggle";

const Header = () => {
  return (
    <header className="sm:sticky top-0 z-40 border-b border-foreground/10 dark:border-foreground/20 py-4 bg-background grid place-items-center">
      <div className="grid grid-cols-1 gap-6 max-w-6xl w-full px-6">
        <div className="container mx-auto flex justify-between items-center">
          <Branding />
          <div className="flex justify-between items-center space-x-4">
            <CityToggle />
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
