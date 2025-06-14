"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Code2, Database, Mail, Shield, UserCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PrivacyPolicy() {
  const t = useTranslations("privacy");

  return (
    <div className="grid place-items-center py-4">
      <div className="grid grid-cols-1 gap-8 sm:gap-6 max-w-2xl w-full px-6 sm:pt-2">
        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("title")}</CardTitle>
            <Shield className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <strong>{t("projectName")}:</strong> <Link href="/" className="font-mono hover:underline">volr</Link>
            </p>
            <p>
              <strong>{t("purpose")}:</strong> <Link href="/" className="font-mono hover:underline">volr</Link> {t("purposeDescription")}
            </p>
            <p>
              <strong>{t("transparency")}:</strong> {t("transparencyDescription")}
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("dataCollection.title")}</CardTitle>
            <Database className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <strong>{t("dataCollection.what")}:</strong> {t("dataCollection.whatDescription")}
            </p>
            <p>
              <strong>{t("dataCollection.analytics")}:</strong> {t("dataCollection.analyticsDescription")}
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("openSource.title")}</CardTitle>
            <Code2 className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <strong>{t("openSource.transparency")}:</strong> {t("openSource.transparencyDescription")}{" "}
              <Link
                href="https://github.com/pquline/volr"
                className="font-mono hover:underline"
              >
                GitHub
              </Link>
              . {t("openSource.verification")}
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("userResponsibility.title")}</CardTitle>
            <UserCheck className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <strong>{t("userResponsibility.content")}:</strong> {t("userResponsibility.contentDescription")}{" "}
              <Link href="/terms-of-use" className="font-mono hover:underline">
                {t("userResponsibility.terms")}
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("contact.title")}</CardTitle>
            <Mail className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              {t("contact.description")}{" "}
              <Link
                href="mailto:dev@volr.cc"
                className="font-mono hover:underline"
              >
                dev@volr.cc
              </Link>
              <br />
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("lastUpdated.title")}</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>{t("lastUpdated.date")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
