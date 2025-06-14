"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("common");

  return (
    <div className="grid place-items-center min-h-[60vh]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">{t("notFound")}</p>
        <Link
          href="/"
          className="text-primary hover:underline"
        >
          {t("backToHome")}
        </Link>
      </div>
    </div>
  );
}
