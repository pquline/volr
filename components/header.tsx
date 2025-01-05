"use client";

import * as React from "react";
import ModeToggle from "./mode-toggle";
import Branding from "./branding";
import CityToggle from "./city-toggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-muted py-4 bg-background px-6 sm:px-16 md:px-32">
      <div className="container mx-auto flex justify-between items-center">
        <Branding></Branding>
        <div className="flex justify-between items-center space-x-4">
          <CityToggle></CityToggle>
          <ModeToggle></ModeToggle>
        </div>
      </div>
    </header>
  );
};

export default Header;
