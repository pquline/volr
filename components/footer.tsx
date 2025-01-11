"use client";

import * as React from "react";
import Link from "next/link";
import { Badge } from "./ui/badge";

const Footer = () => {
  return (
    <footer className="text-xs sm:text-sm text-foreground text-center bg-background py-6 border-t border-foreground/10 dark:border-foreground/20 space-y-2">
      <div className="justify-between items-center">
        <div className="space-x-3">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/legal-mentions" className="hover:underline">
            Legal Mentions
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center text-sm font-mono space-x-2 font-bold">
        <div>
          <span className="text-primary dark:text-primary">$&#62; </span>./made
          with <span className="text-red-500">&#60;3 </span>on
        </div>
        <Link
          className="text-white"
          href="https://github.com/pquline/Volr"
          target="_blank"
        >
          <Badge>GitHub</Badge>
        </Link>
      </div>
      <div className="text-center space-y-3">
        <p className="text-foreground/90">
          © {new Date().getFullYear()} Volr. No rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
