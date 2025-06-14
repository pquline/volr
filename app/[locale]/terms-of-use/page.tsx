"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Calendar, CheckCircle, FileText, Mail, Shield } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function TermsOfUse() {
  const t = useTranslations("terms");

  return (
    <div className="grid place-items-center py-4">
      <div className="grid grid-cols-1 gap-8 sm:gap-6 max-w-2xl w-full px-6 sm:pt-2">
        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("title")}</CardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <strong>{t("projectName")}:</strong> <Link href="/" className="font-mono hover:underline">volr</Link>
            </p>
            <p>
              <strong>{t("purpose")}:</strong> <Link href="/" className="font-mono hover:underline">volr</Link> {t("purposeDescription")}
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("acceptance.title")}</CardTitle>
            <CheckCircle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <strong>{t("acceptance.byUsing")}:</strong> {t("acceptance.byUsingDescription")}
            </p>
            <p>
              <strong>{t("acceptance.changes")}:</strong> {t("acceptance.changesDescription")}
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("useOfService.title")}</CardTitle>
            <Shield className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <strong>{t("useOfService.accuracy")}:</strong> {t("useOfService.accuracyDescription")}
            </p>
            <p>
              <strong>{t("useOfService.prohibited")}:</strong> {t("useOfService.prohibitedDescription")}
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("userContent.title")}</CardTitle>
            <AlertCircle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <strong>{t("userContent.ownership")}:</strong> {t("userContent.ownershipDescription")}
            </p>
            <p>
              <strong>{t("userContent.license")}:</strong> {t("userContent.licenseDescription")}
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("termination.title")}</CardTitle>
            <AlertCircle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <strong>{t("termination.rights")}:</strong> {t("termination.rightsDescription")}
            </p>
            <p>
              <strong>{t("termination.effect")}:</strong> {t("termination.effectDescription")}
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("changes.title")}</CardTitle>
            <AlertCircle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <strong>{t("changes.right")}:</strong> {t("changes.rightDescription")}
            </p>
            <p>
              <strong>{t("changes.notification")}:</strong> {t("changes.notificationDescription")}
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
