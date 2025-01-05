"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="text-xs sm:text-sm text-foreground text-center bg-background py-6 pb-4 border-t border-muted space-y-2">
      <div className="justify-between items-center">
        <div className="space-x-4 text-foreground/95">
          <Link href="/about" className="hover:underline">About</Link>
          <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link href="/terms" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
      <div className="flex justify-center items-center text-md space-x-2">
        <div>Made with</div>
        <Heart className="w-5 h-5 text-destructive animate-pulse" />
        <div>on</div>
        <Link className="text-tertiary" href="https://github.com/pquline/Volr" target="_blank"><strong>GitHub</strong></Link>
      </div>
    </footer>
  );
};

export default Footer;
