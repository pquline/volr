"use client";

import * as React from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { FileText, Info, UserCheck, BookOpen, AlertTriangle, Ban, History, Mail, Calendar } from "lucide-react";

export default function TermsOfUse() {
  return (
    <div className="grid place-items-center py-4">
      <div className="grid grid-cols-1 gap-8 sm:gap-6 max-w-2xl w-full px-6 sm:pt-2">
        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Terms of Use</CardTitle>
            <FileText className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              By accessing or using this platform, you agree to these terms of
              use. Please read them carefully.
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Purpose</CardTitle>
            <Info className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              <Link href="/"className="font-mono hover:underline">volr</Link> is an open-source platform that enables users to report
              public transport disruptions and share safety-related information. The
              project is intended for informational purposes only and is
              maintained by contributors.
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>User Responsibilities</CardTitle>
            <UserCheck className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>By using this platform, you agree to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Submit accurate and truthful information.</li>
              <li>Not include personal, sensitive, or confidential information in reports.</li>
              <li>Refrain from using the platform for malicious purposes, including but not limited to spam or harassment.</li>
              <li>Comply with all applicable laws and regulations.</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Content Ownership</CardTitle>
            <BookOpen className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              All user-submitted content remains the property of its respective
              authors. However, by submitting content to <Link href="/"className="font-mono hover:underline">volr</Link>, you grant us a
              non-exclusive, royalty-free, and perpetual license to use, modify,
              and distribute the content for the purposes of the platform.
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Disclaimers</CardTitle>
            <AlertTriangle className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              The information provided on this platform is user-generated and
              may not always be accurate or up-to-date. <Link href="/"className="font-mono hover:underline">volr</Link> and its
              contributors are not responsible for any errors, omissions, or
              consequences arising from the use of this platform.
            </p>
            <p>
              This project is provided &quot;as is&quot; without any warranties of any
              kind, express or implied, including but not limited to
              merchantability, fitness for a particular purpose, and
              noninfringement.
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Termination</CardTitle>
            <Ban className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              We reserve the right to terminate or restrict access to the
              platform for any user who violates these terms or engages in
              activities that compromise the integrity or purpose of the
              platform.
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Changes to These Terms</CardTitle>
            <History className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              These terms may be updated periodically. Continued use of the
              platform after changes are made constitutes your acceptance of the
              updated terms.
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Contact</CardTitle>
            <Mail className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>
              For inquiries or suggestions, reach out via email:{" "}
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
            <CardTitle>Last Updated</CardTitle>
            <Calendar className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <p>24 may 2025</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
