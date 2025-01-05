"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../public/logo.png";

const Branding: React.FC = () => {
  return (
    <Link href="/">
      <div className="flex items-center">
        <Image
          src={Logo}
          alt="Logo"
          width={30}
          height={30}
          className="md:w-[40px]"
        />
        <h1 className="ml-4 text-xl font-extrabold tracking-tight lg:text-3xl">Volr</h1>
      </div>
    </Link>
  );
};

export default Branding;