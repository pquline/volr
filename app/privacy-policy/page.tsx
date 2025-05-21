"use client";

import * as React from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="grid place-items-center py-4">
      <div className="grid grid-cols-1 gap-8 sm:gap-6 max-w-2xl w-full px-6 sm:pt-2">
        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Privacy Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Project Name:</strong> <Link href="/"className="font-mono hover:underline">volr</Link>
            </p>
            <p>
              <strong>Purpose:</strong> <Link href="/"className="font-mono hover:underline">volr</Link> is an open-source project designed
              to share reports about public transport disruptions.
            </p>
            <p>
              <strong>Transparency:</strong> This project does not collect or
              store any personal data from its users.
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Data Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>What Data We Collect:</strong> None. All data submitted by
              users (e.g., reports) is anonymized and does not include
              personally identifiable information.
            </p>
            <p>
              <strong>Analytics:</strong> No third-party analytics services are
              used in this project.
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Open Source</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Code Transparency:</strong> The source code is publicly
              available on{" "}
              <Link
                href="https://github.com/pquline/volr"
                className="font-mono hover:underline"
              >
                GitHub
              </Link>
              . Anyone can review the code to verify how data is handled.
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>User Responsibility</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>User-Generated Content:</strong> Reports submitted by
              users must not include personal or sensitive information. Users
              are responsible for ensuring the information they provide complies
              with the project's{" "}
              <Link href="/terms-of-use" className="font-mono hover:underline">
                terms of use
              </Link>
              .
            </p>
          </CardContent>
        </Card>

        <Card className="p-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4">
            <CardTitle>Contact</CardTitle>
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
      </div>
    </div>
  );
}
