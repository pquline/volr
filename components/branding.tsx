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
          width={40}
          height={40}
        />
        <h1 className="ml-4 text-2xl font-extrabold tracking-tight font-mono">volr</h1>
      </div>
    </Link>
  );
};

export default Branding;
