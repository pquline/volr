"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Calendar, FileText, Mail, Server, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function LegalMentions() {
  const t = useTranslations("legal");

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
              <strong>{t("license")}:</strong> {t("licenseDescription")}{" "}
              <Link href="https://www.gnu.org/licenses/gpl-3.0.html" className="font-mono hover:underline">GNU General Public License (GPL v3)</Link>
              .
            </p>
            <p>
              <strong>{t("sourceCode")}:</strong> {t("sourceCodeDescription")}{" "}
              <Link
                href="https://github.com/pquline/volr"
                className="font-mono hover:underline"
              >
                GitHub
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("hosting.title")}</CardTitle>
            <Server className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <strong>{t("hosting.provider")}:</strong>{" "}
              <Link
                href="https://vercel.com"
                className="font-mono hover:underline"
              >
                Vercel
              </Link>
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("contributors.title")}</CardTitle>
            <Users className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              {t("contributors.description")}{" "}
              <Link
                href="https://github.com/pquline/volr/graphs/contributors"
                className="font-mono hover:underline"
              >
                {t("contributors.link")}
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("liability.title")}</CardTitle>
            <AlertTriangle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              {t("liability.description")}
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
                className="hover:underline font-mono"
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
