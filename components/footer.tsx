"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Badge } from "./ui/badge";

const Footer = () => {
  const t = useTranslations("navigation");

  return (
    <footer className="text-xs sm:text-sm text-foreground text-center bg-background py-6 border-t border-foreground/10 dark:border-foreground/20 space-y-2">
      <div className="justify-between items-center">
        <div className="space-x-3">
          <Link href="/about" className="hover:underline">
            {t("about")}
          </Link>
          <Link href="/legal-mentions" className="hover:underline">
            {t("legalMentions")}
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            {t("privacyPolicy")}
          </Link>
          <Link href="/terms-of-use" className="hover:underline">
            {t("termsOfUse")}
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center text-sm font-mono space-x-2 font-bold">
        <div>
          <span className="text-primary dark:text-primary">$&#62; </span>./{t("madeWith")}{" "}
          <span className="text-red-500">&#60;3 </span>
          {t("on")}
        </div>
        <Link
          className="text-white"
          href="https://github.com/pquline/volr"
          target="_blank"
        >
          <Badge>GitHub</Badge>
        </Link>
      </div>
      <div className="text-center space-y-3">
        <p className="text-foreground/90">
          © {new Date().getFullYear()} volr. {t("noRightsReserved")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
