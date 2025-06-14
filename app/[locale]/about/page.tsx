"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Database, Mail, Shield, Sparkles, ThumbsUp, Train } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function About() {
  const t = useTranslations("about");

  return (
    <div className="grid place-items-center py-4">
      <div className="grid grid-cols-1 gap-8 sm:gap-6 max-w-2xl w-full px-6 sm:pt-2">
        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("title")} <Link href="/" className="font-mono hover:underline">volr</Link></CardTitle>
            <Train className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              <Link href="/" className="font-mono hover:underline">volr</Link> {t("description")}
            </p>
            <p>{t("openSource")}</p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("features.title")}</CardTitle>
            <Sparkles className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              {t("features.list").split(",").map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("voting.title")}</CardTitle>
            <ThumbsUp className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              {t("voting.description")}
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              {t("voting.list").split(",").map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("tech.title")}</CardTitle>
            <Database className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-1">
              <li>{t("tech.framework")}: <Link href="https://nextjs.org/" target="_blank" className="hover:underline font-mono">Next.js 15</Link></li>
              <li>{t("tech.language")}: <Link href="https://www.typescriptlang.org/" target="_blank" className="hover:underline font-mono">TypeScript</Link></li>
              <li>{t("tech.database")}: <Link href="https://www.postgresql.org/" target="_blank" className="hover:underline font-mono">PostgreSQL</Link> (<Link href="https://www.prisma.io/" target="_blank" className="hover:underline font-mono">Prisma ORM</Link>)</li>
              <li>{t("tech.styling")}: <Link href="https://ui.shadcn.com/" target="_blank" className="hover:underline font-mono">shadcn/ui</Link>, <Link href="https://tailwindcss.com/" target="_blank" className="hover:underline font-mono">Tailwind CSS</Link>, <Link href="https://www.radix-ui.com/" target="_blank" className="hover:underline font-mono">Radix UI</Link></li>
              <li>{t("tech.forms")}: <Link href="https://react-hook-form.com/" target="_blank" className="hover:underline font-mono">React Hook Form</Link> + <Link href="https://zod.dev/" target="_blank" className="hover:underline font-mono">Zod</Link></li>
              <li>{t("tech.notifications")}: <Link href="https://sonner.emilkowal.ski/" target="_blank" className="hover:underline font-mono">Sonner</Link></li>
            </ul>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("privacy.title")}</CardTitle>
            <Shield className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>{t("privacy.description")}</p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>{t("contact.title")}</CardTitle>
            <Mail className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              {t("contact.openSource")}: <Link href="https://github.com/pquline/volr" className="text-foreground hover:underline font-mono" target="_blank">GitHub</Link><br />
              {t("contact.email")}: <Link href="mailto:dev@volr.cc" className="text-foreground hover:underline font-mono">dev@volr.cc</Link>
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
